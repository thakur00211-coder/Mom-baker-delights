import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/_authed/")({
  component: DashboardOverview,
});

const stats = [
  { label: "Total Cake Requests", value: "0", trend: "New inquiries", icon: Cake, accent: "from-peach/40 to-peach/10" },
  { label: "Celebration Requests", value: "0", trend: "Event bookings", icon: PartyPopper, accent: "from-gold/40 to-gold/10" },
  { label: "Menu Items", value: "0", trend: "Live on website", icon: UtensilsCrossed, accent: "from-chocolate/20 to-chocolate/5" },
  { label: "Gallery Images", value: "0", trend: "Photos published", icon: Images, accent: "from-beige/50 to-beige/10" },
] as const;

const quickActions = [
  { label: "Add Menu Item", icon: Plus },
  { label: "Upload Gallery Image", icon: Upload },
  { label: "Create Offer", icon: Tag },
  { label: "View Pending Requests", icon: ClipboardList },
] as const;

function DashboardOverview() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setEmail(data.session?.user.email ?? null));
  }, []);

  return (
    <>
      {/* Welcome strip */}
      <Card className="p-6 md:p-8 border-border/60 rounded-3xl overflow-hidden relative bg-gradient-to-br from-[var(--peach)]/30 via-background to-[var(--gold)]/15 shadow-[var(--shadow-soft)]">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--gold)]/20 blur-3xl" />
        <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--chocolate)]/70">Good morning</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--chocolate)] mt-1">
              Welcome back, {email?.split("@")[0] ?? "Admin"} ✨
            </h2>
            <p className="text-sm text-[var(--chocolate)]/70 mt-2 max-w-xl">
              Here's a sweet snapshot of what's happening at Mom Bakers today.
            </p>
          </div>
          <div className="hidden md:grid h-20 w-20 rounded-2xl bg-background/70 place-items-center shadow-[var(--shadow-soft)] shrink-0">
            <Cake className="h-9 w-9 text-[var(--chocolate)]" />
          </div>
        </div>
      </Card>

      <section>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, trend, icon: Icon, accent }) => (
            <Card key={label} className="p-5 rounded-2xl border-border/60 hover:shadow-[var(--shadow-soft)] transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-medium text-muted-foreground">{label}</div>
                  <div className="font-display text-3xl font-bold text-[var(--chocolate)] mt-2">{value}</div>
                  <div className="flex items-center gap-1 mt-2 text-[11px] text-muted-foreground">
                    <TrendingUp className="h-3 w-3" /> {trend}
                  </div>
                </div>
                <span className={cn("h-11 w-11 rounded-xl grid place-items-center bg-gradient-to-br shrink-0", accent)}>
                  <Icon className="h-5 w-5 text-[var(--chocolate)]" />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 rounded-2xl border-border/60 overflow-hidden">
          <div className="px-6 pt-6 pb-4 flex items-center justify-between gap-3 border-b border-border/60">
            <div>
              <h3 className="font-display text-lg font-semibold text-[var(--chocolate)]">Recent Activity</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Latest requests and admin actions</p>
            </div>
            <Button variant="ghost" size="sm" className="text-[var(--chocolate)]">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="divide-y divide-border/60">
            {[
              { title: "Latest Cake Requests", icon: Cake, empty: "No cake requests yet" },
              { title: "Latest Celebration Requests", icon: PartyPopper, empty: "No celebration bookings yet" },
              { title: "Recent Admin Actions", icon: Clock, empty: "No actions logged yet" },
            ].map(({ title, icon: Icon, empty }) => (
              <div key={title} className="px-6 py-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-8 w-8 rounded-lg bg-[var(--peach)]/30 grid place-items-center">
                    <Icon className="h-4 w-4 text-[var(--chocolate)]" />
                  </span>
                  <div className="text-sm font-semibold text-[var(--chocolate)]">{title}</div>
                </div>
                <div className="ml-11 text-xs text-muted-foreground italic">{empty}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-2xl border-border/60 p-6">
          <h3 className="font-display text-lg font-semibold text-[var(--chocolate)]">Quick Actions</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Jump straight into common tasks</p>
          <div className="grid gap-2.5 mt-5">
            {quickActions.map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="group flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-border/60 bg-background hover:border-[var(--gold)]/60 hover:bg-[var(--peach)]/15 transition-all text-left"
              >
                <span className="h-9 w-9 rounded-lg bg-gradient-to-br from-[var(--gold)]/30 to-[var(--peach)]/30 grid place-items-center shrink-0">
                  <Icon className="h-4 w-4 text-[var(--chocolate)]" />
                </span>
                <span className="text-sm font-medium text-[var(--chocolate)] flex-1 truncate">{label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </Card>
      </section>
    </>
  );
}