import { Room } from "@/types";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";

async function getRoom(id: string): Promise<Room | null> {
  try {
    // Fetching from your Go backend on port 5000
    const res = await fetch(`http://localhost:5000/api/rooms/${id}`, { 
      cache: 'no-store' 
    });
    
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Connection error to Go backend:", error);
    return null;
  }
}

export default async function RoomDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const room = await getRoom(id);

  if (!room) {
    return notFound();
  }

  return (
    <main className="container mx-auto py-10 px-4">
      {/* Breadcrumb for easy navigation */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{room.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery Section */}
        <div className="rounded-2xl overflow-hidden shadow-xl border bg-muted">
          <img 
            src={room.image_url} 
            alt={room.name} 
            className="w-full h-[600px] object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        {/* Content Section */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight mb-4">{room.name}</h1>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-primary">${room.price_per_night}</span>
              <span className="text-muted-foreground text-xl">per night</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 border-y py-6">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground uppercase tracking-wider">Capacity</span>
              <span className="text-lg font-semibold">{room.capacity} Guests</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground uppercase tracking-wider">Status</span>
              <span className="text-lg font-semibold text-green-600">Available</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">About this room</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Corrected: The BookingForm contains its own trigger button */}
          <div className="pt-4">
            <BookingForm room={room} />
          </div>          
        </div>
      </div>
    </main>
  );
}