import mongoose from 'mongoose';
require('dotenv').config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'bookstore');
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
