import { CheckCircle2 } from "lucide-react";

type CelebrationRequestSuccessProps = {
  name: string;
  phone: string;
  eventType: string;
};

export function CelebrationRequestSuccess({
  name,
  phone,
  eventType,
}: CelebrationRequestSuccessProps) {
  return (
    <div className="py-12 text-center">
      <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-gold" />

      <h2 className="font-display text-2xl font-bold text-chocolate">Request received!</h2>

      <p className="mx-auto mt-2 max-w-sm text-muted-foreground">
        Thank you, {name}. We'll call you on {phone} to plan your {eventType.toLowerCase()}.
      </p>
    </div>
  );
}
