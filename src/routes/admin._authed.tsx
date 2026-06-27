import { createFileRoute, Outlet, useNavigate, Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Cake,
  PartyPopper,
  Images,
  Megaphone,
  Building2,
  Settings as SettingsIcon,
  LogOut,
  Loader2,
  Plus,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/admin/_authed")({
  ssr: false,
  component: AdminLayout,
});

type NavItem = {
  to:
    | "/admin"
    | "/admin/cake-requests"
    | "/admin/celebration-requests"
    | "/admin/menu"
    | "/admin/gallery"
    | "/admin/offers"
    | "/admin/business-info"
    | "/admin/settings";
  label: string;
  icon: typeof LayoutDashboard;
  badge?: number;
  exact?: boolean;
};

const navItems: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/cake-requests", label: "Cake Requests", icon: Cake, badge: 0 },
  { to: "/admin/celebration-requests", label: "Celebration Requests", icon: PartyPopper, badge: 0 },
  { to: "/admin/menu", label: "Menu Management", icon: UtensilsCrossed },
  { to: "/admin/gallery", label: "Gallery Management", icon: Images },
  { to: "/admin/offers", label: "Offer Management", icon: Megaphone },
  { to: "/admin/business-info", label: "Business Information", icon: Building2 },
  { to: "/admin/settings", label: "Settings", icon: SettingsIcon },
];

function AdminLayout() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/admin/login", replace: true });
        return;
      }
      const { data: isAdmin } = await supabase.rpc("has_role", {
        _user_id: data.session.user.id,
        _role: "admin",
      });
      if (cancelled) return;
      if (!isAdmin) {
        await supabase.auth.signOut();
        navigate({ to: "/admin/login", replace: true });
        return;
      }
      setEmail(data.session.user.email ?? null);
      setChecking(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  }

  if (checking) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-[var(--chocolate)]" />
      </div>
    );
  }

  const activeLabel =
    navItems.find((n) => (n.exact ? pathname === n.to : pathname.startsWith(n.to)))?.label ??
    "Dashboard";

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_75)] text-foreground">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 lg:w-72 shrink-0 flex-col border-r border-border/60 bg-background/80 backdrop-blur sticky top-0 h-screen">
          <div className="px-6 py-6 border-b border-border/60">
            <div className="flex items-center gap-3">
              <span className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--peach)] grid place-items-center shadow-[var(--shadow-soft)]">
                <Cake className="h-5 w-5 text-[var(--chocolate)]" />
              </span>
              <div className="leading-tight min-w-0">
                <div className="font-display text-base font-bold text-[var(--chocolate)] truncate">
                  Mom Bakers
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Studio Admin
                </div>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
            <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
              Workspace
            </div>
            {navItems.map(({ to, label, icon: Icon, badge, exact }) => {
              const isActive = exact ? pathname === to : pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "w-full group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                    isActive
                      ? "bg-[var(--chocolate)] text-[var(--cream)] shadow-[var(--shadow-soft)]"
                      : "text-[var(--chocolate)]/75 hover:bg-[var(--peach)]/25 hover:text-[var(--chocolate)]",
                  )}
                >
                  <Icon
                    className={cn("h-4.5 w-4.5 shrink-0", isActive ? "opacity-100" : "opacity-70")}
                  />
                  <span className="flex-1 text-left truncate">{label}</span>
                  {typeof badge === "number" && badge > 0 && (
                    <Badge className="bg-[var(--gold)] text-[var(--chocolate)] hover:bg-[var(--gold)]">
                      {badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="px-4 py-4 border-t border-border/60">
            <div className="flex items-center gap-3 px-2">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[var(--peach)] to-[var(--gold)] grid place-items-center text-xs font-bold text-[var(--chocolate)]">
                {(email ?? "A").slice(0, 1).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-[var(--chocolate)] truncate">
                  {email ?? "Admin"}
                </div>
                <div className="text-[10px] text-muted-foreground">Owner</div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label="Sign out">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0 flex flex-col">
          <header className="sticky top-0 z-10 border-b border-border/60 bg-background/85 backdrop-blur">
            <div className="px-5 md:px-8 h-16 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Mom Bakers · Admin
                </div>
                <h1 className="font-display text-lg sm:text-xl font-bold text-[var(--chocolate)] truncate">
                  {activeLabel}
                </h1>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                  <Plus className="h-4 w-4 mr-1.5" /> New
                </Button>
                <Button
                  size="sm"
                  className="bg-[var(--chocolate)] text-[var(--cream)] hover:bg-[var(--chocolate)]/90"
                  asChild
                >
                  <Link to="/">View Website</Link>
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 px-5 md:px-8 py-8 space-y-8">
            <Outlet />

            {/* Mobile nav */}
            <section className="md:hidden">
              <Card className="p-4 rounded-2xl border-border/60">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Navigate
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {navItems.map(({ to, label, icon: Icon, exact }) => {
                    const isActive = exact ? pathname === to : pathname.startsWith(to);
                    return (
                      <Link
                        key={to}
                        to={to}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors",
                          isActive
                            ? "bg-[var(--chocolate)] text-[var(--cream)]"
                            : "bg-[var(--peach)]/15 text-[var(--chocolate)]",
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="truncate">{label}</span>
                      </Link>
                    );
                  })}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" /> Sign out
                </Button>
              </Card>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
