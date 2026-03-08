import { useRooms } from '../features/rooms/hooks/useRooms';
import { RoomTable } from '../features/rooms/components/RoomTable';

export default function Rooms() {
  const { rooms, isLoading, error } = useRooms();

  if (isLoading) {
    return <div>Loading rooms...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Rooms</h1>
      <RoomTable rooms={rooms} />
    </div>
  );
}