import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star, Phone, MapPin, Clock } from "lucide-react";
import customCake from "@/assets/custom-cake.jpg";
import celebration from "@/assets/celebration.jpg";
import interior from "@/assets/interior.jpg";
import pastries from "@/assets/pastries.jpg";
import { HeroSection } from "@/components/home/HeroSection";
import { WhyMomBakersSection } from "@/components/home/WhyMomBakersSection";
import { FeaturedMenuSection } from "@/components/home/FeaturedMenuSection";
import { CustomizeCakeSection } from "@/components/home/CustomizeCakeSection";
import { CelebrationsSection } from "@/components/home/CelebrationsSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mom Bakers — Celebration Café & Custom Cake Studio" },
      {
        name: "description",
        content:
          "Where every celebration begins with something sweet. Custom cakes, cozy moments and memorable celebrations in Taragarh, Punjab.",
      },
      { property: "og:title", content: "Mom Bakers — Celebration Café & Custom Cake Studio" },
      {
        property: "og:description",
        content: "Custom cakes, cozy moments and memorable celebrations.",
      },
    ],
  }),
  component: Index,
});

const events = [
  { icon: "🎂", title: "Birthday Parties", desc: "Make their day unforgettable" },
  { icon: "💐", title: "Anniversary", desc: "Celebrate years of togetherness" },
  { icon: "👨‍👩‍👧", title: "Family Gatherings", desc: "Cozy, intimate get-togethers" },
  { icon: "🎉", title: "Special Events", desc: "Custom-built for your occasion" },
];

const galleryCats = [
  { label: "Cakes", img: customCake },
  { label: "Interior", img: interior },
  { label: "Food", img: pastries },
  { label: "Celebrations", img: celebration },
];

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

function Index() {
  return (
    <>
      <HeroSection />
      <WhyMomBakersSection />
      <FeaturedMenuSection />
      <CustomizeCakeSection />
      <CelebrationsSection />

      {/* GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3">Gallery</p>
          <h2 className="font-display text-3xl sm:text-5xl text-chocolate font-bold">
            Moments worth savoring
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryCats.map((g) => (
            <Link
              to="/gallery"
              key={g.label}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden"
            >
              <img
                src={g.img}
                alt={g.label}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="font-display text-xl text-cream">{g.label}</div>
                <div className="text-xs text-cream/70 inline-flex items-center gap-1 mt-1">
                  View collection <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 bg-chocolate text-cream px-7 py-3.5 rounded-full font-medium hover:bg-chocolate/90 transition"
          >
            View Full Gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-gradient-to-b from-peach/20 to-cream py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3">
              Love Notes
            </p>
            <h2 className="font-display text-3xl sm:text-5xl text-chocolate font-bold">
              From families who celebrate with us
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="bg-card rounded-3xl p-7 border border-border/60 shadow-[var(--shadow-soft)]"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-chocolate/85 leading-relaxed italic">"{r.text}"</p>
                <div className="mt-5 pt-5 border-t border-border/60">
                  <div className="font-semibold text-chocolate">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
        <div className="bg-chocolate text-cream rounded-[2.5rem] p-10 sm:p-16 grid lg:grid-cols-2 gap-12 items-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-72 w-72 bg-gold/20 rounded-full blur-3xl" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3">
              Visit Us
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight">
              Come for the cake.
              <br />
              Stay for the warmth.
            </h2>
            <p className="mt-5 text-cream/75 max-w-md">
              Drop in, call us, or book your celebration online. We'd love to hear from you.
            </p>
          </div>
          <div className="relative space-y-5">
            <div className="flex gap-4">
              <div className="h-11 w-11 rounded-full bg-gold/20 grid place-items-center shrink-0">
                <Phone className="h-5 w-5 text-gold" />
              </div>
              <div>
                <div className="text-xs text-cream/60 uppercase tracking-wider">
                  Call · WhatsApp
                </div>
                <a href="tel:6280781239" className="font-display text-xl">
                  +91 62807 81239
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-11 w-11 rounded-full bg-gold/20 grid place-items-center shrink-0">
                <MapPin className="h-5 w-5 text-gold" />
              </div>
              <div>
                <div className="text-xs text-cream/60 uppercase tracking-wider">Address</div>
                <div className="text-sm leading-relaxed">
                  Dinanagar - Narot Jaimal Singh Rd, Near Nomani Pull, Taragarh, Punjab 143534
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-11 w-11 rounded-full bg-gold/20 grid place-items-center shrink-0">
                <Clock className="h-5 w-5 text-gold" />
              </div>
              <div>
                <div className="text-xs text-cream/60 uppercase tracking-wider">Open Daily</div>
                <div className="font-display text-xl">8 AM – 9 PM</div>
              </div>
            </div>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-2 bg-gold text-chocolate px-7 py-3.5 rounded-full font-medium hover:scale-105 transition"
            >
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
