import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Header from "./components/header";
import { AuthProvider } from "./components/Authcontext";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Website",
  description: "Created by Next js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
                        <AuthProvider>      

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

<Header/>

        <main>
            {children}
        </main>

      </body>
      </AuthProvider>

    </html>                                                                                                            
  );
}
