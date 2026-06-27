import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Cake } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/customize", label: "Custom Cakes" },
  { to: "/celebrate", label: "Celebrations" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 glass-card !rounded-none border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="h-9 w-9 rounded-full bg-gradient-to-br from-gold to-peach grid place-items-center shadow-[var(--shadow-glow)]">
            <Cake className="h-5 w-5 text-chocolate" />
          </span>
          <span className="font-display text-xl font-bold text-chocolate tracking-tight">
            Mom Bakers
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 text-sm font-medium text-chocolate/80 hover:text-chocolate rounded-full hover:bg-peach/30 transition-colors"
              activeProps={{ className: "text-chocolate bg-peach/40" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Link
            to="/customize"
            className="inline-flex items-center gap-2 bg-chocolate text-cream px-5 py-2.5 rounded-full text-sm font-medium hover:bg-chocolate/90 transition shadow-[var(--shadow-soft)]"
          >
            Order a Cake
          </Link>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden p-2 rounded-full hover:bg-peach/30 text-chocolate"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          open ? "max-h-[500px]" : "max-h-0",
        )}
      >
        <div className="px-4 pb-4 flex flex-col gap-1 bg-cream/90 border-t border-border/50">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-chocolate/80 hover:bg-peach/30 font-medium"
              activeProps={{ className: "text-chocolate bg-peach/40" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/customize"
            onClick={() => setOpen(false)}
            className="mt-2 bg-chocolate text-cream text-center px-5 py-3 rounded-full font-medium"
          >
            Order a Cake
          </Link>
        </div>
      </div>
    </header>
  );
}
