import { cn } from "@/lib/utils";
import type { Database } from "@/integrations/supabase/types";

type Status = Database["public"]["Enums"]["celebration_request_status"];
type StatusFilter = "All" | Status;

type CelebrationRequestStatsProps = {
  counts: Record<Status | "Total", number>;
  statusFilter: StatusFilter;
  onStatusFilterChange: (statusFilter: StatusFilter) => void;
};

const STAT_LABELS = ["Total", "Pending", "Contacted", "Accepted", "Rejected"] as const;

export function CelebrationRequestStats({
  counts,
  statusFilter,
  onStatusFilterChange,
}: CelebrationRequestStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
      {STAT_LABELS.map((k) => (
        <button
          key={k}
          type="button"
          onClick={() => onStatusFilterChange(k === "Total" ? "All" : (k as Status))}
          className={cn(
            "rounded-2xl bg-background/70 border border-border/60 px-4 py-3 text-left transition hover:border-[var(--gold)]/60",
            ((k === "Total" && statusFilter === "All") || statusFilter === k) &&
              "border-[var(--gold)] bg-[var(--gold)]/10",
          )}
        >
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{k}</div>
          <div className="font-display text-2xl font-bold text-[var(--chocolate)] mt-1">
            {counts[k]}
          </div>
        </button>
      ))}
    </div>
  );
}
