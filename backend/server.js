import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './models/User.js';

dotenv.config();

const app = express();

// Połącznie z MongoDB
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Sekretny klucz do JWT
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

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

// Ścieżki
app.get('/', (req, res) => {
	res.send('API is running...');
});

// Rejestracja
app.post('/register', async (req, res) => {
	const { username, email, password } = req.body;

	// Walidacja pól
	if (!username || !email || !password) {
		return res.status(400).json({ message: 'Wszystkie pola są wymagane.' });
	}

	try {
		// Sprawdzenie, czy email już istnieje
		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res
				.status(400)
				.json({ message: 'Użytkownik z podanym adresem email już istnieje.' });
		}

		// Sprawdzenie, czy username już istnieje
		const existingUsername = await User.findOne({ username });
		if (existingUsername) {
			return res
				.status(400)
				.json({ message: 'Nazwa użytkownika jest już zajęta.' });
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
		console.error('Błąd serwera:', error);
		res.status(500).json({ message: 'Błąd serwera.' });
	}
});

// Logowanie
app.post('/login', async (req, res) => {
	const { email, password } = req.body;

	// Walidacja pól
	if (!email || !password) {
		return res.status(400).json({ message: 'Wszystkie pola są wymagane.' });
	}

	try {
		// Wyszukanie użytkownika po emailu
		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ message: 'Nieprawidłowy email lub hasło.' });
		}

		// Sprawdzenie poprawność hasła
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

// Profil użytkownika
app.get('/profile', authenticateToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera.' });
	}
});

// Resetowanie hasła
app.post('/forgot-password', async (req, res) => {
	const { email } = req.body;

	console.log(`Wysłano link do resetu hasła na adres: ${email}`);
	res.json({ message: 'Link do resetu hasła został wysłany.' });
});

// Zapis wyniku Reaction Time
app.post('/scores', authenticateToken, async (req, res) => {
	const { time } = req.body;

	// Walidacja danych
	if (!time) {
		return res.status(400).json({ error: 'Wynik czasu (time) jest wymagany.' });
	}

	try {
		// Wyszukanie użytkownika na podstawie ID z tokena
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ error: 'Nie znaleziono użytkownika.' });
		}

		// Dodawanie wynik do użytkownika
		user.scores.push({ time });
		await user.save();

		res
			.status(200)
			.json({ message: 'Wynik zapisany pomyślnie!', savedTime: time });
	} catch (error) {
		console.error('Błąd serwera podczas zapisywania wyniku:', error);
		res.status(500).json({ error: 'Błąd serwera. Spróbuj ponownie później.' });
	}
});

// Pobranie wyników Reaction Time
app.get('/scores', authenticateToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ error: 'Nie znaleziono użytkownika.' });
		}

		res.status(200).json(user.scores);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Błąd serwera. Spróbuj ponownie później.' });
	}
});

// Zapisanie wyniku Aim Training
app.post('/aim-training-scores', authenticateToken, async (req, res) => {
	const { points } = req.body;

	if (typeof points !== 'number') {
		return res.status(400).json({ error: 'Pole `points` musi być liczbą.' });
	}

	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ error: 'Nie znaleziono użytkownika.' });
		}

		user.aimTrainingScores.push({ points });
		await user.save();

		res
			.status(200)
			.json({ message: 'Wynik zapisany pomyślnie!', savedPoints: points });
	} catch (error) {
		console.error('Błąd podczas zapisywania wyniku Aim Training:', error);
		res.status(500).json({ error: 'Błąd serwera. Spróbuj ponownie później.' });
	}
});

// Pobranie wyników Aim Training
app.get('/aim-training-scores', authenticateToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ error: 'Nie znaleziono użytkownika.' });
		}
		res.status(200).json(user.aimTrainingScores || []);
	} catch (error) {
		console.error('Błąd podczas pobierania wyników Aim Training:', error);
		res.status(500).json({ error: 'Błąd serwera. Spróbuj ponownie później.' });
	}
});

//Zmiana hasła
app.post('/change-password', authenticateToken, async (req, res) => {
	try {
		const { currentPassword, newPassword } = req.body;
		const user = await User.findById(req.user.id);

		if (!user) {
			return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
		}

		const isMatch = await bcrypt.compare(currentPassword, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Nieprawidłowe obecne hasło' });
		}

		user.password = await bcrypt.hash(newPassword, 10);
		await user.save();

		res.json({ message: 'Hasło zostało zmienione!' });
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera.' });
	}
});

//Pobieranie wyników użytkownika
app.get('/results', authenticateToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select(
			'scores aimTrainingScores'
		);

		if (!user) {
			return res.status(404).json({ message: 'Nie znaleziono użytkownika.' });
		}

		const reactionResults = user.scores.map((score) => ({
			type: 'reactionTime',
			time: score.time,
			date: score.date,
		}));

		const aimTrainingResults = user.aimTrainingScores.map((score) => ({
			type: 'aimTraining',
			points: score.points,
			date: score.date,
		}));

		console.log('✅ Wyniki użytkownika:', [
			...reactionResults,
			...aimTrainingResults,
		]);

		res.status(200).json([...reactionResults, ...aimTrainingResults]);
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera.' });
	}
});

// Start serwera
const PORT = 5000;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
