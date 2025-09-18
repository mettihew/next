// lib/dbConnect.ts
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const uri: string = MONGODB_URI;

interface GlobalMongoose {
  mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

const globalWithMongoose = global as typeof globalThis & GlobalMongoose;

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

export default async function dbConnect(): Promise<Mongoose> {
  // Check if already connected
  if (globalWithMongoose.mongoose.conn) {
    console.log('✅ Using existing MongoDB connection');
    console.log('Connection state:', mongoose.connection.readyState);
    return globalWithMongoose.mongoose.conn;
  }

  // Create new connection if needed
  if (!globalWithMongoose.mongoose.promise) {
    console.log('🔄 Creating new MongoDB connection...');
    console.log('Connecting to:', uri.replace(/\/\/.*@/, '//***:***@')); // Hide credentials in logs
    
    globalWithMongoose.mongoose.promise = mongoose.connect(uri, {
      bufferCommands: false,
    }).then((mongoose) => {
      console.log('✅ MongoDB connected successfully!');
      console.log('📊 Database name:', mongoose.connection.name);
      console.log('🌐 Host:', mongoose.connection.host);
      console.log('Connection state:', mongoose.connection.readyState);
      return mongoose;
    }).catch((error) => {
      console.error('❌ MongoDB connection failed:', error);
      globalWithMongoose.mongoose.promise = null; // Reset promise on failure
      throw error;
    });
  }

  try {
    globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
    return globalWithMongoose.mongoose.conn;
  } catch (e) {
    globalWithMongoose.mongoose.promise = null;
    console.error('❌ Error during MongoDB connection:', e);
    throw e;
  }
}