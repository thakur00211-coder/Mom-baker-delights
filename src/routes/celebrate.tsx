import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { CelebrationIntroPanel } from "@/components/celebrate/CelebrationIntroPanel";
import { CelebrationRequestSuccess } from "@/components/celebrate/CelebrationRequestSuccess";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/celebrate")({
  head: () => ({
    meta: [
      { title: "Plan Your Celebration — Mom Bakers" },
      {
        name: "description",
        content: "Book birthdays, anniversaries and special events at Mom Bakers.",
      },
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
        <CelebrationIntroPanel />

        <div className="bg-card rounded-[2rem] p-8 sm:p-10 border border-border/60 shadow-[var(--shadow-soft)]">
          {sent ? (
            <CelebrationRequestSuccess name={form.name} phone={form.phone} eventType={form.type} />
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <h2 className="font-display text-2xl text-chocolate font-bold">
                Reservation Request
              </h2>
              <label className="block">
                <span className="text-sm font-medium text-chocolate mb-1.5 block">
                  Your Name <span className="text-gold">*</span>
                </span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-chocolate mb-1.5 block">
                  Phone Number <span className="text-gold">*</span>
                </span>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-chocolate mb-1.5 block">
                  Event Type <span className="text-gold">*</span>
                </span>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="input"
                >
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Other Event</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-chocolate mb-1.5 block">
                  Preferred Date <span className="text-gold">*</span>
                </span>
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="input"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-chocolate mb-1.5 block">Guest Count</span>
                <input
                  type="number"
                  min={1}
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="input"
                  placeholder="e.g. 25"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-chocolate mb-1.5 block">
                  Special Requirements
                </span>
                <textarea
                  rows={4}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="input resize-none"
                  placeholder="Theme, dietary needs, décor ideas…"
                />
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-chocolate text-cream py-4 rounded-full font-medium hover:bg-chocolate/90 transition shadow-[var(--shadow-soft)] disabled:opacity-60 inline-flex items-center justify-center gap-2"
              >
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
