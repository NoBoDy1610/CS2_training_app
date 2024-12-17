import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './models/User.js';

dotenv.config();

const app = express();

//Connection with mongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
	res.send('API is running...');
});

// Middleware do uwierzytelniania
const authenticateToken = (req, res, next) => {
	const token = req.header('Authorization')?.split(' ')[1];
	if (!token) {
		return res
			.status(401)
			.json({ message: 'Brak tokena uwierzytelniającego.' });
	}
	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(403).json({ message: 'Nieprawidłowy token.' });
	}
};

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
//REGISTER
app.post('/register', async (req, res) => {
	const { username, email, password } = req.body;

	// Walidacja pól
	if (!username || !email || !password) {
		return res.status(400).json({ message: 'Wszystkie pola są wymagane.' });
	}

	try {
		// Sprawdzenie, czy email już istnieje
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res
				.status(400)
				.json({ message: 'Użytkownik z podanym adresem email już istnieje.' });
		}

		// Hashowanie hasła
		const hashedPassword = await bcrypt.hash(password, 10);

		// Tworzenie użytkownika
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});

		await newUser.save();

		res.status(201).json({ message: 'Rejestracja zakończona sukcesem.' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Błąd serwera.' });
	}
});

//LOGIN
app.post('/login', async (req, res) => {
	const { email, password } = req.body;

	// Walidacja pól
	if (!email || !password) {
		return res.status(400).json({ message: 'Wszystkie pola są wymagane.' });
	}

	try {
		// Znajdź użytkownika po emailu
		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ message: 'Nieprawidłowy email lub hasło.' });
		}

		// Sprawdź poprawność hasła
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res
				.status(400)
				.json({ message: 'Nieprawidłowy email lub hasło.' });
		}

		// Generowanie tokena JWT
		const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

		res.status(200).json({ token, message: 'Logowanie zakończone sukcesem.' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Błąd serwera.' });
	}
});

app.get('/profile', authenticateToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password'); // Wyklucz hasło
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera.' });
	}
});

app.post('/forgot-password', async (req, res) => {
	const { email } = req.body;

	// Logika wysyłania maila (tu możesz podłączyć np. nodemailer)
	console.log(`Wysłano link do resetu hasła na adres: ${email}`);

	// Symulacja odpowiedzi
	res.json({ message: 'Link do resetu hasła został wysłany.' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
