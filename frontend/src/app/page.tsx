import { Room } from "@/types";
import RoomCard from "@/components/RoomCard";

async function getRooms(): Promise<Room[]> {
  const res = await fetch("http://localhost:5000/api/rooms", { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch rooms");
  return res.json();
}

export default async function Home() {
  const rooms = await getRooms();

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Guest House</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}