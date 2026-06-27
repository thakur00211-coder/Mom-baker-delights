import { createFileRoute } from "@tanstack/react-router";
import { Heart, Sparkles, Users } from "lucide-react";
import interior from "@/assets/interior.jpg";
import customCake from "@/assets/custom-cake.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Mom Bakers" },
      { name: "description", content: "Mom Bakers — a celebration café and custom cake studio in Taragarh, Punjab." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-12 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3">Our Story</p>
        <h1 className="font-display text-4xl sm:text-6xl text-chocolate font-bold leading-[1.1]">A celebration café, born from love</h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Mom Bakers began with a simple idea — that every celebration, big or small, deserves a little magic. Today, we're proud to be Taragarh's home for custom cakes, cozy coffee mornings, and the kind of moments families remember forever.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center py-12">
        <img src={interior} alt="Our café" loading="lazy" className="rounded-[2rem] shadow-[var(--shadow-elegant)] w-full" />
        <div>
          <h2 className="font-display text-3xl sm:text-4xl text-chocolate font-bold">More than a bakery</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We built Mom Bakers as a destination — a warm, modern space where students come to study, families gather on Sundays, and couples mark their milestones over coffee and cake.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Every cake leaving our studio is made by hand. Every cup of coffee is poured with care. We believe little details create lasting memories, and that's the standard we hold ourselves to, every single day.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center py-12">
        <div className="order-2 lg:order-1">
          <h2 className="font-display text-3xl sm:text-4xl text-chocolate font-bold">The art of celebration</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our custom cake studio is where ideas turn edible. Whether it's a hand-painted floral cake for a 50th anniversary or a whimsical dinosaur cake for a five-year-old, we treat each request like our own.
          </p>
        </div>
        <img src={customCake} alt="Custom cake" loading="lazy" className="order-1 lg:order-2 rounded-[2rem] shadow-[var(--shadow-elegant)] w-full" />
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: Heart, t: "Made with love", d: "Every cake hand-finished by our pastry team." },
            { icon: Sparkles, t: "Premium ingredients", d: "Belgian chocolate, fresh dairy, finest flavors." },
            { icon: Users, t: "Family at heart", d: "A welcoming space for every age and occasion." },
          ].map((v) => (
            <div key={v.t} className="bg-card rounded-3xl p-8 border border-border/60 text-center">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-peach to-gold/70 grid place-items-center mx-auto mb-4">
                <v.icon className="h-6 w-6 text-chocolate" />
              </div>
              <h3 className="font-display text-xl font-semibold text-chocolate">{v.t}</h3>
              <p className="text-sm text-muted-foreground mt-2">{v.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}