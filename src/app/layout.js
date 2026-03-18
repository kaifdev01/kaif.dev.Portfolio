import { Geist, Geist_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import FloatingChat from "./components/FloatingChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Muhammad Kaif — Full-Stack Developer",
  description: "MERN + Next.js developer based in Pakistan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.svg" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <FloatingChat />
      </body>
    </html>
  );
}