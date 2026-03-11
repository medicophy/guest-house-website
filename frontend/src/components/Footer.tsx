import Image from "next/image";
import { Mail, Phone, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 mt-20 border-t border-slate-900">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Branding Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 overflow-hidden rounded-lg">
              <Image 
                src="/logo.png" 
                alt="The White Veranda Logo" 
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-lg font-black uppercase tracking-tighter leading-tight">
                White Veranda
              </span>
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">
                Guest House
              </span>
            </div>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            Experience premium comfort and modern hospitality in the heart of Islamabad. Your home away from home.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="/rooms" className="hover:text-primary transition-colors">Browse Rooms</a></li>
            <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
            <li><a href="/admin/login" className="hover:text-primary transition-colors">Staff Portal</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
              <Phone className="w-4 h-4 text-primary" /> +92 51 1234567
            </li>
            <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
              <Mail className="w-4 h-4 text-primary" /> bookings@whiteveranda.pk
            </li>
            <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
              <MapPin className="w-4 h-4 text-primary" /> Islamabad, Pakistan
            </li>
          </ul>
        </div>

        {/* Social Presence */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Connect With Us</h4>
          <div className="flex gap-5">
            {/* Moved title to the <a> tag and added an aria-label for accessibility */}
            <a 
              href="#" 
              title="WhatsApp"
              aria-label="WhatsApp"
              className="p-2 bg-slate-900 rounded-lg hover:text-primary hover:bg-slate-800 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              aria-label="Instagram"
              className="p-2 bg-slate-900 rounded-lg hover:text-primary hover:bg-slate-800 transition-all"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              aria-label="Facebook"
              className="p-2 bg-slate-900 rounded-lg hover:text-primary hover:bg-slate-800 transition-all"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-6 text-[10px] uppercase tracking-widest text-slate-600">
            Available 24/7 for inquiries
          </p>
        </div>
      </div>


      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em]">
        <p>© 2026 The White Veranda. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}