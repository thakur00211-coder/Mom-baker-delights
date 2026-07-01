import { Star } from "lucide-react";

const reviews = [
  {
    name: "Priya Sharma",
    role: "Birthday Celebration",
    text: "The custom cake for my daughter's 5th birthday was beyond beautiful. Tasted as wonderful as it looked. Mom Bakers made the day magical.",
    rating: 5,
  },
  {
    name: "Rohan Mehta",
    role: "Anniversary",
    text: "We booked the anniversary package — the ambience, the cake, the little details. Felt premium without losing the warmth. Highly recommend.",
    rating: 5,
  },
  {
    name: "Anjali & Friends",
    role: "Regular Visitors",
    text: "Best cappuccino in town and the pastries are unreal. It's now our weekend ritual.",
    rating: 5,
  },
];

export function ReviewsSection() {
  return (
    <section className="bg-gradient-to-b from-peach/20 to-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
            Love Notes
          </p>

          <h2 className="font-display text-3xl font-bold text-chocolate sm:text-5xl">
            From families who celebrate with us
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-3xl border border-border/60 bg-card p-7 shadow-[var(--shadow-soft)]"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>

              <p className="leading-relaxed text-chocolate/85 italic">"{review.text}"</p>

              <div className="mt-5 border-t border-border/60 pt-5">
                <div className="font-semibold text-chocolate">{review.name}</div>
                <div className="text-xs text-muted-foreground">{review.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
