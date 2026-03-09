import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import Image from "next/image";

async function getRooms() {
  const res = await fetch("http://localhost:5000/api/rooms", { cache: 'no-store' });
  return res.json();
}

export default async function Home() {
  const rooms = await getRooms();

  return (
    <div className="flex flex-col min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover brightness-50"
            alt="Guest House"
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Premium Living <br/><span className="text-primary italic">Simplified.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto">
            Experience the comfort of home with the luxury of a hotel in the heart of Pakistan.
          </p>

          {/* --- SEARCH BAR --- */}
          <div className="bg-white p-4 rounded-2xl shadow-2xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 text-black">
            <div className="flex flex-col items-start px-4 border-r">
              <span className="text-xs font-bold uppercase text-gray-500">Location</span>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-medium">Islamabad, PK</span>
              </div>
            </div>
            <div className="flex flex-col items-start px-4 border-r">
              <span className="text-xs font-bold uppercase text-gray-500">Check-In</span>
              <div className="flex items-center gap-2 mt-1 font-medium">
                <Calendar className="w-4 h-4 text-primary" /> Add Date
              </div>
            </div>
            <div className="flex flex-col items-start px-4">
              <span className="text-xs font-bold uppercase text-gray-500">Guests</span>
              <div className="flex items-center gap-2 mt-1 font-medium">
                <Users className="w-4 h-4 text-primary" /> 1 Guest
              </div>
            </div>
            <Button size="lg" className="h-full rounded-xl text-lg font-bold">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* --- ROOM GRID --- */}
      <section className="container mx-auto py-20 px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold">Our Curated Rooms</h2>
            <p className="text-muted-foreground mt-2 text-lg">Hand-picked spaces for high-impact stays.</p>
          </div>
          <Button variant="outline">View All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {rooms.map((room: any) => (
            <div key={room.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-3xl mb-4 aspect-4/3">
                <img 
                  src={room.image_url || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80"} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={room.name}
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full font-bold text-sm">
                  ${room.price_per_night}/night
                </div>
              </div>
              <h3 className="text-2xl font-bold">{room.name}</h3>
              <p className="text-muted-foreground line-clamp-2 mt-2">{room.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <Link href={`/rooms/${room.id}`}>
                  <Button className="rounded-full px-6">Explore Room</Button>
                </Link>
                <div className="flex gap-2 text-xs font-bold text-primary">
                  <span>WiFi</span> • <span>AC</span> • <span>Breakfast</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}