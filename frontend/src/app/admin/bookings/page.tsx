import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import StatusAction from "@/components/StatusAction"; // Import here

async function getBookings() {
  const res = await fetch("http://localhost:5000/api/bookings", { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function AdminBookings() {
  const bookings = await getBookings();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 italic">Manage Reservations</h1>
      <div className="border rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Guest</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((b: any) => (
              <TableRow key={b.id}>
                <TableCell>
                  <div className="font-bold">{b.guest_name}</div>
                  <div className="text-xs text-muted-foreground">{b.guest_email}</div>
                </TableCell>
                <TableCell className="text-sm">
                  {b.check_in} to {b.check_out}
                </TableCell>
                <TableCell className="font-semibold">${b.total_price}</TableCell>
                <TableCell>
                  <Badge variant={b.status === "cancelled" ? "destructive" : "outline"} className="capitalize">
                    {b.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <StatusAction bookingId={b.id} currentStatus={b.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}