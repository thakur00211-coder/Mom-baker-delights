import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { PlaceholderPage } from "@/components/admin/PlaceholderPage";

export const Route = createFileRoute("/admin/_authed/offers")({
  component: () => (
    <PlaceholderPage
      title="Offer Management"
      description="Create seasonal promotions and announcement banners for your website."
      icon={Megaphone}
    />
  ),
});