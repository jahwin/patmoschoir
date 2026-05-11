import Styles from "./style.module.scss";

import AboutHeroSection from "./components/AboutHeroSection";
import AboutBeginningsSection from "./components/AboutBeginningsSection";
import AboutImageQuoteSection from "./components/AboutImageQuoteSection";
import AboutJourneySection from "./components/AboutJourneySection";
import AboutMissionSection from "./components/AboutMissionSection";
import AboutImpactSection from "./components/AboutImpactSection";
import AboutGallerySection from "./components/AboutGallerySection";
import AboutClosingQuoteSection from "./components/AboutClosingQuoteSection";

import ticketsImg from "../../../assets/tickets-img.jpg";

import image1 from "../../../assets/images/1.jpg";
import image3 from "../../../assets/images/3.jpg";
import image4 from "../../../assets/images/4.jpg";
import image8 from "../../../assets/images/8.jpg";
import image9 from "../../../assets/images/9.jpg";
import image10 from "../../../assets/images/10.jpg";
import image11 from "../../../assets/images/11.jpg";
import image12 from "../../../assets/images/12.jpg";
import image13 from "../../../assets/images/13.jpg";
import image14 from "../../../assets/images/14.jpg";
import image15 from "../../../assets/images/15.jpg";
import image16 from "../../../assets/images/16.jpg";
import image17 from "../../../assets/images/17.jpg";
import image18 from "../../../assets/images/18.jpg";
import image19 from "../../../assets/images/19.jpg";
import image20 from "../../../assets/images/20.jpg";
import image21 from "../../../assets/images/21.jpg";
import PublicLayout from "@/components/layouts/public-layout";
import HomeGallerySection, { HomeGalleryItem } from "../index/components/HomeGallerySection";

const HERO_IMAGES = [image1, image8, image3, image4];
const GALLERY_ABOUT = [
  image12,
  image13,
  image14,
  image15,
  image16,
  image17,
  image18,
  image19,
  image20,
  image21,
];


const galleryHeights = [220, 280, 180, 260, 200, 240, 300];

interface Gallery {
  id: number;
  title: string;
  image: string | null;
  description: string | null;
  images: string[] | null;
  created_at: string;
  updated_at: string;
}

interface AboutProps {
  galleries: HomeGalleryItem[];
}

export default function About({ galleries }: AboutProps) {
  return (
    <PublicLayout>
      <div className={Styles.page}>
        <AboutHeroSection images={HERO_IMAGES} />
        <AboutBeginningsSection imageSrc={ticketsImg} />
        <AboutImageQuoteSection imageSrc={image9} />
        <AboutJourneySection imageSrc={image10} />
        <AboutMissionSection imageSrc={image12} />
        <AboutImpactSection imageSrc={image10} />
        {
          galleries.length > 0 && (
            <HomeGallerySection items={galleries} />
          )
        }
        <AboutClosingQuoteSection imageSrc={image11} />
      </div>
    </PublicLayout>
  );
}