import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  time: { type: Number, required: true },
  date: { type: Date, default: Date.now }, // Pole opcjonalne do zapisywania daty
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  scores: [scoreSchema], // Tablica wyników
});

const User = mongoose.model('User', userSchema);

export default User;
