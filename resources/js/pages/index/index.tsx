// import HeroSection from "./components/HeroSectionBauen";
// import AboutSection from "./components/AboutSection";
// import ServicesSection from "./components/ServicesSection";
// import NewsSection from "./components/NewsSection";
// import MusicSection from "./components/MusicSection";
// import ShowsSection from "./components/ShowsSection";
// import DonateSection from "./components/DonateSection";
// import VideosSection from "@/pages/videos/components/VideosSection";
// import styles from "./style.module.scss";
// import PublicLayout from '@/components/layouts/public-layout';
// import { Head, usePage } from '@inertiajs/react';
// import { SharedData } from '@/types/shared';

// interface BlogPost {
//   id: number;
//   title: string;
//   slug: string;
//   content: string;
//   image: string | null;
//   tags: string | null;
//   read_time: string;
//   word_count: number;
//   author: string | null;
//   created_at: string;
//   updated_at: string;
// }

// interface Service {
//   id: number;
//   title: string;
//   description: string;
//   image: string | null;
//   inclusions: string;
//   text: string | null;
//   created_at: string;
//   updated_at: string;
// }

// interface Slide {
//   id: number;
//   image: string | null;
//   media_type: 'image' | 'video';
//   video_url: string | null;
//   created_at: string;
//   updated_at: string;
// }

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
  // blogs: BlogPost[];
  // services: Service[];
  // slides: Slide[];
  music: Music[];
  videos: Video[];
  shows: Show[];
  galleries: Gallery[];
}

// export default function Index({ blogs, services, slides, music = [], videos = [], shows = [] }: IndexProps) {
//   const { siteContent } = usePage<SharedData>().props;
//   return (
//     <>
//       <Head title="Home" />
//       <PublicLayout>
//         <div className={styles.architecturePage}>
//           <HeroSection slides={slides} />
//           <ShowsSection shows={shows} />
//           {
//             siteContent && siteContent.about_text && (
//               <AboutSection />
//             )
//           }
//           <DonateSection />
//           <MusicSection music={music} />
//           <VideosSection videos={videos} />
//           <NewsSection blogs={blogs} />
//         </div>

//       </PublicLayout>
//     </>
//   );
// }



import { useState } from "react";
import PublicLayout from "@/components/layouts/public-layout";

import HomeHeroSection from "./components/HomeHeroSection";
import HomeTicketsSection from "./components/HomeTicketsSection";
import HomeMusicSection from "./components/HomeMusicSection";
import HomeSupportMinistrySection from "./components/HomeSupportMinistrySection";
import HomeVideosSection from "./components/HomeVideosSection";
import HomeGallerySection from "./components/HomeGallerySection";
import HomeSubscribeSection from "./components/HomeSubscribeSection";

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

      {
        shows.length > 0 && (
          <HomeTicketsSection shows={shows} />
        )
      }

      {
        music && music.length > 0 && (
          <HomeMusicSection songs={music.map((song) => ({
            id: song.id.toString(),
            cover: song.image || '',
            link: song.link || '',
          }))} />
        )
      }
      <HomeSupportMinistrySection onDonate={() => setDonateModalOpen(true)} />
      {
        videos && videos.length > 0 && (
          <HomeVideosSection videos={videos.map((video) => ({
            id: video.id.toString(),
            link: video.youtube_link || '',
          }))} />
        )
      }

      {
        
      }
      {homeGalleryItems.length > 0 && <HomeGallerySection items={homeGalleryItems} />}
      <HomeSubscribeSection />
    </PublicLayout>
  );
}