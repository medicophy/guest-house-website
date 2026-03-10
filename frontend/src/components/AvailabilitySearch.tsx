"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import RoomCard from "./RoomCard"; // We will create this next

export default function AvailabilitySearch({ initialRooms }: { initialRooms: any[] }) {
  const [rooms, setRooms] = useState(initialRooms);
  const [date, setDate] = useState<DateRange | undefined>();
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!date?.from || !date?.to) return;
    
    setLoading(true);
    const start = format(date.from, "yyyy-MM-dd");
    const end = format(date.to, "yyyy-MM-dd");
    
    const res = await fetch(`http://localhost:5000/api/rooms?check_in=${start}&check_out=${end}`);
    const data = await res.json();
    setRooms(data || []);
    setLoading(false);
  }

  return (
    <div className="space-y-12">
      {/* Search Bar UI */}
      <div className="bg-white p-4 rounded-2xl shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-4 items-center border">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="w-full md:w-2/3 justify-start text-left font-normal h-12">
              <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
              {date?.from ? (
                date.to ? <>{format(date.from, "LLL dd")} - {format(date.to, "LLL dd")}</> : format(date.from, "LLL dd")
              ) : <span>When are you staying?</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar mode="range" selected={date} onSelect={setDate} numberOfMonths={2} disabled={{ before: new Date() }} />
          </PopoverContent>
        </Popover>
        
        <Button onClick={handleSearch} disabled={loading} className="w-full md:w-1/3 h-12 rounded-xl font-bold text-lg">
          {loading ? "Checking..." : "Check Availability"}
        </Button>
      </div>

      {/* Dynamic Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {rooms.length > 0 ? (
          rooms.map((room) => <RoomCard key={room.id} room={room} />)
        ) : (
          <div className="col-span-full text-center py-20 text-muted-foreground">
            No rooms available for these dates. Try different ones!
          </div>
        )}
      </div>
    </div>
  );
}