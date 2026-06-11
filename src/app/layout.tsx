import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ResepKita — Koleksi Resep Nusantara",
  description: "Temukan dan catat resep masakan Indonesia favoritmu",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className="font-sans">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-6 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
