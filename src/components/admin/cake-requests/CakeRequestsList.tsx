import { Cake, Phone, CalendarDays, Image as ImageIcon, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Database } from "@/integrations/supabase/types";

type CakeRequest = Database["public"]["Tables"]["cake_requests"]["Row"];
type Status = Database["public"]["Enums"]["cake_request_status"];

type CakeRequestsListProps = {
  rows: CakeRequest[];
  filtered: CakeRequest[];
  loading: boolean;
  updatingId: string | null;
  onUpdateStatus: (id: string, status: Status) => void;
  onOpenImage: (path: string, name: string) => void;
};

const STATUS_STYLES: Record<Status, string> = {
  Pending: "bg-[var(--gold)]/25 text-[var(--chocolate)] border-[var(--gold)]/40",
  Contacted: "bg-blue-100 text-blue-800 border-blue-200",
  Accepted: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Rejected: "bg-rose-100 text-rose-800 border-rose-200",
};

const ACTION_STATUSES = ["Contacted", "Accepted", "Rejected"] as Status[];

export function CakeRequestsList({
  rows,
  filtered,
  loading,
  updatingId,
  onUpdateStatus,
  onOpenImage,
}: CakeRequestsListProps) {
  if (loading) {
    return (
      <div className="py-20 grid place-items-center text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin text-[var(--chocolate)]" />
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="py-20 text-center">
        <Cake className="h-10 w-10 mx-auto text-[var(--chocolate)]/40" />
        <p className="mt-3 text-sm text-muted-foreground">
          {rows.length === 0 ? "No cake requests yet." : "No requests match your search."}
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-border/60">
      {filtered.map((request) => (
        <li key={request.id} className="px-5 md:px-6 py-5">
          <div className="grid gap-4 md:grid-cols-[1fr_auto] items-start">
            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-lg font-semibold text-[var(--chocolate)] truncate">
                  {request.customer_name}
                </h3>

                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full text-[11px] font-medium",
                    STATUS_STYLES[request.status],
                  )}
                >
                  {request.status}
                </Badge>

                <span className="text-[11px] text-muted-foreground">
                  {new Date(request.created_at).toLocaleString()}
                </span>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-[var(--chocolate)]/80">
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-[var(--gold)]" />
                  <a href={`tel:${request.phone_number}`} className="hover:underline">
                    {request.phone_number}
                  </a>
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-[var(--gold)]" />
                  {request.preferred_date
                    ? new Date(request.preferred_date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "No date specified"}
                </span>

                {request.reference_image_url && (
                  <button
                    type="button"
                    onClick={() => onOpenImage(request.reference_image_url!, request.customer_name)}
                    className="inline-flex items-center gap-1.5 text-[var(--chocolate)] hover:underline"
                  >
                    <ImageIcon className="h-3.5 w-3.5 text-[var(--gold)]" />
                    View reference
                  </button>
                )}
              </div>

              {request.notes && (
                <p className="text-sm text-[var(--chocolate)]/75 bg-[var(--peach)]/12 rounded-xl px-3 py-2 mt-2 whitespace-pre-wrap">
                  {request.notes}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2 md:justify-end">
              {ACTION_STATUSES.map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant={request.status === status ? "default" : "outline"}
                  disabled={updatingId === request.id || request.status === status}
                  onClick={() => onUpdateStatus(request.id, status)}
                  className={cn(
                    "rounded-full",
                    request.status === status &&
                      status === "Contacted" &&
                      "bg-blue-600 hover:bg-blue-600/90 text-white",
                    request.status === status &&
                      status === "Accepted" &&
                      "bg-emerald-600 hover:bg-emerald-600/90 text-white",
                    request.status === status &&
                      status === "Rejected" &&
                      "bg-rose-600 hover:bg-rose-600/90 text-white",
                  )}
                >
                  {updatingId === request.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    `Mark ${status}`
                  )}
                </Button>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
