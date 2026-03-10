import { Mail, Phone, MapPin, Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 mt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="text-white text-xl font-bold italic">Residential Inn</h3>
          <p className="text-sm leading-relaxed">
            Revolutionizing hospitality in Pakistan through high-impact technology and premium comfort.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="/rooms" className="hover:text-primary">Browse Rooms</a></li>
            <li><a href="/admin/bookings" className="hover:text-primary">Staff Portal</a></li>
            <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +92 51 1234567</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> bookings@resinn.pk</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Islamabad, Pakistan</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Follow Our Progress</h4>
          <div className="flex gap-4">
            <Github className="w-6 h-6 cursor-pointer hover:text-white" />
            <Twitter className="w-6 h-6 cursor-pointer hover:text-white" />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center text-xs">
        © 2026 Residential Inn. A High Impact Solutions Project.
      </div>
    </footer>
  );
}