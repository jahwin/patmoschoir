import React, { useState, useMemo } from 'react';
import GalleryHero from "./components/GalleryHero";
import GalleryFilter from "./components/GalleryFilter";
import GalleryGrid from "./components/GalleryGrid";
import GalleryModal from "./components/GalleryModal";
import styles from "./style.module.scss";
import PublicLayout from '@/components/layouts/public-layout';
import { Head } from '@inertiajs/react';

interface GalleryItem {
  id: number;
  title: string;
  image: string;
  description: string;
  images: string[];
  created_at: string;
  updated_at: string;
}

interface GalleryProps {
  galleries: GalleryItem[];
}

export default function Gallery({ galleries }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [modalIndex, setModalIndex] = useState(0);

  // Use the galleries data from props
  const galleryItems: GalleryItem[] = galleries || [];

  // Filter items based on active filter
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') {
      return galleryItems;
    }
    // For now, return all items since we don't have categories in the database
    // You can add category field to the database later if needed
    return galleryItems;
  }, [activeFilter, galleryItems]);

  const handleItemClick = (item: GalleryItem) => {
    const index = filteredItems.findIndex(filteredItem => filteredItem.id === item.id);
    setModalIndex(index);
    setSelectedItem(item);
  };

  const handlePrevious = () => {
    if (modalIndex > 0) {
      const newIndex = modalIndex - 1;
      setModalIndex(newIndex);
      setSelectedItem(filteredItems[newIndex]);
    }
  };

  const handleNext = () => {
    if (modalIndex < filteredItems.length - 1) {
      const newIndex = modalIndex + 1;
      setModalIndex(newIndex);
      setSelectedItem(filteredItems[newIndex]);
    }
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <Head>
        <title>Gallery</title>
      </Head>
      <PublicLayout title="Gallery" subtitle="Explore Our Architectural Portfolio" description="Discover our diverse collection of architectural projects, from residential masterpieces to commercial landmarks that define modern design excellence.">
        <div className={styles.galleryPage}>
          <GalleryGrid
            items={filteredItems}
            onItemClick={handleItemClick}
          />
          <GalleryModal
            isOpen={!!selectedItem}
            item={selectedItem}
            onClose={handleCloseModal}
            onPrevious={handlePrevious}
            onNext={handleNext}
            hasPrevious={modalIndex > 0}
            hasNext={modalIndex < filteredItems.length - 1}
          />
        </div>
      </PublicLayout>

    </>
  );
}
