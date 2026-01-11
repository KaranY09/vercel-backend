import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('MONGO_URI is not defined in .env');
  process.exit(1);
}

// Mask password for logging
const masked = uri.replace(/:(?:.*)@/, ':...@');
console.log('Using MONGO_URI:', masked);

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('MongoDB connected successfully');
    process.exit(0);
  })
  .catch((err) => {
    console.error('MongoDB connection error:');
    console.error(err);
    process.exit(1);
  });
