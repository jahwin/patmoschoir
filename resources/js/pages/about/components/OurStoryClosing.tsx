import { motion } from "motion/react";
import { Link } from "@inertiajs/react";
import styles from "./OurStoryClosing.module.scss";
import imgHero from "../../../../assets/patmos/IMG_2078.JPEG";

export default function OurStoryClosing() {
  return (
    <section className={styles.section}>
      <div
        className={styles.bg}
        style={{ backgroundImage: `url(${imgHero})` }}
        aria-hidden="true"
      />
      <div className={styles.overlay} aria-hidden="true" />

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
      >
        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Patmos Choir — Kigali, Rwanda
        </motion.span>

        <motion.blockquote
          className={styles.quote}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          &ldquo;They will still bear fruit in old age, they will stay
          fresh and green, proclaiming, the&nbsp;LORD is upright.&rdquo;
        </motion.blockquote>

        <motion.p
          className={styles.reference}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Psalm 92:14–15
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.28 }}
        >
          <Link href="/events" className="btn">See Upcoming Events</Link>
          <Link href="/contact" className={`btn ${styles.btnOutline}`}>Get in Touch</Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
