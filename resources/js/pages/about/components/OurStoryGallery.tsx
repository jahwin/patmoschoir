import { motion } from "motion/react";
import styles from "./OurStoryGallery.module.scss";
import img1 from "../../../../assets/patmos/1.JPG";
import img2 from "../../../../assets/patmos/2.JPG";
import img3 from "../../../../assets/patmos/3.JPG";
import img6 from "../../../../assets/patmos/6.JPG";
import img9 from "../../../../assets/patmos/9.jpeg";
import img10 from "../../../../assets/patmos/10.jpeg";

interface Gallery {
  id: number;
  title: string;
  image: string | null;
  images: string[] | null;
}

interface OurStoryGalleryProps {
  galleries: Gallery[];
}

const FALLBACK_IMAGES = [img1, img2, img3, img6, img9, img10];

export default function OurStoryGallery({ galleries }: OurStoryGalleryProps) {
  const photos: { src: string; alt: string }[] = [];

  if (galleries && galleries.length > 0) {
    for (const g of galleries) {
      if (g.image) photos.push({ src: g.image, alt: g.title });
      if (g.images) {
        for (const img of g.images) {
          photos.push({ src: img, alt: g.title });
        }
      }
      if (photos.length >= 6) break;
    }
  }

  const displayPhotos =
    photos.length >= 3
      ? photos.slice(0, 6)
      : FALLBACK_IMAGES.map((src, i) => ({ src, alt: `Patmos Choir ${i + 1}` }));

  return (
    <></>
    // <section className={styles.section}>
    //   <div className={styles.inner}>
    //     <motion.div
    //       className={styles.header}
    //       initial={{ opacity: 0, y: 20 }}
    //       whileInView={{ opacity: 1, y: 0 }}
    //       viewport={{ once: true }}
    //       transition={{ duration: 0.55 }}
    //     >
    //       <span className={styles.eyebrow}>Moments in Ministry</span>
    //       <h2 className={styles.title}>Through the Years</h2>
    //     </motion.div>

    //     <div className={styles.grid}>
    //       {displayPhotos.map((photo, i) => (
    //         <motion.div
    //           key={i}
    //           className={`${styles.cell} ${i === 0 ? styles.cellWide : ""}`}
    //           initial={{ opacity: 0, scale: 0.97 }}
    //           whileInView={{ opacity: 1, scale: 1 }}
    //           viewport={{ once: true, margin: "-30px" }}
    //           transition={{ duration: 0.55, delay: i * 0.07 }}
    //         >
    //           <img src={photo.src} alt={photo.alt} loading="lazy" />
    //         </motion.div>
    //       ))}
    //     </div>
    //   </div>
    // </section>
  );
}
