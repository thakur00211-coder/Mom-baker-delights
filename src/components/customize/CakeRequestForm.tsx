import { Cake, Loader2, Upload } from "lucide-react";
import type { FormEvent, ReactNode } from "react";

type CakeRequestFormValues = {
  name: string;
  phone: string;
  date: string;
  notes: string;
};

type CakeRequestFormProps = {
  form: CakeRequestFormValues;
  file: File | null;
  submitting: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onFormChange: (form: CakeRequestFormValues) => void;
  onFileChange: (file: File | null) => void;
};

export function CakeRequestForm({
  form,
  file,
  submitting,
  onSubmit,
  onFormChange,
  onFileChange,
}: CakeRequestFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="mb-2 flex items-center gap-3">
        <Cake className="h-6 w-6 text-gold" />
        <h2 className="font-display text-2xl font-bold text-chocolate">Cake Inquiry</h2>
      </div>

      <Field label="Your Name" required>
        <input
          required
          value={form.name}
          onChange={(event) => onFormChange({ ...form, name: event.target.value })}
          className="input"
          placeholder="Priya Sharma"
        />
      </Field>

      <Field label="Phone Number" required>
        <input
          required
          type="tel"
          value={form.phone}
          onChange={(event) => onFormChange({ ...form, phone: event.target.value })}
          className="input"
          placeholder="+91 …"
        />
      </Field>

      <Field label="Preferred Date" required>
        <input
          required
          type="date"
          value={form.date}
          onChange={(event) => onFormChange({ ...form, date: event.target.value })}
          className="input"
        />
      </Field>

      <Field label="Reference Image">
        <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-border bg-cream/80 px-4 py-3 transition hover:bg-peach/20">
          <Upload className="h-4 w-4 text-gold" />
          <span className="text-sm text-muted-foreground">
            {file?.name || "Upload inspiration image (optional)"}
          </span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
          />
        </label>
      </Field>

      <Field label="Notes & Flavor Preferences">
        <textarea
          rows={4}
          value={form.notes}
          onChange={(event) => onFormChange({ ...form, notes: event.target.value })}
          className="input resize-none"
          placeholder="Tell us about the occasion, theme, flavor, dietary needs…"
        />
      </Field>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-chocolate py-4 font-medium text-cream shadow-[var(--shadow-soft)] transition hover:bg-chocolate/90 disabled:opacity-60"
      >
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {submitting ? "Sending…" : "Send Cake Request"}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-chocolate">
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
      {children}
    </label>
  );
}
