import { Head } from '@inertiajs/react';
import PublicLayout from '@/components/layouts/public-layout';
import OurStoryOrigin from './components/OurStoryOrigin';
import OurStoryTimeline from './components/OurStoryTimeline';
import OurStoryValues from './components/OurStoryValues';
import OurStoryGallery from './components/OurStoryGallery';
import OurStoryClosing from './components/OurStoryClosing';
import styles from './style.module.scss';

interface Gallery {
  id: number;
  title: string;
  image: string | null;
  images: string[] | null;
}

export interface StorylineItem {
  year: string;
  title: string;
  description: string;
}

export interface AboutValue {
  title: string;
  description: string;
  icon?: string;
}

export interface AboutData {
  title: string | null;
  text: string | null;
  image: string | null;
  subimage: string | null;
  mission: string | null;
  vision: string | null;
  values: AboutValue[];
  storyline: StorylineItem[];
  storyline_eyebrow: string | null;
  storyline_title: string | null;
  poster: string | null;
}

interface AboutProps {
  galleries: Gallery[];
  about: AboutData;
}

export default function About({ galleries, about }: AboutProps) {
  return (
    <>
      <Head title="Our Story" />
      <PublicLayout
        title="Our Story"
        description="From a wedding song in Kigali to 29 years of ministry — the journey of Patmos Choir."
      >
        <div className={styles.page}>
          <OurStoryOrigin about={about} />
          <OurStoryTimeline
            storyline={about.storyline}
            storyline_eyebrow={about.storyline_eyebrow}
            storyline_title={about.storyline_title}
          />
          <OurStoryValues about={about} />
          <OurStoryGallery galleries={galleries} />
          <OurStoryClosing poster={about.poster} />
        </div>
      </PublicLayout>
    </>
  );
}
