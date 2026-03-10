"use client";

import React from "react";
import Link from "next/link";
import { LayoutDashboard, Bed, Star, Settings, LogOut } from "lucide-react"; // Imported Star for Reviews
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Logic: Hide the entire sidebar structure if we are on the login page
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-950">{children}</div>;
  }

  const navigation = [
    { name: "Dashboard", href: "/admin/bookings", icon: LayoutDashboard },
    { name: "Manage Rooms", href: "/admin/rooms", icon: Bed },
    { name: "Reviews", href: "/admin/reviews", icon: Star }, // Added Review Management
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-slate-900">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-950 border-r border-slate-800/50 flex flex-col shrink-0">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-primary w-10 h-10 rounded-xl flex items-center justify-center font-black text-slate-900 text-sm shadow-lg shadow-primary/20">
              HI
            </div>
            <span className="font-black uppercase tracking-tighter text-xl text-white">
              Staff Panel
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 group relative",
                  isActive 
                    ? "bg-white/10 text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] border border-white/10" 
                    : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-primary" : "text-slate-600")} />
                  <span className={cn("font-bold text-sm uppercase tracking-widest transition-colors", isActive ? "text-white" : "text-slate-500")}>
                    {item.name}
                  </span>
                </div>
                
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-8 mt-auto border-t border-slate-900">
          <button className="flex items-center gap-3 text-slate-500 hover:text-red-400 transition-colors uppercase text-[10px] font-black tracking-widest">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-slate-50 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}