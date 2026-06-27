import { createFileRoute } from "@tanstack/react-router";
import { UtensilsCrossed } from "lucide-react";
import { PlaceholderPage } from "@/components/admin/PlaceholderPage";

export const Route = createFileRoute("/admin/_authed/menu")({
  component: () => (
    <PlaceholderPage
      title="Menu Management"
      description="Curate the bakes, pastries and signatures featured on your public menu."
      icon={UtensilsCrossed}
    />
  ),
});