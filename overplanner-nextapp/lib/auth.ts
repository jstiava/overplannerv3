import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import sendVerificationEmail from "@/app/(auth)/register/sendVerificationEmail";

const client = new MongoClient(process.env.MONGO_URI!);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: {
    allowedHosts: [
      "http://localhost:3000",
      "https://overplannerv3.vercel.app",
    ],
    protocol: 'auto',
    fallback: 'https://overplannerv3.vercel.app'
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    sentOnSignIn: false,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60,
    sendVerificationEmail
  }
});


