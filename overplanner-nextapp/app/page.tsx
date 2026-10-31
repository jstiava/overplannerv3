import { getMongoDb } from "@/lib/mongo";

export default async function Home() {
  let connected = false;

  try {
    const db = await getMongoDb();
    await db.command({ ping: 1 });
    connected = true;
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      {connected ? "MongoDB connected" : "Database unavailable"}
    </div>
  );
}