import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, BookOpen, CheckCircle } from "lucide-react";
import StatusAction from "@/components/StatusAction";

async function getStats() {
  const res = await fetch("http://localhost:5000/api/admin/stats", { cache: 'no-store' });
  if (!res.ok) return { total_revenue: 0, total_bookings: 0, active_bookings: 0 };
  return res.json();
}

async function getBookings() {
  const res = await fetch("http://localhost:5000/api/bookings", { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function AdminDashboard() {
  const [stats, bookings] = await Promise.all([getStats(), getBookings()]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      <h1 className="text-4xl font-black tracking-tight uppercase">Management Console</h1>

      {/* Analytics Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-md border-l-4 border-l-green-500">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${stats.total_revenue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-l-4 border-l-blue-500">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Total Bookings</CardTitle>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total_bookings}</div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-l-4 border-l-orange-500">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Active</CardTitle>
            <CheckCircle className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.active_bookings}</div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Table */}
      <div className="rounded-xl border bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold">Guest</TableHead>
              <TableHead className="font-bold">Stay Dates</TableHead>
              <TableHead className="font-bold">Total Price</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((b: any) => (
              <TableRow key={b.id}>
                <TableCell>
                  <div className="font-bold">{b.guest_name}</div>
                  <div className="text-xs text-muted-foreground">{b.guest_email}</div>
                </TableCell>
                <TableCell className="text-sm">{b.check_in} to {b.check_out}</TableCell>
                <TableCell className="font-mono font-semibold">${b.total_price}</TableCell>
                <TableCell>
                  <Badge variant={b.status === "cancelled" ? "destructive" : "secondary"} className="uppercase text-[10px]">
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