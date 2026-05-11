import { motion } from "motion/react";
import styles from "./AboutHeroSection.module.scss";

const stagger = {
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemUp = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
};

export default function AboutHeroSection({ images }: { images: string[] }) {
  return (
    <section className={styles.hero} aria-label="About">
      <div className={styles.heroImages}>
        {images.map((src, i) => (
          <motion.div
            key={`hero-${i}-${src.slice(-16)}`}
            className={styles.heroImageWrap}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <img src={src} alt="" loading="eager" />
          </motion.div>
        ))}
      </div>

      <motion.div className={styles.heroContent} initial="initial" animate="animate" variants={stagger}>
        <motion.h1 className={styles.heroTitle} variants={itemUp}>
          About
        </motion.h1>
        <motion.p className={styles.heroName} variants={itemUp}>
          Israel Mbonyi
        </motion.p>
        <motion.p className={styles.heroTagline} variants={itemUp}>
          What started behind a classroom in high school, just a voice, a guitar, and a few friends listening, has
          grown into a worship movement reaching millions across the world.
        </motion.p>
      </motion.div>
    </section>
  );
}

