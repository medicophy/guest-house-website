"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Lock, User, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Ensure this utility is available

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Logic updated to admin123
      if (username === "admin" && password === "admin123") {
        router.push("/admin/bookings");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    }, 1200);
  };

  // Logic for button visibility: 
  // If password has content, we use the primary brand color.
  const isReady = password.length > 0;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
      </div>

      <Card className="w-full max-w-md bg-slate-900 border-slate-800 p-10 rounded-[2.5rem] shadow-2xl relative z-10">
        <div className="text-center mb-10">
          <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Staff Portal</h1>
          <p className="text-slate-400 text-sm mt-2 font-medium uppercase tracking-widest">High Impact Solutions</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
              <Input 
                type="text" 
                placeholder="admin_user" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-slate-800 border-none h-14 pl-12 rounded-xl text-white focus:ring-2 ring-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-800 border-none h-14 pl-12 rounded-xl text-white focus:ring-2 ring-primary"
                required
              />
            </div>
          </div>
          <Button 
            type="submit"
            disabled={loading}
            className={cn(
                "w-full h-14 rounded-xl font-black text-lg transition-all duration-300 uppercase tracking-widest",
                // IF READY: Solid, bright background with dark text for clear readability
                // IF NOT READY: Transparent border and faint text to stay out of the way

                isReady 
                ? "bg-white text-slate-900 normal-case shadow-lg" // High visibility when filled
                : "bg-slate-800/50 text-slate-600 normal-case opacity-40" // Visible but muted when empty
            )}
            >
            {loading ? "Authenticating..." : "Sign In"}
            {!loading && <ArrowRight className={cn("ml-2 w-5 h-5 transition-transform", isReady && "group-hover:translate-x-1")} />}
          </Button>
        </form>
      </Card>
    </div>
  );
}