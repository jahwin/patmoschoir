import { motion } from "motion/react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import styles from "./AboutGallerySection.module.scss";

const galleryHeightsDefault = [220, 280, 180, 260, 200, 240, 300];

const Item = styled(Paper)(() => ({
  backgroundColor: "#1a1a1a",
  overflow: "hidden",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    verticalAlign: "middle",
  },
}));

export default function AboutGallerySection({
  images,
  galleryHeights = galleryHeightsDefault,
}: {
  images: string[];
  galleryHeights?: number[];
}) {
  return (
    <section className={styles.gallerySection} aria-label="Gallery">
      <motion.p
        className={styles.galleryKicker}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        On stage & behind the scenes
      </motion.p>
      <motion.p
        className={styles.galleryIntro}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.08 }}
      >
        Moments from the journey—on stage and behind the scenes.
      </motion.p>

      <Box sx={{ width: "100%", minHeight: 400 }}>
        <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
          {images.map((src, index) => (
            <motion.div
              key={`${index}-${src.slice(-20)}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px", amount: 0.1 }}
              transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
            >
              <Item sx={{ height: galleryHeights[index % galleryHeights.length] }} className={styles.galleryMasonryItem}>
                <img src={src} alt="" loading="lazy" />
              </Item>
            </motion.div>
          ))}
        </Masonry>
      </Box>
    </section>
  );
}

