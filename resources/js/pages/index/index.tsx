import { useState } from "react";
import PublicLayout from "@/components/layouts/public-layout";

import HomeHeroSection from "./components/HomeHeroSection";
import HomeVisionMissionSection from "./components/HomeVisionMissionSection";
import HomeAboutSection from "./components/HomeAboutSection";
import HomeEventsSection from "./components/HomeEventsSection";
import HomePlaylistStreamingSection from "./components/HomePlaylistStreamingSection";
import HomeTicketsSection from "./components/HomeTicketsSection";
import HomeMusicSection from "./components/HomeMusicSection";
import HomeSupportMinistrySection from "./components/HomeSupportMinistrySection";
import HomeVideosSection from "./components/HomeVideosSection";
import HomeGallerySection from "./components/HomeGallerySection";
import HomeTestimonialsSection from "./components/HomeTestimonialsSection";
import HomeContactSection from "./components/HomeContactSection";
import HomeSubscribeSection from "./components/HomeSubscribeSection";

interface Music {
  id: number;
  image: string | null;
  link: string | null;
  created_at: string;
  updated_at: string;
}

interface Video {
  id: number;
  image: string | null;
  youtube_link: string | null;
  created_at: string;
  updated_at: string;
}

interface Show {
  id: number;
  show_date: string | null;
  venue: string;
  city: string;
  state: string;
  title: string;
  ticket_url: string | null;
  ticket_button_text: string | null;
  no_tickets_button_text: string | null;
  created_at: string;
  updated_at: string;
}

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
  music: Music[];
  videos: Video[];
  shows: Show[];
  galleries: Gallery[];
}

export default function Home({ music, videos, shows, galleries }: IndexProps) {
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

      {shows.length > 0 && (
        <HomeTicketsSection shows={shows} />
      )}

      {music && music.length > 0 && (
        <HomeMusicSection songs={music.map((song) => ({
          id: song.id.toString(),
          cover: song.image || '',
          link: song.link || '',
        }))} />
      )}

      <HomeSupportMinistrySection onDonate={() => setDonateModalOpen(true)} />

      {videos && videos.length > 0 && (
        <HomeVideosSection videos={videos.map((video) => ({
          id: video.id.toString(),
          link: video.youtube_link || '',
        }))} />
      )}

      <HomeGallerySection items={homeGalleryItems} />

      <HomeTestimonialsSection />

      <HomeContactSection />

      <HomeSubscribeSection />
    </PublicLayout>
  );
}
