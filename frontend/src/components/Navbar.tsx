"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, BedDouble, Home, PhoneCall } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <Home className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase">Residential Inn</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-300">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/rooms" className="hover:text-white transition-colors">Rooms</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/admin/bookings">
            <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800 gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Admin Portal
            </Button>
          </Link>
          <Link href="/rooms">
            <Button className="bg-white text-slate-900 hover:bg-slate-200 font-bold px-6 rounded-full">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}