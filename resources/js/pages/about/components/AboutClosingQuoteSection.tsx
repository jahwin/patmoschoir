import { motion } from "motion/react";
import styles from "./AboutClosingQuoteSection.module.scss";

export default function AboutClosingQuoteSection({ imageSrc }: { imageSrc: string }) {
  return (
    <section className={styles.quoteSection} aria-label="Closing quote">
      <motion.div
        className={styles.quoteWithImage}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.quoteImageWrap}>
          <img src={imageSrc} alt="" loading="lazy" />
        </div>

        <blockquote className={styles.quote}>
          <p className={styles.quoteText}>&ldquo;God is going to make you the bridge for many in this world.&rdquo;</p>
          <cite className={styles.quoteCite}>— From a dream</cite>
        </blockquote>
      </motion.div>
    </section>
  );
}

