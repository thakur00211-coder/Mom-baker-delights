import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSection } from "@/components/home/HeroSection";
import { WhyMomBakersSection } from "@/components/home/WhyMomBakersSection";
import { FeaturedMenuSection } from "@/components/home/FeaturedMenuSection";
import { CustomizeCakeSection } from "@/components/home/CustomizeCakeSection";
import { CelebrationsSection } from "@/components/home/CelebrationsSection";
import { GalleryPreviewSection } from "@/components/home/GalleryPreviewSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ContactPreviewSection } from "@/components/home/ContactPreviewSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mom Bakers — Celebration Café & Custom Cake Studio" },
      {
        name: "description",
        content:
          "Where every celebration begins with something sweet. Custom cakes, cozy moments and memorable celebrations in Taragarh, Punjab.",
      },
      { property: "og:title", content: "Mom Bakers — Celebration Café & Custom Cake Studio" },
      {
        property: "og:description",
        content: "Custom cakes, cozy moments and memorable celebrations.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroSection />
      <WhyMomBakersSection />
      <FeaturedMenuSection />
      <CustomizeCakeSection />
      <CelebrationsSection />
      <GalleryPreviewSection />
      <ReviewsSection />
      <ContactPreviewSection />
    </>
  );
}
