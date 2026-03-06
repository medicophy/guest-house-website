import { useEffect, useState } from 'react';
import './Rooms.css';

interface Room {
  id: number;
  name: string;
  description: string;
  price_per_night: number;
  max_guests: number;
}

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    fetch('http://localhost:5000/rooms')
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(console.error);
  }, []);

  const openModal = (room: Room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRoom(null);
  };

  const handleBooking = () => {
    alert(`Booking ${selectedRoom?.name} for ${guests} guest(s) from ${dates.checkIn} to ${dates.checkOut}`);
    closeModal();
  };

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
            <button onClick={() => openModal(room)}>Book Now</button>
          </li>
        ))}
      </ul>

      {showModal && selectedRoom && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Book {selectedRoom.name}</h2>
            <label>
              Check-in: <input type="date" value={dates.checkIn} onChange={e => setDates({...dates, checkIn: e.target.value})}/>
            </label>
            <label>
              Check-out: <input type="date" value={dates.checkOut} onChange={e => setDates({...dates, checkOut: e.target.value})}/>
            </label>
            <label>
              Guests: <input type="number" min={1} max={selectedRoom.max_guests} value={guests} onChange={e => setGuests(Number(e.target.value))}/>
            </label>
            <div className="modal-buttons">
              <button onClick={handleBooking}>Confirm Booking</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}