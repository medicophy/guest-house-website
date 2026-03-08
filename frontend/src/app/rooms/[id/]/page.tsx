import { Room } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getRoom(id: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/rooms/${id}`, { 
      cache: 'no-store',
      next: { revalidate: 0 } 
    });
    
    if (!res.ok) {
        const errorText = await res.text();
        return { error: `Backend returned ${res.status}: ${errorText}` };
    }
    return await res.json() as Room;
  } catch (error) {
    return { error: `Failed to connect to Backend. Is Go running on port 5000?` };
  }
}

export default async function RoomDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getRoom(id);

  // If there is an error, show it on the screen so we can see it
  if ('error' in data) {
    return (
      <div className="p-10 border-2 border-red-500 bg-red-50 m-10 rounded">
        <h2 className="text-red-700 font-bold">Debug Error:</h2>
        <p>{data.error}</p>
        <Link href="/" className="text-blue-500 underline mt-4 block">Go Back Home</Link>
      </div>
    );
  }

  const room = data;

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="rounded-xl overflow-hidden shadow-lg border">
          <img 
            src={room.image_url} 
            alt={room.name} 
            className="w-full h-[500px] object-cover"
          />
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight">{room.name}</h1>
          <p className="text-3xl font-bold text-primary">${room.price_per_night} / night</p>
          <p className="text-lg text-muted-foreground leading-relaxed">{room.description}</p>
          <Button size="lg" className="w-full py-7 text-xl font-bold">Reserve Now</Button>
        </div>
      </div>
    </main>
  );
}