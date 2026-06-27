import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { PlaceholderPage } from "@/components/admin/PlaceholderPage";

export const Route = createFileRoute("/admin/_authed/business-info")({
  component: () => (
    <PlaceholderPage
      title="Business Information"
      description="Update your contact details, location, hours and brand essentials."
      icon={Building2}
    />
  ),
});