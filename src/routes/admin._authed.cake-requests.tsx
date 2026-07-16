import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CakeRequestsHeader } from "@/components/admin/cake-requests/CakeRequestsHeader";
import { CakeRequestsList } from "@/components/admin/cake-requests/CakeRequestsList";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type CakeRequest = Database["public"]["Tables"]["cake_requests"]["Row"];
type Status = Database["public"]["Enums"]["cake_request_status"];

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

        <CakeRequestsList
          rows={rows}
          filtered={filtered}
          loading={loading}
          updatingId={updatingId}
          onUpdateStatus={updateStatus}
          onOpenImage={openImage}
        />
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
