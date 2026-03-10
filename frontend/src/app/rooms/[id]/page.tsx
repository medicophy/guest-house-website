import { Button } from "@/components/ui/button";
import { CheckCircle2, Wifi, Coffee, Tv, ShieldCheck, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";

async function getRoom(id: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/rooms/${id}`, { 
      cache: 'no-store',
      // Adding a timeout or signal here is good practice for High Impact apps
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

// In Next.js 15+, params is a Promise
export default async function RoomDetailsPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // CRITICAL FIX: We must await params before using them
  const resolvedParams = await params;
  const room = await getRoom(resolvedParams.id);

  if (!room) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center bg-white p-12 rounded-[3rem] shadow-2xl border max-w-lg">
          <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Room Not Found</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            We couldn't find the room you're looking for. It might have been removed or the ID is incorrect.
          </p>
          <Link href="/rooms">
            <Button className="bg-slate-900 hover:bg-primary px-8 h-14 rounded-2xl font-bold gap-2">
              <ArrowLeft className="w-5 h-5" /> Back to All Rooms
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Photo Gallery Grid */}
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px]">
        <div className="md:col-span-2 h-full rounded-[2.5rem] overflow-hidden border shadow-inner">
          <img src={room.image_url} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Main" />
        </div>
        <div className="hidden md:grid grid-rows-2 gap-4 h-full">
          <div className="rounded-[2rem] overflow-hidden border"><img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000" className="w-full h-full object-cover" alt="Interior" /></div>
          <div className="rounded-[2rem] overflow-hidden border"><img src="https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=1000" className="w-full h-full object-cover" alt="Bathroom" /></div>
        </div>
        <div className="hidden md:block rounded-[2rem] overflow-hidden border h-full">
           <img src="https://images.unsplash.com/photo-1507038772120-7fff76f79d79?q=80&w=1000" className="w-full h-full object-cover" alt="View" />
        </div>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 pb-20">
        {/* Left: Info */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm mb-2">
              <MapPin className="w-4 h-4" /> Islamabad, Pakistan
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-none">{room.name}</h1>
          </div>

          <p className="text-xl text-slate-500 leading-relaxed font-medium">{room.description}</p>

          <div className="border-y py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-2">
              <Wifi className="text-primary w-6 h-6" />
              <span className="font-bold text-slate-900 uppercase text-xs">Free WiFi</span>
            </div>
            <div className="flex flex-col gap-2">
              <Coffee className="text-primary w-6 h-6" />
              <span className="font-bold text-slate-900 uppercase text-xs">Breakfast</span>
            </div>
            <div className="flex flex-col gap-2">
              <Tv className="text-primary w-6 h-6" />
              <span className="font-bold text-slate-900 uppercase text-xs">Smart TV</span>
            </div>
            <div className="flex flex-col gap-2">
              <ShieldCheck className="text-primary w-6 h-6" />
              <span className="font-bold text-slate-900 uppercase text-xs">24/7 Security</span>
            </div>
          </div>
        </div>

        {/* Right: Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 p-10 border rounded-[2.5rem] shadow-2xl bg-white space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">Price per stay</p>
                <span className="text-4xl font-black text-slate-900">${room.price_per_night}</span>
                <span className="text-slate-500 font-bold"> / night</span>
              </div>
            </div>
            
            <Link href={`/bookings/${room.id}`}>
              <Button className="w-full h-16 text-xl font-black bg-slate-900 hover:bg-primary transition-all rounded-2xl shadow-xl">
                Book This Room
              </Button>
            </Link>
            
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-green-500" /> Instant Confirmation
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-green-500" /> Best Price Guaranteed
              </div>
            </div>

            <p className="text-center text-[10px] text-slate-400 uppercase font-black tracking-widest">
              A High Impact Solutions Project
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}