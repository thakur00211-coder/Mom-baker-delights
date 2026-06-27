import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function PlaceholderPage({ title, description, icon: Icon }: Props) {
  return (
    <Card className="p-8 md:p-12 rounded-3xl border-border/60 bg-gradient-to-br from-[var(--peach)]/15 via-background to-[var(--gold)]/10 shadow-[var(--shadow-soft)]">
      <div className="flex flex-col items-center text-center max-w-xl mx-auto">
        <span className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--peach)] grid place-items-center shadow-[var(--shadow-soft)] mb-5">
          <Icon className="h-7 w-7 text-[var(--chocolate)]" />
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--chocolate)]">
          {title}
        </h2>
        <p className="text-sm text-[var(--chocolate)]/70 mt-3">{description}</p>
        <div className="mt-6 px-4 py-2 rounded-full bg-[var(--chocolate)]/5 text-[11px] uppercase tracking-[0.18em] text-[var(--chocolate)]/70">
          Coming soon
        </div>
      </div>
    </Card>
  );
}
