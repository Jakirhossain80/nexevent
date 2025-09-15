
import mongoose from "mongoose";
import { MongoClient } from "mongodb";



const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB || "nexevent";
if (!MONGODB_URI) throw new Error("MONGODB_URI not set");


let mongooseCached = globalThis._mongooseCached;
if (!mongooseCached) {
  mongooseCached = globalThis._mongooseCached = { conn: null, promise: null };
}

export async function connectMongoose() {
  if (mongooseCached.conn) return mongooseCached.conn;
  if (!mongooseCached.promise) {
    mongoose.set("strictQuery", true);
    mongooseCached.promise = mongoose
      .connect(MONGODB_URI, {
        // Avoid command buffering in serverless
        bufferCommands: false,
        maxPoolSize: 10,
        dbName: DB_NAME,
      })
      .then((m) => m);
  }
  mongooseCached.conn = await mongooseCached.promise;
  return mongooseCached.conn;
}


let _clientPromise = globalThis._mongoClientPromise;
if (!_clientPromise) {
  const client = new MongoClient(MONGODB_URI, {
    maxPoolSize: 10,

  });
  globalThis._mongoClientPromise = _clientPromise = client.connect();
}


export const clientPromise = _clientPromise;


export async function getDb() {
  const client = await clientPromise;
  return client.db(DB_NAME);
}


export async function getClient() {
  return clientPromise;
}
