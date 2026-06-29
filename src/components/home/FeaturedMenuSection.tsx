import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import cafe from "@/assets/cafe.jpg";
import customCake from "@/assets/custom-cake.jpg";
import pastries from "@/assets/pastries.jpg";
import { menuItems } from "@/lib/menu-data";

export function FeaturedMenuSection() {
  const featured = menuItems.filter((item) => item.featured).slice(0, 8);

  return (
    <section className="bg-gradient-to-b from-cream to-peach/20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Featured Menu
            </p>

            <h2 className="font-display max-w-xl text-3xl font-bold text-chocolate sm:text-5xl">
              Tastes our guests come back for
            </h2>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-1 font-medium text-chocolate hover:text-gold"
          >
            View Full Menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={
                    item.category === "Cakes"
                      ? customCake
                      : item.category.includes("Beverage")
                        ? cafe
                        : pastries
                  }
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-gold">
                    {item.category}
                  </span>

                  {item.tag && (
                    <span className="rounded-full bg-peach/40 px-2 py-0.5 text-[10px] font-medium text-chocolate">
                      {item.tag}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-lg font-semibold leading-tight text-chocolate">
                  {item.name}
                </h3>

                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {item.description}
                </p>

                <p className="mt-3 font-medium text-chocolate">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
