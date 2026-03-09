"use client";

import { useState } from "react";
import { Room } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, differenceInDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";

export default function BookingForm({ room }: { room: Room }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });

  const nights = date?.from && date?.to ? differenceInDays(date.to, date.from) : 0;
  const totalPrice = nights * room.price_per_night;
  const router = useRouter();
  
  async function handleBooking(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    if (!date?.from || !date?.to) {
      alert("Please select a check-in and check-out date.");
      return;
    }
  
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const bookingData = {
      room_id: room.id,
      guest_name: formData.get("name"),
      guest_email: formData.get("email"),
      check_in: format(date.from, "yyyy-MM-dd"),
      check_out: format(date.to, "yyyy-MM-dd"),
      total_price: totalPrice,
    };
  
    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
  
      if (res.ok) {
        setOpen(false);
        // Ensure this matches your EXACT folder name in src/app
        router.push("/bookings/success"); 
      } else if (res.status === 409) {
        // This handles the overlap check we added in Go
        alert("These dates are already booked. Please select different dates.");
      } else {
        const errorData = await res.text();
        alert(`Booking failed: ${errorData}`);
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Could not connect to the Go server. Is it running?");
    } finally {
      setLoading(false);
    }
  }
 
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full h-16 text-xl font-bold rounded-xl shadow-lg hover:shadow-primary/20">
          Reserve This Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book {room.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleBooking} className="space-y-4 pt-4">
          <Input name="name" placeholder="Full Name" required />
          <Input name="email" type="email" placeholder="Email Address" required />
          
          <div className="grid gap-2">
            <label className="text-sm font-medium">Select Dates</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>{format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}</>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                {/* Added disabled prop to calendar to prevent 
                  users from picking past dates 
                */}
                <Calendar 
                  initialFocus 
                  mode="range" 
                  selected={date} 
                  onSelect={setDate} 
                  numberOfMonths={2}
                  disabled={{ before: new Date() }} 
                />
              </PopoverContent>
            </Popover>
          </div>

          {nights > 0 && (
            <div className="p-3 bg-muted rounded-md text-sm">
              <div className="flex justify-between">
                <span>{nights} nights x ${room.price_per_night}</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading || nights === 0}>
            {loading ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}