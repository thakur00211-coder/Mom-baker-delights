import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

import hero from "@/assets/hero.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={hero} alt="" width={1920} height={1080} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-chocolate/30 via-chocolate/50 to-chocolate/85" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-28 text-center sm:py-40 lg:py-52">
        <span className="glass-card mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-chocolate animate-fade-up">
          <Sparkles className="h-3.5 w-3.5 text-gold" />
          Celebration Café & Custom Cake Studio
        </span>

        <h1 className="font-display mx-auto max-w-4xl text-4xl font-bold leading-[1.05] text-cream animate-fade-up sm:text-6xl lg:text-7xl">
          Where Every Celebration Begins
          <span className="gold-text block italic">With Something Sweet</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-cream/85 animate-fade-up sm:text-lg">
          Custom cakes, cozy moments & memorable celebrations — handcrafted with love in the heart
          of Taragarh.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up">
          <Link
            to="/customize"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-medium text-chocolate shadow-(--shadow-glow) transition hover:scale-105"
          >
            Customize Your Cake <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            to="/celebrate"
            className="glass-card inline-flex items-center gap-2 rounded-full border-cream/30 bg-cream/15! px-7 py-3.5 font-medium text-cream transition hover:bg-cream/25"
          >
            Plan Your Celebration
          </Link>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 font-medium text-cream/90 transition hover:text-gold"
          >
            Explore Menu →
          </Link>
        </div>
      </div>
    </section>
  );
}
