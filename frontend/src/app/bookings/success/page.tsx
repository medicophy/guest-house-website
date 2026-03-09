import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function BookingSuccess() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="bg-green-50 p-6 rounded-full mb-6">
        <CheckCircle2 className="w-16 h-16 text-green-600" />
      </div>
      
      <h1 className="text-4xl font-bold tracking-tight mb-2">Booking Confirmed!</h1>
      <p className="text-xl text-muted-foreground max-w-md mb-8">
        Thank you for choosing us. We have received your reservation and a confirmation email will be sent shortly.
      </p>

      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild>
          <Link href="/rooms">View Other Rooms</Link>
        </Button>
      </div>
    </main>
  );
}