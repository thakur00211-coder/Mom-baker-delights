import customCake from "@/assets/custom-cake.jpg";

export function CustomizeIntroPanel() {
  return (
    <div className="lg:sticky lg:top-28">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
        Custom Cake Studio
      </p>

      <h1 className="font-display text-4xl font-bold leading-tight text-chocolate sm:text-5xl">
        Tell us about your dream cake
      </h1>

      <p className="mt-5 leading-relaxed text-muted-foreground">
        Share your idea, occasion, and any inspiration image — our pastry team will reach out within
        a few hours to craft your perfect celebration cake.
      </p>

      <div className="mt-8 overflow-hidden rounded-[2rem] shadow-[var(--shadow-elegant)]">
        <img src={customCake} alt="Custom cake" loading="lazy" className="w-full" />
      </div>
    </div>
  );
}
