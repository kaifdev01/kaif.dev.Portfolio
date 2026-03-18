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
  title: "Muhammad Kaif — Full-Stack Developer | MERN & Next.js",
  description: "Full-stack developer from Pakistan specializing in MERN stack, Next.js and WordPress. 15+ projects shipped for clients in USA, UAE, UK and Saudi Arabia.",
  keywords: ["full stack developer", "MERN stack", "Next.js developer", "WordPress developer", "Pakistan developer", "freelance developer"],
  openGraph: {
    title: "Muhammad Kaif — Full-Stack Developer",
    description: "MERN + Next.js developer. 15+ projects. 5.0★ on Upwork.",
    url: "https://kaif-dev.vercel.app",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Kaif — Full-Stack Developer",
    description: "MERN + Next.js developer. 15+ projects. 5.0★ on Upwork.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <meta name="google-site-verification" content="pvAGbfZs6VpTy9-x-8ylcCFzM3u_KD6ej8glgjwyJ0s" />
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