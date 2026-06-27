import { createFileRoute } from "@tanstack/react-router";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mom Bakers" },
      { name: "description", content: "Visit Mom Bakers in Taragarh, Punjab. Call or WhatsApp +91 62807 81239." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const addr = "Dinanagar - Narot Jaimal Singh Rd, Near Nomani Pull, Taragarh, Punjab 143534";
  const mapsSrc = `https://www.google.com/maps?q=${encodeURIComponent(addr)}&output=embed`;

  return (
    <div>
      <section className="bg-gradient-to-b from-peach/30 to-cream pt-16 pb-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3">Get in Touch</p>
        <h1 className="font-display text-4xl sm:text-6xl text-chocolate font-bold">We'd love to hear from you</h1>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10">
        <div className="space-y-5">
          <Info icon={Phone} title="Phone" value="+91 62807 81239" href="tel:6280781239" />
          <Info icon={MessageCircle} title="WhatsApp" value="Chat with us instantly" href="https://wa.me/916280781239" />
          <Info icon={MapPin} title="Address" value={addr} />
          <Info icon={Clock} title="Opening Hours" value="Open Daily · 8 AM – 9 PM" />

          <a href="https://wa.me/916280781239" className="mt-4 inline-flex items-center gap-2 bg-[#25D366] text-white px-7 py-3.5 rounded-full font-medium hover:opacity-90 transition shadow-[var(--shadow-soft)]">
            <MessageCircle className="h-5 w-5" /> Message us on WhatsApp
          </a>
        </div>
        <div className="rounded-[2rem] overflow-hidden shadow-[var(--shadow-elegant)] border border-border/60 min-h-[400px]">
          <iframe
            title="Mom Bakers location"
            src={mapsSrc}
            className="w-full h-full min-h-[400px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  );
}

function Info({ icon: Icon, title, value, href }: { icon: typeof Phone; title: string; value: string; href?: string }) {
  const inner = (
    <div className="flex gap-4 items-start bg-card border border-border/60 rounded-2xl p-5 hover:shadow-[var(--shadow-soft)] transition">
      <div className="h-11 w-11 rounded-full bg-gradient-to-br from-peach to-gold/70 grid place-items-center shrink-0">
        <Icon className="h-5 w-5 text-chocolate" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-gold font-semibold">{title}</div>
        <div className="text-chocolate mt-0.5">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}