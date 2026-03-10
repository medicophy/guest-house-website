"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Star, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const [rating, setRating] = useState(0);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add a simple "Sending" state or just a simulated success for now
    alert("Message Sent! Our team in Islamabad will contact you shortly.");
  };
  
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-slate-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Get In Touch</h1>
        <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">
          Have a question about our suites or planning a long-term stay? Our team is ready to assist you.
        </p>
      </div>

      <div className="container mx-auto px-6 -mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Contact Methods */}
        <div className="space-y-6">
          <Card className="border-none shadow-xl bg-primary text-white p-8">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-xl"><Phone className="w-6 h-6" /></div>
                <div><p className="text-sm opacity-70 uppercase font-bold">Call Us</p><p className="text-lg">+92 51 1234567</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-xl"><Mail className="w-6 h-6" /></div>
                <div><p className="text-sm opacity-70 uppercase font-bold">Email Us</p><p className="text-lg">hello@resinn.pk</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-xl"><MapPin className="w-6 h-6" /></div>
                <div><p className="text-sm opacity-70 uppercase font-bold">Visit Us</p><p className="text-lg">Sector F-7, Islamabad, Pakistan</p></div>
              </div>
            </div>
          </Card>

          <Card className="p-8 shadow-lg border-none bg-white">
            <div className="flex items-center gap-3 text-slate-900 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h4 className="font-bold uppercase tracking-widest text-sm">Front Desk Hours</h4>
            </div>
            <div className="space-y-2 text-slate-500">
              <div className="flex justify-between"><span>Mon - Fri</span><span className="font-bold text-slate-900">24 Hours</span></div>
              <div className="flex justify-between"><span>Sat - Sun</span><span className="font-bold text-slate-900">08:00 - 22:00</span></div>
            </div>
          </Card>
        </div>

        {/* Right Column: The Form & Review Section */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-10 shadow-2xl border-none bg-white">
            <h3 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <MessageSquare className="text-primary w-8 h-8" /> Send a Message
            </h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">Full Name</label>
                <Input placeholder="John Doe" className="h-12 rounded-xl focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">Email Address</label>
                <Input type="email" placeholder="john@example.com" className="h-12 rounded-xl" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">Your Message</label>
                <Textarea placeholder="How can we help you?" className="min-h-[150px] rounded-xl" />
              </div>

              {/* Sophisticated Rating Section */}
              <div className="md:col-span-2 border-t pt-8 mt-4">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Rate your Experience</h4>
                <div className="flex gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-transform active:scale-90"
                    >
                      <Star className={cn("w-8 h-8", rating >= star ? "fill-yellow-400 text-yellow-400" : "text-slate-300")} />
                    </button>
                  ))}
                  <span className="ml-4 text-slate-400 font-medium italic">
                    {rating > 0 ? `${rating} / 5 Stars` : "Click to rate"}
                  </span>
                </div>
              </div>

              <Button className="md:col-span-2 h-14 rounded-xl text-lg font-bold bg-slate-900 hover:bg-primary">
                Submit Inquiry
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
