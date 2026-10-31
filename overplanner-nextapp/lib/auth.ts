import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI!);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: "http://localhost:3000/",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    sentOnSignIn: false,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60,
    sendVerificationEmail: async ({ user, url }) => {
      // void sendEmail({
      //   to: user.email,
      //   subject: "Verify your email address",
      //   text: `Click the following link to verify your email: ${url}`,
      // });
    },
  }
});
