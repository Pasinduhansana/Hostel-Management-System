import mongoose from 'mongoose';

async function connectDB() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined in environment variables.');
  }

  await mongoose.connect(mongoUri, {
    autoIndex: true,
  });

  // eslint-disable-next-line no-console
  console.log('MongoDB connected successfully.');
}

export default connectDB;
