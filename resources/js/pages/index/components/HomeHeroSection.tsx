import { motion } from "motion/react";
import { Link } from "@inertiajs/react";
import styles from "./HomeHeroSection.module.scss";
import heroImage from "../../../../assets/patmos/IMG_2078.JPEG";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

export default function HomeHeroSection() {
  return (
    <section className={styles.hero}>
      <div
        className={styles.heroBg}
        style={{ backgroundImage: `url(${heroImage})` }}
      />
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
          Patmos Choir
        </motion.h1>

        <motion.p className={styles.heroMeta} variants={fadeUp} transition={{ duration: 0.55 }}>
          Seventh Day Adventist &nbsp;·&nbsp; Kigali, Rwanda &nbsp;·&nbsp; Est.&nbsp;1996
        </motion.p>

        <motion.p className={styles.heroDesc} variants={fadeUp} transition={{ duration: 0.55 }}>
          A choir born of friendship and faith — raising voices to bring healing, hope,
          and the presence of God to hearts across Rwanda and beyond.
        </motion.p>

        <motion.p className={styles.heroTagline} variants={fadeUp} transition={{ duration: 0.55 }}>
          &ldquo;Where worship speaks, hearts are healed, and hope is restored.&rdquo;
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
