import { useEffect, useState } from 'react';

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
    fetch('http://localhost:5000/rooms')
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(console.error);
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {rooms.map(room => (
        <div
          key={room.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{room.name}</h2>
          <p className="text-gray-600 mb-4">{room.description}</p>
          <div className="flex justify-between text-gray-700 font-medium">
            <span>${room.price_per_night}/night</span>
            <span>Max Guests: {room.max_guests}</span>
          </div>
        </div>
      ))}
    </div>
  );
}