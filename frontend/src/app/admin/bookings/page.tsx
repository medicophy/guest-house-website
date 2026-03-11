"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Search, MoreVertical, TrendingUp, Users, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface Booking {
  id: number;
  room_id: number;
  guest_name: string;
  guest_email: string;
  check_in: string;
  check_out: string;
  total_price: number;
  status: string;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all"); // all, current, upcoming, past
  const [searchQuery, setSearchQuery] = useState("");

  // 1. FETCH LIVE DATA FROM GO BACKEND
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/bookings");
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // 2. LOGIC: FILTER BY DATE AND SEARCH
  const filteredBookings = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return bookings.filter((b) => {
      const checkIn = new Date(b.check_in);
      const checkOut = new Date(b.check_out);
      const matchesSearch = b.guest_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            b.guest_email.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeTab === "current") return today >= checkIn && today <= checkOut;
      if (activeTab === "upcoming") return checkIn > today;
      if (activeTab === "past") return checkOut < today;
      return true; // "all" tab
    });
  }, [bookings, activeTab, searchQuery]);

  // 3. ANALYTICS CALCULATIONS
  const stats = useMemo(() => {
    const totalRevenue = bookings.reduce((sum, b) => sum + b.total_price, 0);
    const activeStays = bookings.filter(b => {
      const today = new Date();
      return today >= new Date(b.check_in) && today <= new Date(b.check_out);
    }).length;
    const pending = bookings.filter(b => b.status === "pending").length;

    return { totalRevenue, activeStays, pending };
  }, [bookings]);

  if (loading) return <div className="p-10 text-slate-500 font-bold uppercase tracking-widest">Loading Dashboard...</div>;

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
      
      {/* ANALYTICS PANEL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Revenue</p>
            <h3 className="text-3xl font-black text-slate-900">${stats.totalRevenue.toLocaleString()}</h3>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
            <TrendingUp className="text-emerald-500 w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Active Stays</p>
            <h3 className="text-3xl font-black text-slate-900">{stats.activeStays}</h3>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
            <Users className="text-blue-500 w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Pending Requests</p>
            <h3 className="text-3xl font-black text-slate-900">{stats.pending.toString().padStart(2, '0')}</h3>
          </div>
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
            <Clock className="text-orange-500 w-6 h-6" />
          </div>
        </div>
      </div>

      {/* RESERVATIONS TABLE CONTAINER */}
      <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">Reservations</h2>
              {/* DATE FILTER TABS */}
              <div className="flex gap-6 border-b border-slate-100">
                {["all", "current", "upcoming", "past"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "pb-2 text-[10px] font-black uppercase tracking-widest transition-all relative",
                      activeTab === tab ? "text-primary" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    {tab}
                    {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* SEARCH BOX */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input
                type="text"
                placeholder="Search guest name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-50">
                  <th className="pb-4 pl-4">Guest Info</th>
                  <th className="pb-4">Stay Duration</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Revenue</th>
                  <th className="pb-4 text-right pr-4">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-6 pl-4">
                      <div className="font-bold text-slate-900">{booking.guest_name}</div>
                      <div className="text-xs text-slate-400">{booking.guest_email}</div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-slate-900 font-bold">
                        <Calendar className="w-3 h-3 text-primary" />
                        {new Date(booking.check_in).toLocaleDateString()}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-tighter">
                        to {new Date(booking.check_out).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                        booking.status === "confirmed" ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"
                      )}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="font-bold text-slate-900">${booking.total_price.toFixed(2)}</td>
                    <td className="text-right pr-4">
                      <button className="p-2 hover:bg-white rounded-xl transition-colors shadow-sm border border-transparent hover:border-slate-100">
                        <MoreVertical className="w-4 h-4 text-slate-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredBookings.length === 0 && (
              <div className="py-20 text-center text-slate-400 text-xs uppercase tracking-widest italic">
                No bookings found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}