"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary-600">
          <span className="text-2xl">🍳</span>
          <span>ResepKita</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-primary-600">Beranda</Link>
          <Link href="/my" className="text-sm font-medium text-gray-600 hover:text-primary-600">Resep Saya</Link>
          <Link href="/saved" className="text-sm font-medium text-gray-600 hover:text-primary-600">Tersimpan</Link>
          <Link href="/add" className="btn-primary bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-600">
            + Tambah Resep
          </Link>
        </nav>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-600 p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2">
          <Link href="/" className="block py-2 text-sm font-medium text-gray-600" onClick={() => setMenuOpen(false)}>Beranda</Link>
          <Link href="/my" className="block py-2 text-sm font-medium text-gray-600" onClick={() => setMenuOpen(false)}>Resep Saya</Link>
          <Link href="/saved" className="block py-2 text-sm font-medium text-gray-600" onClick={() => setMenuOpen(false)}>Tersimpan</Link>
          <Link href="/add" className="block py-2 text-sm font-medium text-primary-600" onClick={() => setMenuOpen(false)}>+ Tambah Resep</Link>
        </div>
      )}
    </header>
  );
}
