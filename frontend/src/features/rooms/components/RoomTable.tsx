import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Room } from "../types";

interface RoomTableProps {
  rooms: Room[];
}

export function RoomTable({ rooms }: RoomTableProps) {
  return (
    <Table>
      <TableCaption>A list of available rooms.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Max Guests</TableHead>
          <TableHead className="text-right">Price per Night</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rooms.map((room) => (
          <TableRow key={room.id}>
            <TableCell className="font-medium">{room.name}</TableCell>
            <TableCell>{room.description}</TableCell>
            <TableCell>{room.max_guests}</TableCell>
            <TableCell className="text-right">${room.price_per_night}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
