import { motion } from "motion/react";
import { Link, router } from "@inertiajs/react";
import GalleryGrid from "@/pages/gallery/components/GalleryGrid";
import styles from "./HomeGallerySection.module.scss";
import GalleryModal from "@/pages/gallery/components/GalleryModal";
import { useState } from "react";

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const sectionTitle = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export interface HomeGalleryItem {
  id: number;
  title: string;
  image: string;
  description: string;
  images: string[];
  created_at: string;
  updated_at: string;
}

export default function HomeGallerySection({ items }: { items: HomeGalleryItem[] }) {
  const [selectedItem, setSelectedItem] = useState<HomeGalleryItem | null>(null);
  const [modalIndex, setModalIndex] = useState(0);

  // Use the galleries data from props
  const galleryItems: HomeGalleryItem[] = items || [];

  const handleItemClick = (item: HomeGalleryItem) => {
    const index = galleryItems.findIndex(filteredItem => filteredItem.id === item.id);
    setModalIndex(index);
    setSelectedItem(item);
  };

  const handlePrevious = () => {
    if (modalIndex > 0) {
      const newIndex = modalIndex - 1;
      setModalIndex(newIndex);
      setSelectedItem(galleryItems[newIndex]);
    }
  };

  const handleNext = () => {
    if (modalIndex < galleryItems.length - 1) {
      const newIndex = modalIndex + 1;
      setModalIndex(newIndex);
      setSelectedItem(galleryItems[newIndex]);
    }
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <section id="gallery" className={styles.gallery}>
      <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}>
        <motion.h2 className="main-section-title" variants={sectionTitle}>
          Moments
        </motion.h2>

        <div className={styles.galleryGridContainer}>
          <GalleryGrid
            items={items}
            onItemClick={handleItemClick}
            className={styles.homeGalleryGrid}
          />

          <GalleryModal
            isOpen={!!selectedItem}
            item={selectedItem}
            onClose={handleCloseModal}
            onPrevious={handlePrevious}
            onNext={handleNext}
            hasPrevious={modalIndex > 0}
            hasNext={modalIndex < galleryItems.length - 1}
          />
        </div>
      </motion.div>
    </section>
  );
}

