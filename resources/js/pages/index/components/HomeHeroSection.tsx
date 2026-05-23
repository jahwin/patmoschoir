import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "@inertiajs/react";
import styles from "./HomeHeroSection.module.scss";
import heroImage from "../../../../assets/patmos/IMG_2078.JPEG";
import type { HeroData } from "../index";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

interface HomeHeroSectionProps {
  hero: HeroData;
}

export default function HomeHeroSection({ hero }: HomeHeroSectionProps) {
  const backgrounds =
    hero.background_images && hero.background_images.length > 0
      ? hero.background_images
      : [heroImage];

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    if (backgrounds.length <= 1) return;
    const timer = setInterval(() => {
      setBgIndex((i) => (i + 1) % backgrounds.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [backgrounds.length]);

  const meta = hero.subtitle?.trim();
  const title = hero.title?.trim() || "Patmos Choir";
  const description = hero.description?.trim();
  const tagline = hero.subdescription?.trim();

  return (
    <section className={styles.hero}>
      {backgrounds.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className={styles.heroBg}
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === bgIndex ? 1 : 0,
          }}
          aria-hidden={i !== bgIndex}
        />
      ))}
      <div className={styles.heroOverlay} />

      <motion.div
        className={styles.heroContent}
        initial="initial"
        animate="animate"
        variants={{ animate: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } } }}
      >
        <motion.span className={styles.heroEyebrow} variants={fadeUp} transition={{ duration: 0.55 }}>
          Welcome to
        </motion.span>

        <motion.h1 variants={fadeUp} transition={{ duration: 0.6 }}>
          {title}
        </motion.h1>

        <motion.p className={styles.heroMeta} variants={fadeUp} transition={{ duration: 0.55 }}>
          {meta}
        </motion.p>

        <motion.p className={styles.heroDesc} variants={fadeUp} transition={{ duration: 0.55 }}>
          {description}
        </motion.p>

        <motion.p className={styles.heroTagline} variants={fadeUp} transition={{ duration: 0.55 }}>
          "{tagline}"
        </motion.p>

        <motion.div className={styles.heroCta} variants={fadeUp} transition={{ duration: 0.5 }}>
          <Link href="/about" className="btn">Our Story</Link>
          <button
            type="button"
            className="btn tickets-notify-btn"
            onClick={() => document.getElementById("music")?.scrollIntoView({ behavior: "smooth" })}
          >
            Listen to Music
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
