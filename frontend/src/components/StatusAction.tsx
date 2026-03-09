"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function StatusAction({ bookingId, currentStatus }: { bookingId: number, currentStatus: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function updateStatus(newStatus: string) {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        router.refresh(); // Refreshes the server component data
      }
    } catch (error) {
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  }

  if (currentStatus === "cancelled") {
    return <span className="text-sm text-destructive font-medium">Cancelled</span>;
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="text-destructive hover:text-destructive hover:bg-destructive/10"
      onClick={() => updateStatus("cancelled")}
      disabled={loading}
    >
      {loading ? "..." : "Cancel"}
    </Button>
  );
}