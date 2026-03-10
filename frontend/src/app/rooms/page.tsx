import { Button } from "@/components/ui/button";
import { Bed, Users, Wifi, Wind, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

async function getRooms() {
  try {
    const res = await fetch("http://localhost:5000/api/rooms", { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
    return [];
  }
}

export default async function RoomsPage() {
  const rooms = await getRooms();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Premium Header Section */}
      <div className="bg-slate-900 py-24 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover"
            alt="Background"
          />
        </div>
        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">
            Find Your <span className="text-primary">Sanctuary.</span>
          </h1>
          <p className="text-slate-400 mt-6 text-xl max-w-2xl mx-auto font-medium">
            Discover a fusion of traditional Islamabad hospitality and modern 
            High Impact technology.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        {rooms.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] border shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">No rooms available currently.</h2>
            <p className="text-slate-500 mt-2">Please check back later or contact our support.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {rooms.map((room: any) => (
              <div 
                key={room.id} 
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group flex flex-col"
              >
                {/* Image Container with Floating Badge */}
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={room.image_url || "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80"} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={room.name}
                  />
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur px-5 py-2 rounded-2xl font-black text-slate-900 shadow-xl flex items-center gap-2">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    4.9
                  </div>
                  <div className="absolute bottom-6 right-6 bg-slate-900/90 backdrop-blur px-5 py-2 rounded-2xl font-black text-white shadow-xl">
                    ${room.price_per_night || room.price} <span className="text-[10px] opacity-60 uppercase">/ night</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex flex-col grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{room.name}</h3>
                  </div>
                  
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-2 h-10 font-medium">
                    {room.description}
                  </p>

                  {/* Features Row - High Impact Style */}
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2 border-t border-slate-100 pt-6 mb-8">
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                      <Users className="w-4 h-4 text-primary" /> 2 Guests
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                      <Bed className="w-4 h-4 text-primary" /> King Bed
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                      <Wifi className="w-4 h-4 text-primary" /> Fast WiFi
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                      <Wind className="w-4 h-4 text-primary" /> Climate
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Link href={`/rooms/${room.id}`}>
                      <Button className="w-full h-14 rounded-2xl text-lg font-black bg-slate-900 hover:bg-primary transition-all flex items-center gap-3 group/btn">
                        View Details
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}