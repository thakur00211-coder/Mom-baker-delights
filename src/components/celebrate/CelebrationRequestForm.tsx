import type { FormEvent } from "react";
import { Loader2 } from "lucide-react";

export type CelebrationRequestFormValues = {
  name: string;
  phone: string;
  type: string;
  date: string;
  guests: string;
  notes: string;
};

type CelebrationRequestFormProps = {
  form: CelebrationRequestFormValues;
  submitting: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onFormChange: (form: CelebrationRequestFormValues) => void;
};

export function CelebrationRequestForm({
  form,
  submitting,
  onSubmit,
  onFormChange,
}: CelebrationRequestFormProps) {
  function updateForm<K extends keyof CelebrationRequestFormValues>(
    key: K,
    value: CelebrationRequestFormValues[K],
  ) {
    onFormChange({ ...form, [key]: value });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <h2 className="font-display text-2xl text-chocolate font-bold">Reservation Request</h2>

      <label className="block">
        <span className="text-sm font-medium text-chocolate mb-1.5 block">
          Your Name <span className="text-gold">*</span>
        </span>
        <input
          required
          value={form.name}
          onChange={(event) => updateForm("name", event.target.value)}
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
          onChange={(event) => updateForm("phone", event.target.value)}
          className="input"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-chocolate mb-1.5 block">
          Event Type <span className="text-gold">*</span>
        </span>
        <select
          value={form.type}
          onChange={(event) => updateForm("type", event.target.value)}
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
          onChange={(event) => updateForm("date", event.target.value)}
          className="input"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-chocolate mb-1.5 block">Guest Count</span>
        <input
          type="number"
          min={1}
          value={form.guests}
          onChange={(event) => updateForm("guests", event.target.value)}
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
          onChange={(event) => updateForm("notes", event.target.value)}
          className="input resize-none"
          placeholder="Theme, dietary needs, d�cor ideas..."
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-chocolate text-cream py-4 rounded-full font-medium hover:bg-chocolate/90 transition shadow-[var(--shadow-soft)] disabled:opacity-60 inline-flex items-center justify-center gap-2"
      >
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {submitting ? "Sending..." : "Send Request"}
      </button>
    </form>
  );
}
