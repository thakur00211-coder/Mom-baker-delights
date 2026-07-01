import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";

export function ContactPreviewSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <div className="relative grid items-center gap-12 overflow-hidden rounded-[2.5rem] bg-chocolate p-10 text-cream sm:p-16 lg:grid-cols-2">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />

        <div className="relative">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">Visit Us</p>

          <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">
            Come for the cake.
            <br />
            Stay for the warmth.
          </h2>

          <p className="mt-5 max-w-md text-cream/75">
            Drop in, call us, or book your celebration online. We'd love to hear from you.
          </p>
        </div>

        <div className="relative space-y-5">
          <div className="flex gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/20">
              <Phone className="h-5 w-5 text-gold" />
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-cream/60">Call · WhatsApp</div>

              <a href="tel:6280781239" className="font-display text-xl">
                +91 62807 81239
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/20">
              <MapPin className="h-5 w-5 text-gold" />
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-cream/60">Address</div>

              <div className="text-sm leading-relaxed">
                Dinanagar - Narot Jaimal Singh Rd, Near Nomani Pull, Taragarh, Punjab 143534
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/20">
              <Clock className="h-5 w-5 text-gold" />
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-cream/60">Open Daily</div>

              <div className="font-display text-xl">8 AM – 9 PM</div>
            </div>
          </div>

          <Link
            to="/contact"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-medium text-chocolate transition hover:scale-105"
          >
            Get in touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
