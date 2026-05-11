import { motion } from "motion/react";
import styles from "./HomeVideosSection.module.scss";

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

export type HomeVideo = {
  id: string;
  link: string;
};

export default function HomeVideosSection({ videos }: { videos: HomeVideo[] }) {
  return (
    <section id="videos" className={styles.videos}>
      <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}>
        <motion.p className="main-section-subtitle" variants={sectionTitle}>
          Discover Israel Mbonyi&apos;s
        </motion.p>
        <motion.h2 className="main-section-title" variants={sectionTitle}>
          Videos
        </motion.h2>

        <motion.div className={styles.videoGrid} variants={staggerContainer}>
          {videos.map((video) => {
            const videoId = video.link.includes("v=") ? video.link.split("v=")[1]?.split("&")[0] : "";
            const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
            return (
              <motion.a
                key={video.id}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.videoThumb}
                variants={staggerItem}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <img src={thumbnail} alt={video.id} loading="lazy" />
                <span className={styles.playIcon} aria-hidden="true" />
                {/* <span className={styles.videoTitle}>{video.title}</span> */}
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div className="tickets-notify" variants={staggerItem}>
          <a href="https://www.youtube.com/@Mbonyi/" target="_blank" rel="noopener noreferrer" className="tickets-notify-btn">
            Find all videos
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

