import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/virtual";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {

  const isSignedIn = true;


  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark font-sans`}
    >
      <body className="min-h-full w-full flex flex-col">
        <SidebarProvider>
          <TooltipProvider>
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
          </TooltipProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}



export const metadata: Metadata = {
  // metadataBase: new URL('http://localhost:3000/'),

  title: {
    default: 'Overplanner',
    template: '%s | Overplanner',
  },

  description: "The last calendar you'll ever use.",

  applicationName: 'Overplanner',

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  openGraph: {
    type: 'website',
    siteName: 'Overplanner',
    title: 'Overplanner',
    description: "The last calendar you'll ever use.",
    // images: [
    //   {
    //     url: '/og-image.jpg',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Overplanner',
    //   },
    // ],
  },

  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Overplanner',
  //   description: 'Independent clothing brand creating ...',
  //   images: ['/og-image.jpg'],
  // },

  robots: {
    index: true,
    follow: true,
  },
}