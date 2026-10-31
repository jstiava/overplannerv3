import "server-only";
import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGO_URI;

if (!uri) {
    throw new Error("Missing MONGO_URI environment variable");
}

const options = {
    maxPoolSize: 20,
    minPoolSize: 0,
    maxConnecting: 2,
    maxIdleTimeMS: 60_000,

    connectTimeoutMS: 5_000,
    serverSelectionTimeoutMS: 5_000,
    waitQueueTimeoutMS: 5_000,
    socketTimeoutMS: 30_000,

    retryReads: true,
    retryWrites: true,
};

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (globalThis._mongoClientPromise) {
    clientPromise = globalThis._mongoClientPromise;
} else {
    const client = new MongoClient(uri, options);
    clientPromise = client.connect();
    globalThis._mongoClientPromise = clientPromise;
}

export async function getMongoDb(): Promise<Db> {
    const client = await clientPromise;
    return client.db("overplanner");
}