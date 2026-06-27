import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import customCake from "@/assets/custom-cake.jpg";
import hero from "@/assets/hero.jpg";
import celebration from "@/assets/celebration.jpg";
import interior from "@/assets/interior.jpg";
import pastries from "@/assets/pastries.jpg";
import cafe from "@/assets/cafe.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Mom Bakers" },
      { name: "description", content: "A glimpse into our cakes, café and celebration moments." },
    ],
  }),
  component: GalleryPage,
});

type Cat = "All" | "Cakes" | "Food" | "Interior" | "Celebrations";
const items: { src: string; cat: Cat }[] = [
  { src: hero, cat: "Cakes" },
  { src: customCake, cat: "Cakes" },
  { src: pastries, cat: "Food" },
  { src: cafe, cat: "Food" },
  { src: interior, cat: "Interior" },
  { src: celebration, cat: "Celebrations" },
  { src: customCake, cat: "Cakes" },
  { src: hero, cat: "Celebrations" },
  { src: pastries, cat: "Food" },
  { src: interior, cat: "Interior" },
  { src: cafe, cat: "Food" },
  { src: celebration, cat: "Celebrations" },
];

function GalleryPage() {
  const [filter, setFilter] = useState<Cat>("All");
  const filtered = filter === "All" ? items : items.filter((i) => i.cat === filter);

  return (
    <div>
      <section className="bg-gradient-to-b from-peach/30 to-cream pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3">Gallery</p>
          <h1 className="font-display text-4xl sm:text-6xl text-chocolate font-bold">A taste of our world</h1>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {(["All", "Cakes", "Food", "Interior", "Celebrations"] as Cat[]).map((c) => (
            <button key={c} onClick={() => setFilter(c)} className={`px-5 py-2 rounded-full text-sm font-medium transition ${filter === c ? "bg-chocolate text-cream" : "bg-cream/70 text-chocolate hover:bg-peach/40"}`}>{c}</button>
          ))}
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
          {filtered.map((i, idx) => (
            <div key={idx} className="break-inside-avoid rounded-2xl overflow-hidden shadow-[var(--shadow-soft)] group">
              <img src={i.src} alt={i.cat} loading="lazy" className="w-full group-hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}