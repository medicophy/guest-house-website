"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  Users, 
  TrendingUp, 
  CalendarCheck, 
  Settings, 
  MoreVertical,
  Search,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AddRoomDrawer from "../rooms/AddRoomDrawer"; // Ensure this matches your file path

export default function AdminBookingsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const stats = [
    { label: "Monthly Revenue", value: "$12,450", icon: TrendingUp, color: "text-green-500" },
    { label: "Active Stays", value: "14", icon: Users, color: "text-blue-500" },
    { label: "Pending Requests", value: "03", icon: CalendarCheck, color: "text-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
              Property Manager
            </h1>
            <p className="text-slate-500 font-medium italic">
              Managing the heritage of The White Veranda.
            </p>
          </div>
          
          {/* The button container follows immediately after */}
          <div className="flex gap-4">
            {/* ... your existing buttons ... */}
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Dashboard</h1>
            <p className="text-slate-500 font-medium italic">Welcome back to Residential Inn HQ.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="rounded-xl border-slate-200 bg-white font-bold h-12 hover:bg-slate-50">
              <Settings className="w-4 h-4 mr-2" /> System Settings
            </Button>
            {/* TRIGGER FOR THE DRAWER */}
            <Button 
              onClick={() => setIsDrawerOpen(true)}
              className="rounded-xl bg-slate-900 hover:bg-primary hover:text-slate-900 font-bold h-12 transition-all"
            >
              <Plus className="w-4 h-4 mr-2" /> Add New Room
            </Button>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="p-8 border-none shadow-xl rounded-[2rem] bg-white group hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-slate-50 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <MoreVertical className="text-slate-300 w-5 h-5 cursor-pointer hover:text-slate-600" />
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
              <h2 className="text-4xl font-black text-slate-900 mt-1">{stat.value}</h2>
            </Card>
          ))}
        </div>

        {/* Recent Activity / Bookings Table */}
        <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Recent Reservations</h3>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input 
                placeholder="Search guest or room..." 
                className="w-full bg-slate-50 border border-transparent focus:border-slate-200 rounded-xl h-10 pl-10 pr-4 text-sm focus:ring-0 outline-none transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                  <th className="px-8 py-4">Guest Info</th>
                  <th className="px-8 py-4">Room Category</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Revenue</th>
                  <th className="px-8 py-4 text-right">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium text-slate-600">
                {/* Example Static Row */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <p className="text-slate-900 font-bold">Ahmed Ali</p>
                    <p className="text-xs opacity-60">ahmed@example.pk</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-slate-900 font-bold">Executive Suite</span>
                    <p className="text-[10px] uppercase text-slate-400">Block A - 4 Nights</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="bg-green-100 text-green-700 text-[10px] px-3 py-1 rounded-lg font-black uppercase tracking-tighter">
                      Confirmed
                    </span>
                  </td>
                  <td className="px-8 py-6 text-slate-900 font-black">$420.00</td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-slate-400" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* SLIDING DRAWER COMPONENT */}
        <AddRoomDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      </div>
    </div>
  );
}