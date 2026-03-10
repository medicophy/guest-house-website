"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, MapPin, Printer, ArrowRight, Home } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [bookingId, setBookingId] = useState<string | null>(null);

  useEffect(() => {
    // We grab the booking ID from the URL to make it feel personalized
    setBookingId(searchParams.get("id") || "RI-" + Math.floor(1000 + Math.random() * 9000));
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-6">
      <div className="max-w-2xl w-full">
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Booking Confirmed!</h1>
          <p className="text-slate-500 mt-2 text-lg">Your stay at Residential Inn is officially secured.</p>
        </div>

        {/* The Digital Receipt Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
            <div>
              <p className="text-xs font-bold uppercase opacity-60 tracking-widest">Booking ID</p>
              <p className="text-xl font-mono">{bookingId}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase opacity-60 tracking-widest">Status</p>
              <div className="bg-green-500 text-[10px] px-3 py-1 rounded-full font-black uppercase mt-1">Confirmed</div>
            </div>
          </div>

          <div className="p-10 space-y-8">
            {/* Stay Details */}
            <div className="grid grid-cols-2 gap-8 border-b pb-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase">
                  <Calendar className="w-3 h-3" /> Check-In
                </div>
                <p className="text-lg font-bold text-slate-900">March 25, 2026</p>
              </div>
              <div className="space-y-1 text-right">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase justify-end">
                  <Calendar className="w-3 h-3" /> Check-Out
                </div>
                <p className="text-lg font-bold text-slate-900">March 30, 2026</p>
              </div>
            </div>

            {/* Location & Instructions */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-slate-100 p-3 rounded-xl"><MapPin className="text-primary w-6 h-6" /></div>
                <div>
                  <h4 className="font-bold text-slate-900">Residential Inn, Islamabad</h4>
                  <p className="text-sm text-slate-500">Sector F-7/2, Street 14. Check-in starts at 2:00 PM.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <Button 
                variant="outline" 
                onClick={() => window.print()}
                className="h-14 rounded-2xl border-slate-200 font-bold gap-2"
              >
                <Printer className="w-4 h-4" /> Print Receipt
              </Button>
              <Link href="/">
                <Button className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-primary font-bold gap-2">
                  <Home className="w-4 h-4" /> Return Home
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center mt-10 text-slate-400 text-sm italic">
          A confirmation email has been sent to your registered address. <br/>
          Need help? <Link href="/contact" className="text-primary font-bold hover:underline">Contact Support</Link>
        </p>
      </div>
    </div>
  );
}