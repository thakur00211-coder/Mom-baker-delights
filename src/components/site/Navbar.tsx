import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Mail } from "lucide-react";

import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/customize", label: "Custom Cakes" },
  { to: "/celebrate", label: "Celebrations" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass-card !rounded-none border-b border-border/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Mom Bakers"
            className="h-12 w-12 rounded-full object-cover shadow-(--shadow-soft)"
          />

          <span className="font-display text-xl font-bold tracking-tight text-chocolate">
            Mom Bakers
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-full px-3 py-2 text-sm font-medium text-chocolate/80 transition-colors hover:bg-peach/30 hover:text-chocolate"
              activeProps={{ className: "text-chocolate bg-peach/40" }}
              activeOptions={{ exact: link.to === "/" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-chocolate px-6 py-2.5 text-sm font-semibold text-cream shadow-(--shadow-soft) transition-all duration-300 hover:scale-105 hover:bg-chocolate/90"
          >
            <Mail className="h-4 w-4" />
            Contact Us
          </Link>
        </div>

        <button
          onClick={() => setOpen((current) => !current)}
          className="rounded-full p-2 text-chocolate hover:bg-peach/30 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 lg:hidden",
          open ? "max-h-[500px]" : "max-h-0",
        )}
      >
        <div className="flex flex-col gap-1 border-t border-border/50 bg-cream/90 px-4 pb-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-chocolate/80 hover:bg-peach/30"
              activeProps={{ className: "text-chocolate bg-peach/40" }}
            >
              {link.label}
            </Link>
          ))}

          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-chocolate px-5 py-3 font-medium text-cream"
          >
            <Mail className="h-4 w-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
