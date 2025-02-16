import mongoose from 'mongoose';

// Schemat dla wyników pierwszej gry
const scoreSchema = new mongoose.Schema({
	time: { type: Number, required: true }, // Czas reakcji
	date: { type: Date, default: Date.now },
});

// Schemat dla wyników drugiej gry
const aimTrainingScoreSchema = new mongoose.Schema({
	points: { type: Number, required: true }, // Ilość punktów w grze na celność
	date: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	scores: [scoreSchema], // Wyniki dla gry na reakcję
	aimTrainingScores: [aimTrainingScoreSchema], // Wyniki dla gry celności
});

const User = mongoose.model('User', userSchema);

export default User;
