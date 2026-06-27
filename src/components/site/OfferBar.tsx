import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

const offers = [
  "✨ Free Delivery on orders above ₹499",
  "🎂 Birthday Cake Special — 15% off custom orders this week",
  "💐 Anniversary Celebration Packages now available",
];

export function OfferBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % offers.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-chocolate text-cream text-xs sm:text-sm py-2 px-4 text-center font-medium tracking-wide">
      <span className="inline-flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-gold" />
        <span key={i} className="animate-fade-up">{offers[i]}</span>
      </span>
    </div>
  );
}