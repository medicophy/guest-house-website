"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="group">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-white tracking-tighter uppercase leading-none group-hover:text-primary transition-colors">
              Residential <span className="italic text-primary group-hover:text-white transition-colors">Inn</span>
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">
              High Impact Solutions
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/rooms" className="text-sm font-black text-slate-400 hover:text-white uppercase tracking-widest transition-colors">Rooms</Link>
          <Link href="/about" className="text-sm font-black text-slate-400 hover:text-white uppercase tracking-widest transition-colors">About</Link>
          <Link href="/contact" className="text-sm font-black text-slate-400 hover:text-white uppercase tracking-widest transition-colors">Contact</Link>
          
          {/* Subtle Admin Link */}
          <Link href="/admin/login" className="flex items-center gap-2 text-[10px] font-black text-slate-600 hover:text-primary uppercase tracking-widest transition-colors border-l border-slate-800 pl-10">
            <ShieldCheck className="w-3 h-3" />
            Staff Only
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <Menu className="text-white w-6 h-6" />
        </div>
      </div>
    </nav>
  );
}