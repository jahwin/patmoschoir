import { useState } from "react";
import PublicLayout from "@/components/layouts/public-layout";

import HomeHeroSection from "./components/HomeHeroSection";
import HomeVisionMissionSection from "./components/HomeVisionMissionSection";
import HomeAboutSection from "./components/HomeAboutSection";
import HomeEventsSection from "./components/HomeEventsSection";
import HomePlaylistStreamingSection from "./components/HomePlaylistStreamingSection";
import HomeSupportMinistrySection from "./components/HomeSupportMinistrySection";
import HomeGallerySection from "./components/HomeGallerySection";
import HomeTestimonialsSection from "./components/HomeTestimonialsSection";
import HomeContactSection from "./components/HomeContactSection";
import HomeSubscribeSection from "./components/HomeSubscribeSection";

interface Gallery {
  id: number;
  title: string;
  image: string | null;
  description: string | null;
  images: string[] | null;
  created_at: string;
  updated_at: string;
}

interface IndexProps {
  galleries: Gallery[];
}

export default function Home({ galleries }: IndexProps) {
  const [donateModalOpen, setDonateModalOpen] = useState(false);

  const homeGalleryItems = (galleries || [])
    .filter((gallery) => !!gallery.image)
    .map((gallery) => ({
      id: gallery.id,
      title: gallery.title || "Gallery",
      image: gallery.image as string,
      description: gallery.description || "View this gallery collection.",
      images: gallery.images || [],
      created_at: gallery.created_at,
      updated_at: gallery.updated_at,
    }));

  return (
    <PublicLayout>
      <HomeHeroSection />

      <HomeVisionMissionSection />

      <HomeAboutSection />

      <HomeEventsSection />

      <HomePlaylistStreamingSection />

      <HomeSupportMinistrySection onDonate={() => setDonateModalOpen(true)} />

      <HomeGallerySection items={homeGalleryItems} />

      <HomeTestimonialsSection />

      <HomeContactSection />

      <HomeSubscribeSection />
    </PublicLayout>
  );
}
