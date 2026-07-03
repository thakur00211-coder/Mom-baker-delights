import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Cake,
  PartyPopper,
  UtensilsCrossed,
  Images,
  TrendingUp,
  Clock,
  ChevronRight,
  Plus,
  Upload,
  Tag,
  ClipboardList,
  Loader2,
  Phone,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_authed/")({
  component: DashboardOverview,
});

type CakeRequest = Database["public"]["Tables"]["cake_requests"]["Row"];
type CelebrationRequest = Database["public"]["Tables"]["celebration_requests"]["Row"];

const quickActions = [
  { label: "Add Menu Item", icon: Plus },
  { label: "Upload Gallery Image", icon: Upload },
  { label: "Create Offer", icon: Tag },
  { label: "View Pending Requests", icon: ClipboardList },
] as const;

function DashboardOverview() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [cakeCount, setCakeCount] = useState(0);
  const [celebrationCount, setCelebrationCount] = useState(0);
  const [latestCakeRequests, setLatestCakeRequests] = useState<CakeRequest[]>([]);
  const [latestCelebrationRequests, setLatestCelebrationRequests] = useState<CelebrationRequest[]>(
    [],
  );

  async function loadDashboard() {
    setLoading(true);

    const [cakeCountResult, celebrationCountResult, cakeRowsResult, celebrationRowsResult] =
      await Promise.all([
        supabase.from("cake_requests").select("*", { count: "exact", head: true }),
        supabase.from("celebration_requests").select("*", { count: "exact", head: true }),
        supabase
          .from("cake_requests")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3),
        supabase
          .from("celebration_requests")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3),
      ]);

    if (
      cakeCountResult.error ||
      celebrationCountResult.error ||
      cakeRowsResult.error ||
      celebrationRowsResult.error
    ) {
      toast.error("Failed to load dashboard data");
      setLoading(false);
      return;
    }

    setCakeCount(cakeCountResult.count ?? 0);
    setCelebrationCount(celebrationCountResult.count ?? 0);
    setLatestCakeRequests(cakeRowsResult.data ?? []);
    setLatestCelebrationRequests(celebrationRowsResult.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setEmail(data.session?.user.email ?? null));
    loadDashboard();
  }, []);

  const stats = useMemo(
    () => [
      {
        label: "Total Cake Requests",
        value: loading ? "…" : cakeCount.toString(),
        trend: "New inquiries",
        icon: Cake,
        accent: "from-peach/40 to-peach/10",
      },
      {
        label: "Celebration Requests",
        value: loading ? "…" : celebrationCount.toString(),
        trend: "Event bookings",
        icon: PartyPopper,
        accent: "from-gold/40 to-gold/10",
      },
      {
        label: "Menu Items",
        value: "0",
        trend: "Live on website",
        icon: UtensilsCrossed,
        accent: "from-chocolate/20 to-chocolate/5",
      },
      {
        label: "Gallery Images",
        value: "0",
        trend: "Photos published",
        icon: Images,
        accent: "from-beige/50 to-beige/10",
      },
    ],
    [cakeCount, celebrationCount, loading],
  );

  return (
    <>
      <Card className="relative overflow-hidden rounded-3xl border-border/60 bg-gradient-to-br from-[var(--peach)]/30 via-background to-[var(--gold)]/15 p-6 shadow-[var(--shadow-soft)] md:p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--gold)]/20 blur-3xl" />
        <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--chocolate)]/70">
              Good morning
            </div>
            <h2 className="mt-1 font-display text-2xl font-bold text-[var(--chocolate)] md:text-3xl">
              Welcome back, {email?.split("@")[0] ?? "Admin"} ✨
            </h2>
            <p className="mt-2 max-w-xl text-sm text-[var(--chocolate)]/70">
              Here's a sweet snapshot of what's happening at Mom Bakers today.
            </p>
          </div>
          <div className="hidden h-20 w-20 shrink-0 place-items-center rounded-2xl bg-background/70 shadow-[var(--shadow-soft)] md:grid">
            <Cake className="h-9 w-9 text-[var(--chocolate)]" />
          </div>
        </div>
      </Card>

      <section>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, trend, icon: Icon, accent }) => (
            <Card
              key={label}
              className="rounded-2xl border-border/60 p-5 transition-shadow hover:shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-medium text-muted-foreground">{label}</div>
                  <div className="mt-2 font-display text-3xl font-bold text-[var(--chocolate)]">
                    {value}
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
                    <TrendingUp className="h-3 w-3" /> {trend}
                  </div>
                </div>
                <span
                  className={cn(
                    "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br",
                    accent,
                  )}
                >
                  <Icon className="h-5 w-5 text-[var(--chocolate)]" />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="overflow-hidden rounded-2xl border-border/60 lg:col-span-2">
          <div className="flex items-center justify-between gap-3 border-b border-border/60 px-6 pb-4 pt-6">
            <div>
              <h3 className="font-display text-lg font-semibold text-[var(--chocolate)]">
                Recent Activity
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Latest requests and admin actions
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-[var(--chocolate)]">
              View all <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="divide-y divide-border/60">
            <ActivitySection
              title="Latest Cake Requests"
              icon={Cake}
              loading={loading}
              empty="No cake requests yet"
            >
              {latestCakeRequests.map((request) => (
                <ActivityItem
                  key={request.id}
                  title={request.customer_name}
                  subtitle={request.notes || "Custom cake request"}
                  phone={request.phone_number}
                  createdAt={request.created_at}
                />
              ))}
            </ActivitySection>

            <ActivitySection
              title="Latest Celebration Requests"
              icon={PartyPopper}
              loading={loading}
              empty="No celebration bookings yet"
            >
              {latestCelebrationRequests.map((request) => (
                <ActivityItem
                  key={request.id}
                  title={request.customer_name}
                  subtitle={`${request.event_type}${
                    request.guest_count ? ` · ${request.guest_count} guests` : ""
                  }`}
                  phone={request.phone_number}
                  createdAt={request.created_at}
                />
              ))}
            </ActivitySection>

            <ActivitySection
              title="Recent Admin Actions"
              icon={Clock}
              loading={false}
              empty="No actions logged yet"
            />
          </div>
        </Card>

        <Card className="rounded-2xl border-border/60 p-6">
          <h3 className="font-display text-lg font-semibold text-[var(--chocolate)]">
            Quick Actions
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Jump straight into common tasks</p>
          <div className="mt-5 grid gap-2.5">
            {quickActions.map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="group flex w-full items-center gap-3 rounded-xl border border-border/60 bg-background px-4 py-3 text-left transition-all hover:border-[var(--gold)]/60 hover:bg-[var(--peach)]/15"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[var(--gold)]/30 to-[var(--peach)]/30">
                  <Icon className="h-4 w-4 text-[var(--chocolate)]" />
                </span>
                <span className="flex-1 truncate text-sm font-medium text-[var(--chocolate)]">
                  {label}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        </Card>
      </section>
    </>
  );
}

