import { createFileRoute } from "@tanstack/react-router";
import { Images } from "lucide-react";
import { PlaceholderPage } from "@/components/admin/PlaceholderPage";

export const Route = createFileRoute("/admin/_authed/gallery")({
  component: () => (
    <PlaceholderPage
      title="Gallery Management"
      description="Upload and arrange photographs that showcase your bakery's craft."
      icon={Images}
    />
  ),
});
