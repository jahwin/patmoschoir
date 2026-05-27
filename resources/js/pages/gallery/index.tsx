import { Head, usePage } from "@inertiajs/react";
import PublicLayout from "@/components/layouts/public-layout";
import HomeGallerySection from "@/pages/index/components/HomeGallerySection";
import type { HomeGalleryItem } from "@/pages/index/components/HomeGallerySection";

interface GalleryProps {
  galleries: HomeGalleryItem[];
}

export default function Gallery({ galleries }: GalleryProps) {
  const { siteContent } = usePage().props as any;

  return (
    <>
      <Head title="Gallery" />
      <PublicLayout
        title="Gallery"
        subtitle="Captured moments from our ministry"
        description="Photos from worship nights, concerts, outreaches, and the communities we serve."
        backgroundImage={siteContent?.home_gallery_background_image}
      >
        <HomeGallerySection items={galleries} />
      </PublicLayout>
    </>
  );
}
