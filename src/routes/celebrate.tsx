import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import celebration from "@/assets/celebration.jpg";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/celebrate")({
  head: () => ({
    meta: [
      { title: "Plan Your Celebration — Mom Bakers" },
      { name: "description", content: "Book birthdays, anniversaries and special events at Mom Bakers." },
    ],
  }),
  component: CelebratePage,
});

function CelebratePage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: "Birthday",
    date: "",
    guests: "",
    notes: "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const guestCount = form.guests ? parseInt(form.guests, 10) : null;
      const { error } = await supabase.from("celebration_requests").insert({
        customer_name: form.name.trim(),
        phone_number: form.phone.trim(),
        event_type: form.type,
        event_date: form.date || null,
        guest_count: Number.isFinite(guestCount) ? guestCount : null,
        special_requirements: form.notes.trim() || null,
      });
      if (error) throw error;
      setSent(true);
    } catch (err) {
      console.error(err);
      toast.error("Could not send your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3">Plan Your Celebration</p>
          <h1 className="font-display text-4xl sm:text-5xl text-chocolate font-bold leading-tight">Let's make it unforgettable</h1>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            From intimate birthday parties to anniversary surprises, our team takes care of every detail — décor, cake, and a warm welcome for your guests.
          </p>
          <div className="mt-8 rounded-[2rem] overflow-hidden shadow-[var(--shadow-elegant)]">
            <img src={celebration} alt="Celebration setup" loading="lazy" className="w-full" />
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm">
            {["Custom cake included", "Themed décor setup", "Photography corner", "Dedicated host"].map((p) => (
              <li key={p} className="flex gap-2 text-chocolate/85"><Sparkles className="h-4 w-4 text-gold mt-0.5" />{p}</li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-[2rem] p-8 sm:p-10 border border-border/60 shadow-[var(--shadow-soft)]">
          {sent ? (
            <div className="text-center py-12">
              <CheckCircle2 className="h-16 w-16 text-gold mx-auto mb-4" />
              <h2 className="font-display text-2xl text-chocolate font-bold">Request received!</h2>
              <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                Thank you, {form.name}. We'll call you on {form.phone} to plan your {form.type.toLowerCase()}.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <h2 className="font-display text-2xl text-chocolate font-bold">Reservation Request</h2>
              <label className="block">
                <span className="text-sm font-medium text-chocolate mb-1.5 block">Your Name <span className="text-gold">*</span></span>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-chocolate mb-1.5 block">Phone Number <span className="text-gold">*</span></span>
                <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-chocolate mb-1.5 block">Event Type <span className="text-gold">*</span></span>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input">
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Other Event</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-chocolate mb-1.5 block">Preferred Date <span className="text-gold">*</span></span>
                <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-chocolate mb-1.5 block">Guest Count</span>
                <input type="number" min={1} value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className="input" placeholder="e.g. 25" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-chocolate mb-1.5 block">Special Requirements</span>
                <textarea rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input resize-none" placeholder="Theme, dietary needs, décor ideas…" />
              </label>
              <button type="submit" disabled={submitting} className="w-full bg-chocolate text-cream py-4 rounded-full font-medium hover:bg-chocolate/90 transition shadow-[var(--shadow-soft)] disabled:opacity-60 inline-flex items-center justify-center gap-2">
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? "Sending…" : "Send Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}