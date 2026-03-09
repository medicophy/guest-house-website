"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search } from "lucide-react";

export default function RoomGallery({ initialRooms }: { initialRooms: any[] }) {
  const [rooms, setRooms] = useState(initialRooms);
  const [search, setSearch] = useState("");

  async function handleSearch() {
    const res = await fetch(`http://localhost:5000/api/rooms/search?q=${search}`);
    const data = await res.json();
    setRooms(data || []);
  }

  return (
    <section className="container mx-auto py-20 px-4">
      {/* Search Interaction */}
      <div className="max-w-xl mx-auto mb-16 relative">
        <input 
          type="text" 
          placeholder="Search for 'Luxury', 'Minimalist', or 'Family'..." 
          className="w-full p-6 rounded-full border shadow-xl focus:ring-2 focus:ring-primary outline-none text-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button 
          onClick={handleSearch}
          className="absolute right-3 top-3 bottom-3 rounded-full px-8"
        >
          Find Room
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {rooms.map((room) => (
          <div key={room.id} className="group border rounded-3xl p-4 hover:shadow-2xl transition-all">
            <div className="aspect-square rounded-2xl overflow-hidden mb-4">
              <img src={room.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <h3 className="text-xl font-bold">{room.name}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{room.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">${room.price_per_night}</span>
              <Link href={`/rooms/${room.id}`}>
                <Button variant="outline" className="rounded-full">Details</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}