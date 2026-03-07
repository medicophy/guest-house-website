import { useEffect, useState } from "react";

interface Room {
  id: number;
  name: string;
  description: string;
  price_per_night: number;
  max_guests: number;
}

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/rooms")
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Rooms</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => (
          <div key={room.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">{room.name}</h2>
            <p className="text-gray-700 mb-2">{room.description}</p>
            <p className="text-gray-900 font-medium mb-1">Price: ${room.price_per_night}</p>
            <p className="text-gray-900 font-medium">Max Guests: {room.max_guests}</p>
          </div>
        ))}
      </div>
    </div>
  );
}