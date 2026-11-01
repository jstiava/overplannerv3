

import { authClient } from "@/lib/auth-client"; //import the auth client
import LoginClientPage from "./page.client";



export default async function LoginPage() {
    return (
        <LoginClientPage />
    )
}

export async function generateMetadata() {

  return {
    title: "Login",
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
  }
}