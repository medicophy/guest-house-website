"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, ImageIcon, DollarSign, Type, CheckCircle2, X, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AddRoomDrawer({ isOpen, onClose, refreshRooms, editData }: any) {
  // Fix: Explicitly define the state type to include an optional 'id'
  const [formData, setFormData] = useState<{
    id?: number;
    name: string;
    description: string;
    price_per_night: number;
    capacity: number;
    image_url: string;
  }>({
    name: "",
    description: "",
    price_per_night: 0,
    capacity: 2,
    image_url: ""
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        id: editData.id,
        name: editData.name,
        description: editData.description,
        price_per_night: editData.price_per_night,
        capacity: editData.capacity || 2,
        image_url: editData.image_url
      });
    } else {
      setFormData({ name: "", description: "", price_per_night: 0, capacity: 2, image_url: "" });
    }
  }, [editData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editData;
    // Use formData.id for the URL if editing
    const url = isEdit 
      ? `http://localhost:5000/api/rooms/${formData.id}` 
      : "http://localhost:5000/api/rooms";
    
    try {
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        refreshRooms();
        onClose();
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z- flex justify-end">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />
      <Card className="relative w-full max-w-lg h-full bg-white rounded-l-[3rem] shadow-2xl p-10 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
              {editData ? "Edit Room" : "Add New Room"}
            </h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Inventory Management</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 grow overflow-y-auto pr-2">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 tracking-widest">
              <Type className="w-3 h-3" /> Room Title
            </label>
            <Input 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              placeholder="e.g. Executive Suite" 
              className="h-14 rounded-2xl border-slate-200" 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 tracking-widest">
                <DollarSign className="w-3 h-3" /> Price / Night
              </label>
              <Input 
                type="number" 
                value={formData.price_per_night} 
                onChange={(e) => setFormData({...formData, price_per_night: parseFloat(e.target.value)})} 
                className="h-14 rounded-2xl border-slate-200" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 tracking-widest">
                <Users className="w-3 h-3" /> Capacity
              </label>
              <Input 
                type="number" 
                value={formData.capacity} 
                onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})} 
                className="h-14 rounded-2xl border-slate-200" 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 tracking-widest">
              <ImageIcon className="w-3 h-3" /> Image URL
            </label>
            <Input 
              value={formData.image_url} 
              onChange={(e) => setFormData({...formData, image_url: e.target.value})} 
              placeholder="https://..." 
              className="h-14 rounded-2xl border-slate-200" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest text-left block">Description</label>
            <Textarea 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
              placeholder="Describe the room..." 
              className="min-h-[120px] rounded-2xl border-slate-200 py-4" 
            />
          </div>

          <div className="pt-8">
            <Button type="submit" className="w-full h-16 rounded-2xl bg-slate-900 hover:bg-primary hover:text-slate-900 font-black text-lg transition-all gap-3">
              {editData ? "Update Room" : "Publish Room"} <CheckCircle2 className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}