import { Cake, Coffee, Sparkles, Users, Utensils } from "lucide-react";

const reasons = [
  {
    icon: Cake,
    title: "Premium Custom Cakes",
    desc: "Hand-crafted designs for every milestone — birthdays, anniversaries, weddings.",
  },
  {
    icon: Sparkles,
    title: "Celebration Events",
    desc: "We turn your moments into memories with curated celebration packages.",
  },
  {
    icon: Coffee,
    title: "Cozy Café Experience",
    desc: "A warm, intimate space designed for conversations that linger.",
  },
  {
    icon: Utensils,
    title: "Freshly Prepared Food",
    desc: "Pastries, cafe specials and beverages made fresh, every single day.",
  },
  {
    icon: Users,
    title: "Family Friendly",
    desc: "A welcoming home for students, families and everyone in between.",
  },
];

export function WhyMomBakersSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
          Why Mom Bakers
        </p>

        <h2 className="font-display text-3xl font-bold text-chocolate sm:text-5xl">
          More than a café — a celebration destination
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {reasons.map((reason) => (
          <div
            key={reason.title}
            className="rounded-3xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-elegant)"
          >
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-linear-to-br from-peach to-gold/70">
              <reason.icon className="h-6 w-6 text-chocolate" />
            </div>

            <h3 className="font-display mb-1.5 text-lg font-semibold text-chocolate">
              {reason.title}
            </h3>

            <p className="text-sm leading-relaxed text-muted-foreground">{reason.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
