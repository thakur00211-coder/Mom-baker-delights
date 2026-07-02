import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CustomizeIntroPanel } from "@/components/customize/CustomizeIntroPanel";
import { CakeRequestSuccess } from "@/components/customize/CakeRequestSuccess";
import { CakeRequestForm } from "@/components/customize/CakeRequestForm";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/customize")({
  head: () => ({
    meta: [
      { title: "Customize Your Cake — Mom Bakers" },
      {
        name: "description",
        content: "Design your perfect cake for birthdays, anniversaries and special moments.",
      },
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
        <CustomizeIntroPanel />
        <div className="bg-card rounded-[2rem] p-8 sm:p-10 border border-border/60 shadow-[var(--shadow-soft)]">
          {sent ? (
            <CakeRequestSuccess
              name={form.name}
              phone={form.phone}
              onReset={() => {
                setSent(false);
                setForm({ name: "", phone: "", date: "", notes: "" });
                setFile(null);
              }}
            />
          ) : (
            <CakeRequestForm
              form={form}
              file={file}
              submitting={submitting}
              onSubmit={submit}
              onFormChange={setForm}
              onFileChange={setFile}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-chocolate mb-1.5 block">
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
      {children}
    </label>
  );
}
