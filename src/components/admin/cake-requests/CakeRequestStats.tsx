import type { Database } from "@/integrations/supabase/types";

type Status = Database["public"]["Enums"]["cake_request_status"];

type CakeRequestStatsProps = {
  counts: Record<Status | "Total", number>;
};

const STAT_LABELS = ["Total", "Pending", "Contacted", "Accepted", "Rejected"] as const;

export function CakeRequestStats({ counts }: CakeRequestStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
      {STAT_LABELS.map((label) => (
        <div key={label} className="rounded-2xl bg-background/70 border border-border/60 px-4 py-3">
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {label}
          </div>
          <div className="font-display text-2xl font-bold text-[var(--chocolate)] mt-1">
            {counts[label]}
          </div>
        </div>
      ))}
    </div>
  );
}
