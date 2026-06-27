import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Cake, Search, Phone, CalendarDays, Image as ImageIcon, Loader2, RefreshCw, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
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
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.customer_name.toLowerCase().includes(q) ||
        r.phone_number.toLowerCase().includes(q),
    );
  }, [rows, search]);

  const counts = useMemo(() => {
    const c: Record<Status | "Total", number> = {
      Total: rows.length,
      Pending: 0,
      Contacted: 0,
      Accepted: 0,
      Rejected: 0,
    };
    rows.forEach((r) => {
      c[r.status] += 1;
    });
    return c;
  }, [rows]);

  return (
    <>
      <Card className="p-6 md:p-7 rounded-3xl border-border/60 bg-gradient-to-br from-[var(--peach)]/20 via-background to-[var(--gold)]/10 shadow-[var(--shadow-soft)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <span className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--peach)] grid place-items-center shadow-[var(--shadow-soft)] shrink-0">
              <Cake className="h-5 w-5 text-[var(--chocolate)]" />
            </span>
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--chocolate)]/70">Custom Orders</div>
              <h2 className="font-display text-2xl font-bold text-[var(--chocolate)]">Cake Requests</h2>
              <p className="text-sm text-[var(--chocolate)]/70 mt-1">Review and respond to incoming custom cake inquiries.</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={cn("h-4 w-4 mr-1.5", loading && "animate-spin")} />
            Refresh
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
          {(["Total", "Pending", "Contacted", "Accepted", "Rejected"] as const).map((k) => (
            <div key={k} className="rounded-2xl bg-background/70 border border-border/60 px-4 py-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{k}</div>
              <div className="font-display text-2xl font-bold text-[var(--chocolate)] mt-1">{counts[k]}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="rounded-3xl border-border/60 overflow-hidden">
        <div className="px-5 md:px-6 py-4 border-b border-border/60 flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or phone…"
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
            {filtered.map((r) => (
              <li key={r.id} className="px-5 md:px-6 py-5">
                <div className="grid gap-4 md:grid-cols-[1fr_auto] items-start">
                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-lg font-semibold text-[var(--chocolate)] truncate">
                        {r.customer_name}
                      </h3>
                      <Badge variant="outline" className={cn("rounded-full text-[11px] font-medium", STATUS_STYLES[r.status])}>
                        {r.status}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        {new Date(r.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-[var(--chocolate)]/80">
                      <span className="inline-flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-[var(--gold)]" />
                        <a href={`tel:${r.phone_number}`} className="hover:underline">
                          {r.phone_number}
                        </a>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5 text-[var(--gold)]" />
                        {r.preferred_date
                          ? new Date(r.preferred_date).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "No date specified"}
                      </span>
                      {r.reference_image_url && (
                        <button
                          type="button"
                          onClick={() => openImage(r.reference_image_url!, r.customer_name)}
                          className="inline-flex items-center gap-1.5 text-[var(--chocolate)] hover:underline"
                        >
                          <ImageIcon className="h-3.5 w-3.5 text-[var(--gold)]" />
                          View reference
                        </button>
                      )}
                    </div>
                    {r.notes && (
                      <p className="text-sm text-[var(--chocolate)]/75 bg-[var(--peach)]/12 rounded-xl px-3 py-2 mt-2 whitespace-pre-wrap">
                        {r.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {(["Contacted", "Accepted", "Rejected"] as Status[]).map((s) => (
                      <Button
                        key={s}
                        size="sm"
                        variant={r.status === s ? "default" : "outline"}
                        disabled={updatingId === r.id || r.status === s}
                        onClick={() => updateStatus(r.id, s)}
                        className={cn(
                          "rounded-full",
                          r.status === s && s === "Contacted" && "bg-blue-600 hover:bg-blue-600/90 text-white",
                          r.status === s && s === "Accepted" && "bg-emerald-600 hover:bg-emerald-600/90 text-white",
                          r.status === s && s === "Rejected" && "bg-rose-600 hover:bg-rose-600/90 text-white",
                        )}
                      >
                        {updatingId === r.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : `Mark ${s}`}
                      </Button>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-[var(--chocolate)]">
              Reference · {preview?.name}
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