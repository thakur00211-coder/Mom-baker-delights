import { PartyPopper, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Database } from "@/integrations/supabase/types";
import { CelebrationRequestStats } from "./CelebrationRequestStats";

type Status = Database["public"]["Enums"]["celebration_request_status"];
type StatusFilter = "All" | Status;

type CelebrationRequestsHeaderProps = {
  counts: Record<Status | "Total", number>;
  loading: boolean;
  statusFilter: StatusFilter;
  onRefresh: () => void;
  onStatusFilterChange: (statusFilter: StatusFilter) => void;
};

export function CelebrationRequestsHeader({
  counts,
  loading,
  statusFilter,
  onRefresh,
  onStatusFilterChange,
}: CelebrationRequestsHeaderProps) {
  return (
    <Card className="p-6 md:p-7 rounded-3xl border-border/60 bg-gradient-to-br from-[var(--peach)]/20 via-background to-[var(--gold)]/10 shadow-[var(--shadow-soft)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <span className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--peach)] grid place-items-center shadow-[var(--shadow-soft)] shrink-0">
            <PartyPopper className="h-5 w-5 text-[var(--chocolate)]" />
          </span>
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--chocolate)]/70">
              Event Bookings
            </div>
            <h2 className="font-display text-2xl font-bold text-[var(--chocolate)]">
              Celebration Requests
            </h2>
            <p className="text-sm text-[var(--chocolate)]/70 mt-1">
              Plan birthdays, anniversaries, and special events.
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading}>
          <RefreshCw className={cn("h-4 w-4 mr-1.5", loading && "animate-spin")} />
          Refresh
        </Button>
      </div>
      <CelebrationRequestStats
        counts={counts}
        statusFilter={statusFilter}
        onStatusFilterChange={onStatusFilterChange}
      />
    </Card>
  );
}
