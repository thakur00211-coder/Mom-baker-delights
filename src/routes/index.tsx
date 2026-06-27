import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Cake,
  Coffee,
  Heart,
  Sparkles,
  Star,
  Users,
  Utensils,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import customCake from "@/assets/custom-cake.jpg";
import celebration from "@/assets/celebration.jpg";
import interior from "@/assets/interior.jpg";
import pastries from "@/assets/pastries.jpg";
import cafe from "@/assets/cafe.jpg";
import { menuItems } from "@/lib/menu-data";

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

const whys = [
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
  const featured = menuItems.filter((m) => m.featured).slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={hero}
            alt=""
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-chocolate/30 via-chocolate/50 to-chocolate/85" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-28 sm:py-40 lg:py-52 text-center">
          <span className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full text-xs font-medium text-chocolate mb-6 animate-fade-up">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            Celebration Café & Custom Cake Studio
          </span>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-cream leading-[1.05] max-w-4xl mx-auto animate-fade-up">
            Where Every Celebration Begins
            <span className="block gold-text italic">With Something Sweet</span>
          </h1>
          <p className="mt-6 text-cream/85 text-base sm:text-lg max-w-2xl mx-auto animate-fade-up">
            Custom cakes, cozy moments & memorable celebrations — handcrafted with love in the heart
            of Taragarh.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up">
            <Link
              to="/customize"
              className="inline-flex items-center gap-2 bg-gold text-chocolate px-7 py-3.5 rounded-full font-medium shadow-[var(--shadow-glow)] hover:scale-105 transition"
            >
              Customize Your Cake <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/celebrate"
              className="inline-flex items-center gap-2 glass-card !bg-cream/15 text-cream border-cream/30 px-7 py-3.5 rounded-full font-medium hover:bg-cream/25 transition"
            >
              Plan Your Celebration
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-cream/90 px-5 py-3.5 rounded-full font-medium hover:text-gold transition"
            >
              Explore Menu →
            </Link>
          </div>
        </div>
      </section>

      {/* WHY MOM BAKERS */}
      <section className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3">
            Why Mom Bakers
          </p>
          <h2 className="font-display text-3xl sm:text-5xl text-chocolate font-bold">
            More than a café — a celebration destination
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {whys.map((w) => (
            <div
              key={w.title}
              className="bg-card rounded-3xl p-6 border border-border/60 hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-peach to-gold/70 grid place-items-center mb-4">
                <w.icon className="h-6 w-6 text-chocolate" />
              </div>
              <h3 className="font-display text-lg font-semibold text-chocolate mb-1.5">
                {w.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED MENU */}
      <section className="bg-gradient-to-b from-cream to-peach/20 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3">
                Featured Menu
              </p>
              <h2 className="font-display text-3xl sm:text-5xl text-chocolate font-bold max-w-xl">
                Tastes our guests come back for
              </h2>
            </div>
            <Link
              to="/menu"
              className="text-chocolate font-medium hover:text-gold inline-flex items-center gap-1"
            >
              View Full Menu <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((item) => (
              <div
                key={item.id}
                className="group bg-card rounded-3xl overflow-hidden border border-border/60 hover:shadow-[var(--shadow-elegant)] transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={
                      item.category === "Cakes"
                        ? customCake
                        : item.category.includes("Beverage")
                          ? cafe
                          : pastries
                    }
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">
                      {item.category}
                    </span>
                    {item.tag && (
                      <span className="text-[10px] bg-peach/40 text-chocolate px-2 py-0.5 rounded-full font-medium">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-chocolate leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="mt-3 font-medium text-chocolate">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMIZE YOUR CAKE */}
      <section className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-gold/30 to-peach/30 rounded-[2.5rem] blur-2xl" />
            <img
              src={customCake}
              alt="Custom celebration cake"
              loading="lazy"
              className="relative rounded-[2rem] shadow-[var(--shadow-elegant)] w-full"
            />
            <div className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-4 hidden sm:flex items-center gap-3">
              <Heart className="h-5 w-5 text-gold fill-gold" />
              <div className="text-xs">
                <div className="font-semibold text-chocolate">2,500+ cakes</div>
                <div className="text-muted-foreground">crafted with love</div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3">
              Customize Your Cake
            </p>
            <h2 className="font-display text-3xl sm:text-5xl text-chocolate font-bold leading-tight">
              Design the cake of your dreams
            </h2>
            <p className="mt-5 text-muted-foreground text-base sm:text-lg leading-relaxed">
              Share your vision and we'll craft a one-of-a-kind cake for birthdays, anniversaries,
              and life's sweetest moments — from elegant single tiers to grand celebration
              centerpieces.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-chocolate/80">
              <li className="flex gap-2">
                <Sparkles className="h-4 w-4 text-gold mt-0.5" /> Hand-painted designs & edible gold
                leaf
              </li>
              <li className="flex gap-2">
                <Sparkles className="h-4 w-4 text-gold mt-0.5" /> Premium flavor combinations,
                dietary options available
              </li>
              <li className="flex gap-2">
                <Sparkles className="h-4 w-4 text-gold mt-0.5" /> Personal consultation with our
                pastry team
              </li>
            </ul>
            <Link
              to="/customize"
              className="mt-8 inline-flex items-center gap-2 bg-chocolate text-cream px-7 py-3.5 rounded-full font-medium hover:bg-chocolate/90 transition shadow-[var(--shadow-soft)]"
            >
              Customize Your Cake <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CELEBRATIONS */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={celebration} alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-chocolate/95 via-chocolate/85 to-chocolate/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3">
              Celebrations
            </p>
            <h2 className="font-display text-3xl sm:text-5xl text-cream font-bold leading-tight">
              Your moments, our craft
            </h2>
            <p className="mt-5 text-cream/80 text-base sm:text-lg leading-relaxed">
              From intimate gatherings to grand celebrations, we host them all with warmth,
              elegance, and effortless care.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {events.map((e) => (
              <div
                key={e.title}
                className="glass-card !bg-cream/10 !border-cream/20 rounded-2xl p-6 text-cream hover:!bg-cream/20 transition"
              >
                <div className="text-3xl mb-3">{e.icon}</div>
                <h3 className="font-display text-lg font-semibold">{e.title}</h3>
                <p className="text-sm text-cream/70 mt-1">{e.desc}</p>
              </div>
            ))}
          </div>
          <Link
            to="/celebrate"
            className="mt-10 inline-flex items-center gap-2 bg-gold text-chocolate px-7 py-3.5 rounded-full font-medium hover:scale-105 transition shadow-[var(--shadow-glow)]"
          >
            Plan Your Celebration <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

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
