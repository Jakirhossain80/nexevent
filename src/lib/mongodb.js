import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MONGODB_URI not set");

// ----- Mongoose Singleton -----
let mongooseCached = global._mongooseCached;
if (!mongooseCached) mongooseCached = global._mongooseCached = { conn: null, promise: null };

export async function connectMongoose() {
  if (mongooseCached.conn) return mongooseCached.conn;
  if (!mongooseCached.promise) {
    mongoose.set("strictQuery", true);
    mongooseCached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10, // good for serverless
    }).then((m) => m);
  }
  mongooseCached.conn = await mongooseCached.promise;
  return mongooseCached.conn;
}

// ----- MongoDB native client for NextAuth Adapter -----
let clientPromise;
if (!global._mongoClientPromise) {
  const client = new MongoClient(MONGODB_URI, {
    maxPoolSize: 10, // pool for serverless/concurrent
  });
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export { clientPromise };

