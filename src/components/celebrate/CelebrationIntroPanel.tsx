import { Sparkles } from "lucide-react";
import celebration from "@/assets/celebration.jpg";

const celebrationFeatures = [
  "Custom cake included",
  "Themed décor setup",
  "Photography corner",
  "Dedicated host",
];

export function CelebrationIntroPanel() {
  return (
    <div className="lg:sticky lg:top-28">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
        Plan Your Celebration
      </p>

      <h1 className="font-display text-4xl font-bold leading-tight text-chocolate sm:text-5xl">
        Let's make it unforgettable
      </h1>

      <p className="mt-5 leading-relaxed text-muted-foreground">
        From intimate birthday parties to anniversary surprises, our team takes care of every detail
        — décor, cake, and a warm welcome for your guests.
      </p>

      <div className="mt-8 overflow-hidden rounded-[2rem] shadow-[var(--shadow-elegant)]">
        <img src={celebration} alt="Celebration setup" loading="lazy" className="w-full" />
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-3 text-sm">
        {celebrationFeatures.map((feature) => (
          <li key={feature} className="flex gap-2 text-chocolate/85">
            <Sparkles className="mt-0.5 h-4 w-4 text-gold" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
