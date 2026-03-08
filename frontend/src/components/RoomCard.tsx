import { Room } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Import Link

export default function RoomCard({ room }: { room: Room }) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/rooms/${room.id}`}>
        <img 
          src={room.image_url} 
          alt={room.name} 
          className="h-48 w-full object-cover transition-transform hover:scale-105 cursor-pointer"
        />
      </Link>
      <CardHeader>
        <Link href={`/rooms/${room.id}`} className="hover:underline">
          <CardTitle>{room.name}</CardTitle>
        </Link>
        <CardDescription>Capacity: {room.capacity} guests</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {room.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-bold">${room.price_per_night} / night</span>
        <Link href={`/rooms/${room.id}`}>
          <Button shadow-sm>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}