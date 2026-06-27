import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Cake, CheckCircle2, Upload, Loader2 } from "lucide-react";
import customCake from "@/assets/custom-cake.jpg";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/customize")({
  head: () => ({
    meta: [
      { title: "Customize Your Cake — Mom Bakers" },
      { name: "description", content: "Design your perfect cake for birthdays, anniversaries and special moments." },
    ],
  }),
  component: CustomizePage,
});

function CustomizePage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", date: "", notes: "" });
  const [file, setFile] = useState<File | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      let reference_image_url: string | null = null;
      if (file) {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        const extMap: Record<string, string> = {
          "image/jpeg": "jpg",
          "image/jpg": "jpg",
          "image/png": "png",
          "image/webp": "webp",
        };
        if (!allowedTypes.includes(file.type)) {
          toast.error("Please upload a JPG, PNG, or WEBP image.");
          setSubmitting(false);
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error("Image must be 5 MB or smaller.");
          setSubmitting(false);
          return;
        }
        const ext = extMap[file.type];
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("cake-references")
          .upload(path, file, { contentType: file.type, upsert: false });
        if (upErr) throw upErr;
        reference_image_url = path;
      }
      const { error } = await supabase.from("cake_requests").insert({
        customer_name: form.name.trim(),
        phone_number: form.phone.trim(),
        preferred_date: form.date || null,
        notes: form.notes.trim() || null,
        reference_image_url,
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
          <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3">Custom Cake Studio</p>
          <h1 className="font-display text-4xl sm:text-5xl text-chocolate font-bold leading-tight">Tell us about your dream cake</h1>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Share your idea, occasion, and any inspiration image — our pastry team will reach out within a few hours to craft your perfect celebration cake.
          </p>
          <div className="mt-8 rounded-[2rem] overflow-hidden shadow-[var(--shadow-elegant)]">
            <img src={customCake} alt="Custom cake" loading="lazy" className="w-full" />
          </div>
        </div>

        <div className="bg-card rounded-[2rem] p-8 sm:p-10 border border-border/60 shadow-[var(--shadow-soft)]">
          {sent ? (
            <div className="text-center py-12">
              <CheckCircle2 className="h-16 w-16 text-gold mx-auto mb-4" />
              <h2 className="font-display text-2xl text-chocolate font-bold">Request received!</h2>
              <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                Thank you, {form.name}. Our team will call you on {form.phone} shortly to finalize the details.
              </p>
              <button onClick={() => { setSent(false); setForm({ name: "", phone: "", date: "", notes: "" }); setFile(null); }} className="mt-6 text-gold font-medium hover:underline">
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <Cake className="h-6 w-6 text-gold" />
                <h2 className="font-display text-2xl text-chocolate font-bold">Cake Inquiry</h2>
              </div>
              <Field label="Your Name" required><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" placeholder="Priya Sharma" /></Field>
              <Field label="Phone Number" required><input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" placeholder="+91 …" /></Field>
              <Field label="Preferred Date" required><input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input" /></Field>
              <Field label="Reference Image">
                <label className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-cream/80 border border-dashed border-border cursor-pointer hover:bg-peach/20 transition">
                  <Upload className="h-4 w-4 text-gold" />
                  <span className="text-sm text-muted-foreground">{file?.name || "Upload inspiration image (optional)"}</span>
                  <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                </label>
              </Field>
              <Field label="Notes & Flavor Preferences">
                <textarea rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input resize-none" placeholder="Tell us about the occasion, theme, flavor, dietary needs…" />
              </Field>
              <button type="submit" disabled={submitting} className="w-full bg-chocolate text-cream py-4 rounded-full font-medium hover:bg-chocolate/90 transition shadow-[var(--shadow-soft)] disabled:opacity-60 inline-flex items-center justify-center gap-2">
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? "Sending…" : "Send Cake Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-chocolate mb-1.5 block">
        {label}{required && <span className="text-gold"> *</span>}
      </span>
      {children}
    </label>
  );
}