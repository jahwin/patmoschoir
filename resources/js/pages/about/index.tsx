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

interface AboutProps {
  galleries: Gallery[];
}

export default function About({ galleries }: AboutProps) {
  return (
    <>
      <Head title="Our Story" />
      <PublicLayout
        title="Our Story"
        description="From a wedding song in Kigali to 29 years of ministry — the journey of Patmos Choir."
      >
        <div className={styles.page}>
          <OurStoryOrigin />
          <OurStoryTimeline />
          <OurStoryValues />
          <OurStoryGallery galleries={galleries} />
          <OurStoryClosing />
        </div>
      </PublicLayout>
    </>
  );
}
