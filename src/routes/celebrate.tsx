import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CelebrationIntroPanel } from "@/components/celebrate/CelebrationIntroPanel";
import {
  CelebrationRequestForm,
  type CelebrationRequestFormValues,
} from "@/components/celebrate/CelebrationRequestForm";
import { CelebrationRequestSuccess } from "@/components/celebrate/CelebrationRequestSuccess";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/celebrate")({
  head: () => ({
    meta: [
      { title: "Plan Your Celebration - Mom Bakers" },
      {
        name: "description",
        content: "Book birthdays, anniversaries and special events at Mom Bakers.",
      },
    ],
  }),
  component: CelebratePage,
});

const initialForm: CelebrationRequestFormValues = {
  name: "",
  phone: "",
  type: "Birthday",
  date: "",
  guests: "",
  notes: "",
};

function CelebratePage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<CelebrationRequestFormValues>(initialForm);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

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
            <CelebrationRequestForm
              form={form}
              submitting={submitting}
              onSubmit={submit}
              onFormChange={setForm}
            />
          )}
        </div>
      </div>
    </div>
  );
}
