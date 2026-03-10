"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, CreditCard, User, Mail, Calendar as CalendarIcon, ArrowRight } from "lucide-react";

export default function BookingFormPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState<any>(null);

  // 1. Fetch Room Details for the Summary
  useEffect(() => {
    fetch(`http://localhost:5000/api/rooms/${id}`)
      .then(res => res.json())
      .then(data => setRoom(data));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a secure payment/booking process
    setTimeout(() => {
      setLoading(false);
      router.push(`/bookings/success?id=RI-${Math.floor(Math.random() * 90000)}`);
    }, 2000);
  };

  if (!room) return <div className="p-20 text-center font-bold">Loading Room Details...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEFT: Guest Information Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-black">1</div>
            <h1 className="text-3xl font-black text-slate-900 uppercase">Guest Information</h1>
          </div>

          <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden bg-white p-10">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 flex items-center gap-2">
                  <User className="w-3 h-3" /> Full Name
                </label>
                <Input required placeholder="e.g. Ahmed Ali" className="h-14 rounded-xl border-slate-200 focus:ring-primary" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 flex items-center gap-2">
                  <Mail className="w-3 h-3" /> Email Address
                </label>
                <Input required type="email" placeholder="ahmed@example.pk" className="h-14 rounded-xl border-slate-200" />
              </div>

              <div className="md:col-span-2 space-y-4 pt-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-black">2</div>
                  <h2 className="text-xl font-bold text-slate-900 uppercase">Payment Method</h2>
                </div>
                
                <div className="p-6 border-2 border-primary bg-primary/5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CreditCard className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-bold text-slate-900">Pay at Property</p>
                      <p className="text-xs text-slate-500 italic">No credit card required to book today.</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border-4 border-primary"></div>
                </div>
              </div>

              <div className="md:col-span-2 pt-6">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-16 text-xl font-black bg-slate-900 hover:bg-primary transition-all rounded-2xl gap-3 shadow-xl"
                >
                  {loading ? "Securing your stay..." : "Confirm Booking"}
                  {!loading && <ArrowRight className="w-6 h-6" />}
                </Button>
                <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> SSL Encrypted & Secure
                </p>
              </div>
            </form>
          </Card>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden bg-white">
              <div className="h-48 relative">
                <img src={room.image_url} className="w-full h-full object-cover" alt={room.name} />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-black uppercase tracking-tighter">{room.name}</h3>
                  <p className="text-xs opacity-80 uppercase font-bold">Islamabad, PK</p>
                </div>
              </div>
              
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4 text-sm font-medium text-slate-600">
                  <div className="flex justify-between">
                    <span>Rate / Night</span>
                    <span className="text-slate-900 font-bold">${room.price_per_night}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax (5%)</span>
                    <span className="text-slate-900 font-bold">${(room.price_per_night * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between text-xl font-black text-slate-900 italic">
                    <span>Total</span>
                    <span>${(room.price_per_night * 1.05).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-slate-900 p-6 rounded-3xl text-white flex items-start gap-4 shadow-lg">
              <CalendarIcon className="w-6 h-6 text-primary shrink-0" />
              <p className="text-sm opacity-80 leading-snug font-medium">
                Flexible Cancellation: Cancel up to 24 hours before check-in for a full refund.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}