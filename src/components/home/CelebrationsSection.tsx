import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import celebration from "@/assets/celebration.jpg";

const events = [
  { icon: "🎂", title: "Birthday Parties", desc: "Make their day unforgettable" },
  { icon: "💐", title: "Anniversary", desc: "Celebrate years of togetherness" },
  { icon: "👨‍👩‍👧", title: "Family Gatherings", desc: "Cozy, intimate get-togethers" },
  { icon: "🎉", title: "Special Events", desc: "Custom-built for your occasion" },
];

export function CelebrationsSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0">
        <img src={celebration} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-chocolate/95 via-chocolate/85 to-chocolate/70" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
            Celebrations
          </p>

          <h2 className="font-display text-3xl font-bold leading-tight text-cream sm:text-5xl">
            Your moments, our craft
          </h2>

          <p className="mt-5 text-base leading-relaxed text-cream/80 sm:text-lg">
            From intimate gatherings to grand celebrations, we host them all with warmth, elegance,
            and effortless care.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {events.map((event) => (
            <div
              key={event.title}
              className="glass-card !border-cream/20 !bg-cream/10 rounded-2xl p-6 text-cream transition hover:!bg-cream/20"
            >
              <div className="mb-3 text-3xl">{event.icon}</div>

              <h3 className="font-display text-lg font-semibold">{event.title}</h3>

              <p className="mt-1 text-sm text-cream/70">{event.desc}</p>
            </div>
          ))}
        </div>

        <Link
          to="/celebrate"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-medium text-chocolate shadow-[var(--shadow-glow)] transition hover:scale-105"
        >
          Plan Your Celebration <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
