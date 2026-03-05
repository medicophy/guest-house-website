import { useEffect, useState } from 'react';
import './Rooms.css'; // create this file

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
    fetch('http://localhost:3000/rooms')
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(console.error);
  }, []);

  return (
    <div className="rooms-container">
      <h1>Rooms</h1>
      <ul>
        {rooms.map(room => (
          <li key={room.id} className="room-card">
            <h2>{room.name}</h2>
            <p>{room.description}</p>
            <p>Price: ${room.price_per_night}</p>
            <p>Max Guests: {room.max_guests}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}