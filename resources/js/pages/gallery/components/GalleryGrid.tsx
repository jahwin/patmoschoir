import { motion } from "motion/react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Masonry from "@mui/lab/Masonry";
import styles from "./GalleryGrid.module.scss";

const galleryHeightsDefault = [220, 280, 180, 260, 200, 240, 300];

const MasonryCard = styled(Paper)(() => ({
  backgroundColor: "#1a1a1a",
  overflow: "hidden",
  height: "100%",
}));

interface GalleryItem {
  id: number;
  title: string;
  image: string;
  description: string;
  images: string[];
  created_at: string;
  updated_at: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
  onItemClick: (item: GalleryItem) => void;
  className?: string;
  galleryHeights?: number[];
}

export default function GalleryGrid({
  items,
  onItemClick,
  className = "",
  galleryHeights = galleryHeightsDefault,
}: GalleryGridProps) {
  return (
    <section className={`${styles.galleryGrid} ${className}`}>
      <div className={styles.container}>
        <Box sx={{ width: "100%", minHeight: 400 }}>
          <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px", amount: 0.1 }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
              >
                <MasonryCard
                  elevation={0}
                  sx={{ height: galleryHeights[index % galleryHeights.length] }}
                  className={styles.galleryMasonryItem}
                >
                  <div
                    className={styles.gridItem}
                    role="button"
                    tabIndex={0}
                    onClick={() => onItemClick(item)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onItemClick(item);
                      }
                    }}
                  >
                    <div className={styles.imageContainer}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className={styles.projectImage}
                        loading="lazy"
                      />
                      <div className={styles.imageOverlay}>
                        <div className={styles.overlayContent}>
                          <h3 className={styles.projectTitle}>{item.title}</h3>
                        </div>
                        <div className={styles.viewButton}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </MasonryCard>
              </motion.div>
            ))}
          </Masonry>
        </Box>
      </div>
    </section>
  );
}
