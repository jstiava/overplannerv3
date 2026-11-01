import VirtualSwiper from "@/app/VirtualSwiper";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { getMongoDb } from "@/lib/mongo";
import { PlusIcon } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";

export default async function Home() {
  await connection()

  let connected = false;

  try {
    const db = await getMongoDb();
    await db.command({ ping: 1 });
    connected = true;
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex flex-col h-screen w-full">
      <main {...{
        className: "flex justify-start w-full h-screen"
      }}>
        <Sidebar {...{
          collapsible: 'none',
          className: "w-[15rem]"
        }}>
          <SidebarHeader />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupAction>
                <PlusIcon /> <span className="sr-only">Add Project</span>
              </SidebarGroupAction>
              <SidebarGroupContent></SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup></SidebarGroup>
            <SidebarGroup></SidebarGroup>
          </SidebarContent>
          <SidebarFooter >
            <span {...{
              className: 'text-xs'
            }}>{connected ? "MongoDB connected" : "Database unavailable"}</span>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <div className="flex flex-col items-start w-[calc(100%-15rem)] h-full px-1 gap-1">
          <header {...{
            className: "h-12 bg-[#151515] w-full flex items-center justify-center text-xs p-0"
          }}>

          </header>
          <div className="block w-full h-full overflow-hidden h-[calc(100%-3rem)]">
            <VirtualSwiper />
          </div>
        </div>
      </main>
    </div>
  );
}



export const metadata: Metadata = {
  // metadataBase: new URL('http://localhost:3000/'),

  title: "Home | Overplanner",

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