function ActivitySection({
  title,
  icon: Icon,
  loading,
  empty,
  children,
}: {
  title: string;
  icon: typeof Cake;
  loading: boolean;
  empty: string;
  children?: React.ReactNode;
}) {
  const hasItems = Boolean(children);

  return (
    <div className="px-6 py-5">
      <div className="mb-3 flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--peach)]/30">
          <Icon className="h-4 w-4 text-[var(--chocolate)]" />
        </span>
        <div className="text-sm font-semibold text-[var(--chocolate)]">{title}</div>
      </div>

      <div className="ml-11">
        {loading ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Loading...
          </div>
        ) : hasItems ? (
          <div className="space-y-3">{children}</div>
        ) : (
          <div className="text-xs italic text-muted-foreground">{empty}</div>
        )}
      </div>
    </div>
  );
}

function ActivityItem({
  title,
  subtitle,
  phone,
  createdAt,
}: {
  title: string;
  subtitle: string;
  phone: string;
  createdAt: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/70 px-3 py-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="font-medium text-[var(--chocolate)]">{title}</div>
        <span className="text-[11px] text-muted-foreground">
          {new Date(createdAt).toLocaleString()}
        </span>
      </div>
      <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">{subtitle}</div>
      <a
        href={`tel:${phone}`}
        className="mt-1 inline-flex items-center gap-1 text-xs text-[var(--chocolate)] hover:underline"
      >
        <Phone className="h-3 w-3 text-[var(--gold)]" />
        {phone}
      </a>
    </div>
  );
}
