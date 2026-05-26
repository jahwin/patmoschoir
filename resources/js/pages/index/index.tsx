import { usePage } from "@inertiajs/react";
import PublicLayout from "@/components/layouts/public-layout";
import {
  hasContactContent,
  type ContactsData,
} from "@/utils/contactData";

import HomeHeroSection from "./components/HomeHeroSection";
import HomeVisionMissionSection from "./components/HomeVisionMissionSection";
import HomeAboutSection from "./components/HomeAboutSection";
import HomeEventsSection from "./components/HomeEventsSection";
import HomePlaylistStreamingSection from "./components/HomePlaylistStreamingSection";
import HomeSupportMinistrySection from "./components/HomeSupportMinistrySection";
import HomeGallerySection, { type HomeGalleryItem } from "./components/HomeGallerySection";
import HomeTestimonialsSection from "./components/HomeTestimonialsSection";
import HomeContactSection from "./components/HomeContactSection";
import HomeSubscribeSection from "./components/HomeSubscribeSection";

export interface HeroData {
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  subdescription?: string | null;
  background_images?: string[];
}

export interface AboutValue {
  title?: string;
  description?: string;
}

export interface StorylineEntry {
  year?: string;
  title?: string;
  description?: string;
}

export interface AboutData {
  title?: string | null;
  text?: string | null;
  image?: string | null;
  subimage?: string | null;
  mission?: string | null;
  vision?: string | null;
  values?: AboutValue[];
  storyline?: StorylineEntry[];
  poster?: string | null;
}

export type DonationCurrency = "USD" | "RWF";

export interface DonationAmount {
  amount: number;
  currency: DonationCurrency;
}

export interface DonationData {
  title?: string | null;
  description?: string | null;
  subdescription?: string | null;
  card_title?: string | null;
  card_description?: string | null;
  amounts?: DonationAmount[];
}

export interface StreamData {
  id: number;
  title: string;
  description: string;
  cover?: string | null;
  date: string;
  start_time: string;
  end_time?: string | null;
  location: string;
  link?: string | null;
  stream_url?: string | null;
}

export interface AlbumData {
  id: number;
  year: number;
  title: string;
  cover?: string | null;
  trackCount: number;
  description?: string | null;
  links: Record<string, string>;
}

export interface TestimonialData {
  id: number;
  platform: string;
  name: string;
  handle?: string | null;
  text: string;
  date: string;
}

interface Gallery {
  id: number;
  title: string;
  image: string | null;
  description: string | null;
  images: string[] | null;
  year: number;
}

export interface IndexPageProps {
  hero?: HeroData;
  about?: AboutData;
  donation?: DonationData;
  stream?: StreamData | null;
  albums?: AlbumData[];
  testimonials?: TestimonialData[];
  contacts?: ContactsData;
  galleries?: Gallery[];
  events?: unknown[];
}

function hasHero(hero?: HeroData): boolean {
  if (!hero) return false;
  return !!(
    hero.title?.trim() ||
    hero.subtitle?.trim() ||
    hero.description?.trim() ||
    hero.subdescription?.trim() ||
    (hero.background_images && hero.background_images.length > 0)
  );
}

function hasAbout(about?: AboutData): boolean {
  if (!about) return false;
  return !!(
    about.title?.trim() ||
    about.text?.trim() ||
    about.image ||
    about.subimage ||
    about.mission?.trim() ||
    about.vision?.trim() ||
    (about.values && about.values.length > 0) ||
    (about.storyline && about.storyline.length > 0) ||
    about.poster
  );
}

function hasVisionMission(about?: AboutData): boolean {
  if (!about) return false;
  return !!(
    about.mission?.trim() ||
    about.vision?.trim() ||
    (about.values && about.values.length > 0)
  );
}

function hasDonation(donation?: DonationData): boolean {
  if (!donation) return false;
  return !!(
    donation.title?.trim() ||
    donation.description?.trim() ||
    donation.subdescription?.trim() ||
    donation.card_title?.trim() ||
    donation.card_description?.trim() ||
    (donation.amounts && donation.amounts.length > 0)
  );
}

function hasTestimonials(testimonials?: TestimonialData[]): boolean {
  return !!(testimonials && testimonials.length > 0);
}

const hasContacts = hasContactContent; // phones/emails may be JSON strings or objects from CMS

export default function Home() {
  const { props } = usePage<IndexPageProps>();
  const {
    hero,
    about,
    donation,
    stream = null,
    albums = [],
    testimonials = [],
    contacts,
    galleries = [],
  } = props;

  const homeGalleryItems: HomeGalleryItem[] = (galleries || [])
    .filter((gallery) => !!gallery.image && gallery.year > 0)
    .map((gallery) => ({
      id: gallery.id,
      title: gallery.title || "Gallery",
      image: gallery.image as string,
      description: gallery.description || "View this gallery collection.",
      images: gallery.images || [],
      year: gallery.year,
    }));

  return (
    <PublicLayout>
      {hasHero(hero) && <HomeHeroSection hero={hero!} />}

      {hasVisionMission(about) && <HomeVisionMissionSection about={about!} />}

      {hasAbout(about) && <HomeAboutSection about={about!} />}

      <HomeEventsSection />

      <HomePlaylistStreamingSection stream={stream} albums={albums} />

      {hasDonation(donation) && <HomeSupportMinistrySection donation={donation!} />}

      {homeGalleryItems.length > 0 && <HomeGallerySection items={homeGalleryItems} />}

      <HomeSubscribeSection />

      {hasTestimonials(testimonials) && (
        <HomeTestimonialsSection testimonials={testimonials} />
      )}

      {hasContacts(contacts) && <HomeContactSection contacts={contacts!} />}
    </PublicLayout>
  );
}
