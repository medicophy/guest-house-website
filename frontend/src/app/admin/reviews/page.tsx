"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Star, Trash2, CheckCircle, MessageSquare, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for initial build
const initialReviews = [
  { id: 1, guest: "Zainab R.", rating: 5, comment: "Exceptional service and very clean rooms. Best in Islamabad!", status: "approved" },
  { id: 2, guest: "Omar K.", rating: 2, comment: "AC was a bit noisy during the night.", status: "pending" },
];

export default function ReviewManagement() {
  const [reviews, setReviews] = useState(initialReviews);

  const deleteReview = (id: number) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Review Management</h1>
            <p className="text-slate-500 font-medium italic">Moderate guest feedback and ratings.</p>
          </div>
          <div className="bg-white px-6 py-2 rounded-2xl border flex items-center gap-2 shadow-sm">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="font-bold text-slate-900">{reviews.length} Total Reviews</span>
          </div>
        </div>

        <div className="grid gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="p-8 border-none shadow-xl rounded-[2rem] bg-white flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-3 grow">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 h-10 w-10 rounded-full flex items-center justify-center font-bold text-slate-600">
                    {review.guest[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{review.guest}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-current" : "text-slate-200"}`} />
                      ))}
                    </div>
                  </div>
                  {review.status === "pending" && (
                    <span className="bg-orange-100 text-orange-600 text-[10px] px-2 py-1 rounded-md font-black uppercase ml-2">Pending Review</span>
                  )}
                </div>
                <p className="text-slate-600 italic leading-relaxed">"{review.comment}"</p>
              </div>

              <div className="flex gap-3 shrink-0">
                {review.status === "pending" && (
                  <Button variant="outline" className="rounded-xl border-green-200 text-green-600 hover:bg-green-50 font-bold">
                    <CheckCircle className="w-4 h-4 mr-2" /> Approve
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => deleteReview(review.id)}
                  className="rounded-xl border-red-100 text-red-500 hover:bg-red-50 font-bold"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {reviews.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-bold">No reviews found in the system.</p>
          </div>
        )}
      </div>
    </div>
  );
}