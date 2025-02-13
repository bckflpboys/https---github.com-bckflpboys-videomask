import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  image: String,
  emailVerified: Date,
  provider: String,
}, {
  timestamps: true,
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
