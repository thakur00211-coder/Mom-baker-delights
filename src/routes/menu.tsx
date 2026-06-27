import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { menuItems, categories } from "@/lib/menu-data";
import customCake from "@/assets/custom-cake.jpg";
import pastries from "@/assets/pastries.jpg";
import cafe from "@/assets/cafe.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Mom Bakers" },
      { name: "description", content: "Explore our full menu of cakes, pastries, café specials and beverages." },
    ],
  }),
  component: MenuPage,
});

function imageFor(cat: string) {
  if (cat === "Cakes") return customCake;
  if (cat.includes("Beverage")) return cafe;
  return pastries;
}

function MenuPage() {
  const [active, setActive] = useState<string>("All");
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    return menuItems.filter((m) => {
      if (active !== "All" && m.category !== active) return false;
      if (q && !`${m.name} ${m.description}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [active, q]);

  return (
    <div>
      <section className="bg-gradient-to-b from-peach/30 to-cream pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3">Our Menu</p>
          <h1 className="font-display text-4xl sm:text-6xl text-chocolate font-bold">Crafted fresh, served warm</h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">From signature cakes to weekend brunch favorites — every bite, made with care.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 -mt-2 pb-20">
        <div className="glass-card rounded-3xl p-5 sm:p-6 mb-8 sticky top-20 z-20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the menu…" className="w-full pl-11 pr-4 py-3 rounded-full bg-cream/80 border border-border focus:outline-none focus:ring-2 focus:ring-gold text-sm" />
            </div>
            <div className="flex gap-2 overflow-x-auto -mx-1 px-1">
              {["All", ...categories].map((c) => (
                <button key={c} onClick={() => setActive(c)} className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${active === c ? "bg-chocolate text-cream" : "bg-cream/70 text-chocolate hover:bg-peach/40"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No items match your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="group bg-card rounded-3xl overflow-hidden border border-border/60 hover:shadow-[var(--shadow-elegant)] transition-all">
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img src={imageFor(item.category)} alt={item.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">{item.category}</span>
                    {item.tag && <span className="text-[10px] bg-peach/40 text-chocolate px-2 py-0.5 rounded-full font-medium">{item.tag}</span>}
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold text-chocolate leading-tight">{item.name}</h3>
                    <span className="font-medium text-chocolate whitespace-nowrap">₹{item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}