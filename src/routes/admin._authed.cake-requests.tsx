import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Cake,
  Search,
  Phone,
  CalendarDays,
  Image as ImageIcon,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CakeRequestsHeader } from "@/components/admin/cake-requests/CakeRequestsHeader";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Database } from "@/integrations/supabase/types";

type CakeRequest = Database["public"]["Tables"]["cake_requests"]["Row"];
type Status = Database["public"]["Enums"]["cake_request_status"];

const STATUS_STYLES: Record<Status, string> = {
  Pending: "bg-[var(--gold)]/25 text-[var(--chocolate)] border-[var(--gold)]/40",
  Contacted: "bg-blue-100 text-blue-800 border-blue-200",
  Accepted: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Rejected: "bg-rose-100 text-rose-800 border-rose-200",
};

export const Route = createFileRoute("/admin/_authed/cake-requests")({
  component: CakeRequestsPage,
});

function CakeRequestsPage() {
  const [rows, setRows] = useState<CakeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ url: string; name: string } | null>(null);

  async function load() {
    setLoading(true);

    const { data, error } = await supabase
      .from("cake_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load cake requests");
    } else {
      setRows(data ?? []);
    }

    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: Status) {
    setUpdatingId(id);

    const { error } = await supabase.from("cake_requests").update({ status }).eq("id", id);

    setUpdatingId(null);

    if (error) {
      toast.error("Could not update status");
      return;
    }

    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, status } : row)));
    toast.success(`Marked as ${status}`);
  }

  async function openImage(path: string, name: string) {
    const { data, error } = await supabase.storage
      .from("cake-references")
      .createSignedUrl(path, 3600);

    if (error || !data?.signedUrl) {
      toast.error("Could not load image");
      return;
    }

    setPreview({ url: data.signedUrl, name });
  }

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return rows;

    return rows.filter(
      (row) =>
        row.customer_name.toLowerCase().includes(query) ||
        row.phone_number.toLowerCase().includes(query),
    );
  }, [rows, search]);

  const counts = useMemo(() => {
    const currentCounts: Record<Status | "Total", number> = {
      Total: rows.length,
      Pending: 0,
      Contacted: 0,
      Accepted: 0,
      Rejected: 0,
    };

    rows.forEach((row) => {
      currentCounts[row.status] += 1;
    });

    return currentCounts;
  }, [rows]);

  return (
    <>
      <CakeRequestsHeader counts={counts} loading={loading} onRefresh={load} />

      <Card className="rounded-3xl border-border/60 overflow-hidden">
        <div className="px-5 md:px-6 py-4 border-b border-border/60 flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or phone..."
              className="pl-9 rounded-xl"
            />
          </div>

          <div className="text-xs text-muted-foreground">
            Showing {filtered.length} of {rows.length}
          </div>
        </div>

        {loading ? (
          <div className="py-20 grid place-items-center text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin text-[var(--chocolate)]" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Cake className="h-10 w-10 mx-auto text-[var(--chocolate)]/40" />
            <p className="mt-3 text-sm text-muted-foreground">
              {rows.length === 0 ? "No cake requests yet." : "No requests match your search."}
            </p>
          </div>
        ) : (
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
                          onClick={() =>
                            openImage(request.reference_image_url!, request.customer_name)
                          }
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
                    {(["Contacted", "Accepted", "Rejected"] as Status[]).map((status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant={request.status === status ? "default" : "outline"}
                        disabled={updatingId === request.id || request.status === status}
                        onClick={() => updateStatus(request.id, status)}
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
        )}
      </Card>

      <Dialog open={!!preview} onOpenChange={(open) => !open && setPreview(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-[var(--chocolate)]">
              Reference - {preview?.name}
            </DialogTitle>
          </DialogHeader>

          {preview && (
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden border border-border/60 bg-cream">
                <img src={preview.url} alt="Cake reference" className="w-full h-auto" />
              </div>

              <a
                href={preview.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-[var(--chocolate)] hover:underline"
              >
                Open in new tab <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
