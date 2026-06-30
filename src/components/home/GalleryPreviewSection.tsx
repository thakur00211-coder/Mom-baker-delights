import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import celebration from "@/assets/celebration.jpg";
import customCake from "@/assets/custom-cake.jpg";
import interior from "@/assets/interior.jpg";
import pastries from "@/assets/pastries.jpg";

const galleryCategories = [
  { label: "Cakes", img: customCake },
  { label: "Interior", img: interior },
  { label: "Food", img: pastries },
  { label: "Celebrations", img: celebration },
];

export function GalleryPreviewSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">Gallery</p>

        <h2 className="font-display text-3xl font-bold text-chocolate sm:text-5xl">
          Moments worth savoring
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {galleryCategories.map((category) => (
          <Link
            to="/gallery"
            key={category.label}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
          >
            <img
              src={category.img}
              alt={category.label}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-chocolate/80 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4">
              <div className="font-display text-xl text-cream">{category.label}</div>

              <div className="mt-1 inline-flex items-center gap-1 text-xs text-cream/70">
                View collection <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 rounded-full bg-chocolate px-7 py-3.5 font-medium text-cream transition hover:bg-chocolate/90"
        >
          View Full Gallery <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
