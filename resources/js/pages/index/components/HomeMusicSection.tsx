import { motion } from "motion/react";
import styles from "./HomeMusicSection.module.scss";

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

export type HomeSong = {
  id: string;
  cover: string;
  link: string;
};

export default function HomeMusicSection({ songs }: { songs: HomeSong[] }) {
  return (
    <section id="music" className={styles.music}>
      <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}>
        <motion.p className="main-section-subtitle" variants={sectionTitle}>
          Discover Israel Mbonyi&apos;s
        </motion.p>
        <motion.h2 className="main-section-title" variants={sectionTitle}>
          Latest Songs
        </motion.h2>

        <motion.div className={styles.musicGrid} variants={staggerContainer}>
          {songs.map((song) => (
            <motion.a
              href={song.link}
              target="_blank"
              rel="noopener noreferrer"
              key={song.id}
              className={styles.musicItem}
              variants={staggerItem}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <img src={song.cover} alt={song.id} loading="lazy" />
              {/* <div className={styles.musicOverlay}>
                <span className={styles.musicTitle}>{song.title}</span>
              </div> */}
            </motion.a>
          ))}
        </motion.div>

        <motion.div className="tickets-notify" variants={staggerItem}>
          <a
            href="https://open.spotify.com/artist/6E6bGyrGJM33jnVivvn3kH"
            target="_blank"
            rel="noopener noreferrer"
            className="tickets-notify-btn"
          >
            Find all songs
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

