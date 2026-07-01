import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Sparkles } from "lucide-react";

import customCake from "@/assets/custom-cake.jpg";

export function CustomizeCakeSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-gold/30 to-peach/30 blur-2xl" />

          <img
            src={customCake}
            alt="Custom celebration cake"
            loading="lazy"
            className="relative w-full rounded-[2rem] shadow-[var(--shadow-elegant)]"
          />

          <div className="glass-card absolute -bottom-6 -right-6 hidden items-center gap-3 rounded-2xl p-4 sm:flex">
            <Heart className="h-5 w-5 fill-gold text-gold" />

            <div className="text-xs">
              <div className="font-semibold text-chocolate">2,500+ cakes</div>
              <div className="text-muted-foreground">crafted with love</div>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
            Customize Your Cake
          </p>

          <h2 className="font-display text-3xl font-bold leading-tight text-chocolate sm:text-5xl">
            Design the cake of your dreams
          </h2>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Share your vision and we'll craft a one-of-a-kind cake for birthdays, anniversaries, and
            life's sweetest moments — from elegant single tiers to grand celebration centerpieces.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-chocolate/80">
            <li className="flex gap-2">
              <Sparkles className="mt-0.5 h-4 w-4 text-gold" />
              Hand-painted designs & edible gold leaf
            </li>

            <li className="flex gap-2">
              <Sparkles className="mt-0.5 h-4 w-4 text-gold" />
              Premium flavor combinations, dietary options available
            </li>

            <li className="flex gap-2">
              <Sparkles className="mt-0.5 h-4 w-4 text-gold" />
              Personal consultation with our pastry team
            </li>
          </ul>

          <Link
            to="/customize"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-chocolate px-7 py-3.5 font-medium text-cream shadow-[var(--shadow-soft)] transition hover:bg-chocolate/90"
          >
            Customize Your Cake <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
