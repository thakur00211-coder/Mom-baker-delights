import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star, Phone, MapPin, Clock } from "lucide-react";
import customCake from "@/assets/custom-cake.jpg";
import celebration from "@/assets/celebration.jpg";
import interior from "@/assets/interior.jpg";
import pastries from "@/assets/pastries.jpg";
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

const events = [
  { icon: "🎂", title: "Birthday Parties", desc: "Make You'r day unforgettable" },
  { icon: "💐", title: "Anniversary", desc: "Celebrate years of togetherness" },
  { icon: "👨‍👩‍👧", title: "Family Gatherings", desc: "Cozy, intimate get-togethers" },
  { icon: "🎉", title: "Special Events", desc: "Custom-built for your occasion" },
];

const galleryCats = [
  { label: "Cakes", img: customCake },
  { label: "Interior", img: interior },
  { label: "Food", img: pastries },
  { label: "Celebrations", img: celebration },
];

const reviews = [
  {
    name: "Priya Sharma",
    role: "Birthday Celebration",
    text: "The custom cake for my daughter's 5th birthday was beyond beautiful. Tasted as wonderful as it looked. Mom Bakers made the day magical.",
    rating: 5,
  },
  {
    name: "Rohan Mehta",
    role: "Anniversary",
    text: "We booked the anniversary package — the ambience, the cake, the little details. Felt premium without losing the warmth. Highly recommend.",
    rating: 5,
  },
  {
    name: "Anjali & Friends",
    role: "Regular Visitors",
    text: "Best cappuccino in town and the pastries are unreal. It's now our weekend ritual.",
    rating: 5,
  },
];

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
