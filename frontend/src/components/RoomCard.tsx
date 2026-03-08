import { Room } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RoomCard({ room }: { room: Room }) {
  return (
    <Card className="overflow-hidden">
      <img 
        src={room.image_url} 
        alt={room.name} 
        className="h-48 w-full object-cover"
      />
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>Capacity: {room.capacity} guests</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {room.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-bold">${room.price_per_night} / night</span>
        <Button>Book Now</Button>
      </CardFooter>
    </Card>
  );
}