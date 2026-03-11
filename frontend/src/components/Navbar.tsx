"use client";

import Link from "next/link";
import Image from "next/image"; // Import the Image component
import { ShieldCheck, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo Section */}
        <Link href="/" className="group flex items-center gap-3">
          {/* REPLACED THE "WV" DIV WITH THE ACTUAL LOGO */}
          <div className="relative w-16 h-16 overflow-hidden rounded-xl shadow-lg shadow-primary/20">
            <Image 
              src="/logo.png" 
              alt="The White Veranda Logo" 
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-medium text-slate-400 italic">The</span>
              <span className="text-xl font-black text-white tracking-tighter uppercase leading-none group-hover:text-primary transition-colors">
                White Veranda
              </span>
            </div>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mt-1">
              Guest House
            </span>
          </div>
        </Link>

        {/* Navigation Links (No changes needed here) */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/rooms" className="text-sm font-black text-slate-400 hover:text-white uppercase tracking-widest transition-colors">Rooms</Link>
          <Link href="/about" className="text-sm font-black text-slate-400 hover:text-white uppercase tracking-widest transition-colors">About</Link>
          <Link href="/contact" className="text-sm font-black text-slate-400 hover:text-white uppercase tracking-widest transition-colors">Contact</Link>
          
          <Link href="/admin/login" className="flex items-center gap-2 text-[10px] font-black text-slate-600 hover:text-primary uppercase tracking-widest transition-colors border-l border-slate-800 pl-10">
            <ShieldCheck className="w-3 h-3" />
            Staff Only
          </Link>
        </div>

        <div className="md:hidden">
          <Menu className="text-white w-6 h-6" />
        </div>
      </div>
    </nav>
  );
}