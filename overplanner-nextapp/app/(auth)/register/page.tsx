

import { authClient } from "@/lib/auth-client"; //import the auth client
import RegisterClientPage from "./page.client";



export default async function RegisterPage() {
    return (
        <RegisterClientPage />
    )
}

export async function generateMetadata() {

  return {
    title: "Register",
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
  }
}