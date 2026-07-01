import { CheckCircle2 } from "lucide-react";

type CakeRequestSuccessProps = {
  name: string;
  phone: string;
  onReset: () => void;
};

export function CakeRequestSuccess({ name, phone, onReset }: CakeRequestSuccessProps) {
  const displayPhone = phone;

  return (
    <div className="py-12 text-center">
      <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-gold" />

      <h2 className="font-display text-2xl font-bold text-chocolate">Request received!</h2>

      <p className="mx-auto mt-2 max-w-sm text-muted-foreground">
        Thank you, {name}. Our team will call you on {phone} shortly to finalize the details.
      </p>

      <button onClick={onReset} className="mt-6 font-medium text-gold hover:underline">
        Send another request
      </button>
    </div>
  );
}
