import { Link } from "@tanstack/react-router";
import { Cake, Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-chocolate text-cream/90 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-9 w-9 rounded-full bg-gradient-to-br from-gold to-peach grid place-items-center">
              <Cake className="h-5 w-5 text-chocolate" />
            </span>
            <span className="font-display text-xl font-bold text-cream">Mom Bakers</span>
          </div>
          <p className="text-sm text-cream/70 leading-relaxed">
            Celebration Café & Custom Cake Studio. Crafting sweet memories since day one.
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href="#"
              className="h-9 w-9 rounded-full bg-cream/10 grid place-items-center hover:bg-gold hover:text-chocolate transition"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="h-9 w-9 rounded-full bg-cream/10 grid place-items-center hover:bg-gold hover:text-chocolate transition"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg text-gold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/menu" className="hover:text-gold">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/customize" className="hover:text-gold">
                Custom Cakes
              </Link>
            </li>
            <li>
              <Link to="/celebrate" className="hover:text-gold">
                Celebrations
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-gold">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gold">
                Our Story
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg text-gold mb-4">Visit Us</h4>
          <ul className="space-y-3 text-sm text-cream/80">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" />
              <span>
                Dinanagar - Narot Jaimal Singh Rd, Near Nomani Pull, Taragarh, Punjab 143534
              </span>
            </li>
            <li className="flex gap-2">
              <Clock className="h-4 w-4 mt-0.5 text-gold shrink-0" />
              <span>Open Daily · 8 AM – 9 PM</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg text-gold mb-4">Get in touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <Phone className="h-4 w-4 mt-0.5 text-gold" />
              <a href="tel:6280781239" className="hover:text-gold">
                +91 62807 81239
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/916280781239"
                className="inline-flex items-center gap-2 bg-gold text-chocolate font-medium px-4 py-2 rounded-full text-sm hover:bg-gold/90 transition"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/60">
        © {new Date().getFullYear()} Mom Bakers · Made with warmth in Taragarh
      </div>
    </footer>
  );
}
