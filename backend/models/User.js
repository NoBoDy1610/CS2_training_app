import mongoose from 'mongoose';

// Definition of user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Model export
const User = mongoose.model('User', userSchema);
export default User;
