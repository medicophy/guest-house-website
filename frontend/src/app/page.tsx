"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Users, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

export default function HomePage() {
  const router = useRouter();
  const [date, setDate] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    if (date?.from && date?.to) {
      const from = format(date.from, "yyyy-MM-dd");
      const to = format(date.to, "yyyy-MM-dd");
      // Redirect to the rooms page with the selected dates
      router.push(`/rooms?checkin=${from}&checkout=${to}`);
    } else {
      // If no date is selected, just go to rooms
      router.push("/rooms");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[650px] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover brightness-50"
            alt="Guest House"
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Premium Living <br/><span className="text-primary italic">Simplified.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto">
            Experience the comfort of home with the luxury of a hotel in the heart of Pakistan.
          </p>

          {/* --- SEARCH BAR --- */}
          <div className="bg-white p-4 rounded-2xl shadow-2xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 text-black items-center">
            
            {/* Location Display */}
            <div className="flex flex-col items-start px-4 border-r border-slate-200">
              <span className="text-xs font-bold uppercase text-gray-500">Location</span>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-medium text-slate-800">Islamabad, PK</span>
              </div>
            </div>

            {/* Date Picker (Fixed Error) */}
            <div className="flex flex-col items-start px-4 border-r border-slate-200">
              <span className="text-xs font-bold uppercase text-gray-500">Check-In / Out</span>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 mt-1 font-medium text-slate-800 hover:text-primary transition-colors">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                    {date?.from ? (
                      date.to ? `${format(date.from, "MMM dd")} - ${format(date.to, "MMM dd")}` : format(date.from, "MMM dd")
                    ) : "Add Dates"}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={new Date()}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                    disabled={{ before: new Date() }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Guests Selection */}              
            <div className="flex flex-col items-start px-4">
              <span className="text-xs font-bold uppercase text-gray-500">Guests</span>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 mt-1 font-medium text-slate-800 hover:text-primary transition-colors">
                    <Users className="w-4 h-4 text-primary" />
                    {guests} {guests === 1 ? "Guest" : "Guests"}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-4 shadow-xl border-slate-200" align="start">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">Guests</span>
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                      > - </Button>
                      <span className="font-bold">{guests}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                        onClick={() => setGuests(Math.min(10, guests + 1))}
                      > + </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
           </div>

            {/* Search Button */}
            <Button 
              onClick={handleSearch}
              className="h-14 rounded-xl text-lg font-bold bg-slate-900 hover:bg-primary transition-all flex gap-2"
            >
              <Search className="w-5 h-5" />
              Search
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}