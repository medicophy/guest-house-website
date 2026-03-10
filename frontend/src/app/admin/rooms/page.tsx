"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Edit3, Bed, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddRoomDrawer from "./AddRoomDrawer";

export default function ManageRoomsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/rooms");
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRooms(); }, []);

  const handleEdit = (room: any) => {
    setEditingRoom(room);
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this room?")) return;
    await fetch(`http://localhost:5000/api/rooms/${id}`, { method: "DELETE" });
    fetchRooms();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Room Inventory</h1>
            <p className="text-slate-500 font-medium italic">Manage your property listings and pricing.</p>
          </div>
          <Button onClick={() => { setEditingRoom(null); setIsDrawerOpen(true); }} className="rounded-xl bg-slate-900 hover:bg-primary hover:text-slate-900 font-bold h-12 transition-all">
            <Plus className="w-4 h-4 mr-2" /> Add New Room
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-slate-300" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room: any) => (
              <Card key={room.id} className="overflow-hidden border-none shadow-xl rounded-[2.5rem] bg-white group transition-all duration-300">
                <div className="h-48 relative overflow-hidden">
                  <img src={room.image_url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={room.name} />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-xl text-xs font-black text-slate-900 shadow-xl border border-slate-100">
                    ${room.price_per_night}/night
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-slate-900 mb-2 truncate">{room.name}</h3>
                  <p className="text-slate-500 text-xs line-clamp-2 mb-6 h-8 font-medium">{room.description}</p>
                  <div className="flex gap-2 pt-4 border-t border-slate-50">
                    <Button onClick={() => handleEdit(room)} variant="outline" className="flex-1 rounded-xl border-slate-200 hover:bg-slate-50 font-bold text-xs uppercase tracking-widest">
                      <Edit3 className="w-3 h-3 mr-2" /> Edit
                    </Button>
                    <Button onClick={() => handleDelete(room.id)} variant="outline" className="rounded-xl border-red-50 hover:bg-red-50 hover:text-red-500 font-bold text-xs text-red-300">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <AddRoomDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => { setIsDrawerOpen(false); setEditingRoom(null); }} 
          refreshRooms={fetchRooms}
          editData={editingRoom}
        />
      </div>
    </div>
  );
}