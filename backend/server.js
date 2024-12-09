import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

const app = express();

//Connection with mongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
	res.send('API is running...');
});

app.post('/api/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'User created', user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.put('/user/nikodem', (req, res) => {
	res.sendStatus(200);
});
app.patch('/user/nikodem', (req, res) => {
	res.sendStatus(200);
});
app.delete('/user/nikodem', (req, res) => {
	res.sendStatus(200);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
