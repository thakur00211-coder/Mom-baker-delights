import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon } from "lucide-react";
import { PlaceholderPage } from "@/components/admin/PlaceholderPage";

export const Route = createFileRoute("/admin/_authed/settings")({
  component: () => (
    <PlaceholderPage
      title="Settings"
      description="Manage admin preferences, team access and dashboard configuration."
      icon={SettingsIcon}
    />
  ),
});