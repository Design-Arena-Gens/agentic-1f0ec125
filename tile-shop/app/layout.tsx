import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "TileShop - Premium Floor & Wall Tiles",
  description: "Discover premium porcelain, ceramic, and natural stone tiles. Wide selection of colors, finishes, and sizes. Free samples available.",
  keywords: ["tiles", "floor tiles", "wall tiles", "porcelain", "ceramic", "marble", "natural stone"],
  openGraph: {
    title: "TileShop - Premium Floor & Wall Tiles",
    description: "Discover premium porcelain, ceramic, and natural stone tiles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
