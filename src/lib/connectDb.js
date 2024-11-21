import mongoose from 'mongoose';

const connectDb = async () => {
  MONGO_URI="mongodb+srv://ali:mongo123@next-cluster.ixj4y.mongodb.net/?retryWrites=true&w=majority&appName=next-Cluster"

  if (mongoose.connection.readyState === 1) {
    console.log('Using existing database connection');
    return mongoose.connection.asPromise();
  }
  try {
    const db = await mongoose.connect(MONGO_URI);

    console.log('Database connected');
    return db;
  } catch (error) {
    console.error('Database connection error:', error.message);
    throw new Error('Database connection failed');
  }
};

export default connectDb;