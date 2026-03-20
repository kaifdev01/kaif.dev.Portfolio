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
  title: "Kaif.dev — Freelance Full-Stack Developer | MERN, Next.js & WordPress",
  description: "Freelance full-stack developer from Pakistan specializing in MERN stack, Next.js and WordPress. 15+ projects shipped for clients. Available for hire.",
  keywords: ["full stack developer", "freelance full stack developer", "MERN stack developer", "Next.js developer", "WordPress developer", "Pakistan developer", "hire freelance developer", "React developer for hire", "Node.js developer Pakistan"],
  authors: [{ name: "Muhammad Kaif" }],
  creator: "Muhammad Kaif",
  alternates: { canonical: "https://kaif-dev.vercel.app" },
  openGraph: {
    title: "Muhammad Kaif — Freelance Full-Stack Developer",
    description: "Freelance MERN + Next.js developer. 15+ projects. 5.0★ on Upwork. Available for hire.",
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

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Muhammad Kaif",
  "url": "https://kaif-dev.vercel.app",
  "jobTitle": "Freelance Full-Stack Developer",
  "description": "Freelance full-stack developer specializing in MERN stack, Next.js and WordPress. 15+ projects shipped for clients worldwide.",
  "knowsAbout": ["MERN Stack", "Next.js", "React", "Node.js", "MongoDB", "WordPress", "Tailwind CSS"],
  "sameAs": ["https://github.com/kaifdev01", "https://upwork.com/freelancers/muhammadk64"],
  "address": { "@type": "PostalAddress", "addressLocality": "Lahore", "addressCountry": "PK" },
  "email": "kaifm9096@gmail.com"
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <meta name="google-site-verification" content="pvAGbfZs6VpTy9-x-8ylcCFzM3u_KD6ej8glgjwyJ0s" />
        <link rel="icon" type="image/png" href="/favicon.svg" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }}></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <FloatingChat />
      </body>
    </html>
  );
}