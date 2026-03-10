import { Button } from "@/components/ui/button";
import { ShieldCheck, Zap, Globe, Users, Heart, Target } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const stats = [
    { label: "Premium Suites", value: "24+" },
    { label: "Happy Guests", value: "1.2k" },
    { label: "Staff Support", value: "24/7" },
    { label: "Cities", value: "Islamabad" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: Hero Video/Image Hybrid */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover" 
            alt="Office"
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
            The New Standard <br/> <span className="text-primary italic">of Living.</span>
          </h1>
          <p className="text-slate-300 mt-6 text-xl max-w-2xl mx-auto">
            Residential Inn isn't just a guest house. It's a High Impact Solutions project 
            redefining hospitality through Pakistan's first smart-stay ecosystem.
          </p>
        </div>
      </section>

      {/* Section 2: The Vision Bento Grid */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-slate-50 p-12 rounded-3xl border border-slate-100 flex flex-col justify-center">
            <h2 className="text-4xl font-black text-slate-900 mb-6">Our Mission</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              We started with a single goal: to bridge the gap between the warmth of a home 
              and the efficiency of a high-end hotel. By leveraging Go and Next.js, we've 
              built a platform that ensures every booking is seamless, every room is 
              pristine, and every guest feels like a VIP.
            </p>
          </div>
          <div className="bg-primary p-12 rounded-3xl text-white flex flex-col items-center justify-center text-center">
            <Target className="w-16 h-16 mb-4 opacity-50" />
            <h3 className="text-2xl font-bold">100% Reliability</h3>
            <p className="mt-2 opacity-80">Our proprietary tech stack prevents double-bookings and ensures 24/7 check-in accuracy.</p>
          </div>
        </div>
      </section>

      {/* Section 3: Core Values (The 'High Impact' Pillar) */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic">Why Choose Us?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="bg-primary/20 p-4 rounded-2xl w-fit"><ShieldCheck className="text-primary w-8 h-8" /></div>
              <h4 className="text-xl font-bold text-white uppercase">Unmatched Security</h4>
              <p className="text-slate-400">Located in the heart of Islamabad with 24/7 surveillance and biometric access for all residents.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-primary/20 p-4 rounded-2xl w-fit"><Zap className="text-primary w-8 h-8" /></div>
              <h4 className="text-xl font-bold text-white uppercase">Tech-First Experience</h4>
              <p className="text-slate-400">High-speed fiber optics in every room and a digital concierge at your fingertips.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-primary/20 p-4 rounded-2xl w-fit"><Globe className="text-primary w-8 h-8" /></div>
              <h4 className="text-xl font-bold text-white uppercase">Global Standards</h4>
              <p className="text-slate-400">We implement international hospitality protocols tailored specifically for the Pakistani market.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Stats Counter */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center border-r last:border-none border-slate-100">
              <p className="text-5xl font-black text-slate-900 mb-2">{stat.value}</p>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: CTA */}
      <section className="py-24 container mx-auto px-6">
        <div className="bg-slate-50 rounded-[3rem] p-12 md:p-20 text-center border shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8">Ready to experience <br/> the future?</h2>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/rooms">
                <Button className="h-16 px-10 text-xl font-bold bg-slate-900 rounded-2xl">Browse All Rooms</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="h-16 px-10 text-xl font-bold rounded-2xl border-slate-300">Contact Sales</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}