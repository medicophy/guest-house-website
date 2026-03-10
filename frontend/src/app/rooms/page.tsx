import { Button } from "@/components/ui/button";
import { Bed, Users, Square, Wifi, Wind } from "lucide-react";
import Link from "next/link";

async function getRooms() {
  const res = await fetch("http://localhost:5000/api/rooms", { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function RoomsPage() {
  const rooms = await getRooms();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-slate-900 py-16 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Available Rooms</h1>
        <p className="text-slate-400 mt-4 text-lg max-w-xl mx-auto">
          Explore our collection of premium spaces designed for comfort and productivity.
        </p>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room: any) => (
            <div key={room.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border group">
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={room.image_url || "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80"} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={room.name}
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full font-bold text-slate-900 shadow-sm">
                  ${room.price_per_night} / night
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{room.name}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-6 h-10">
                  {room.description}
                </p>

                {/* Features Row */}
                <div className="flex items-center gap-4 text-slate-400 text-xs font-semibold uppercase mb-6 border-y py-4">
                  <div className="flex items-center gap-1.5"><Users className="w-4 h-4" /> 2 Guests</div>
                  <div className="flex items-center gap-1.5"><Bed className="w-4 h-4" /> King</div>
                  <div className="flex items-center gap-1.5"><Wifi className="w-4 h-4" /> WiFi</div>
                  <div className="flex items-center gap-1.5"><Wind className="w-4 h-4" /> AC</div>
                </div>

                <Link href={`/rooms/${room.id}`}>
                  <Button className="w-full h-12 rounded-xl text-lg font-bold bg-slate-900 hover:bg-primary transition-colors">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}