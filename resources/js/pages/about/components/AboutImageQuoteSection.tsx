import { motion } from "motion/react";
import styles from "./AboutImageQuoteSection.module.scss";

export default function AboutImageQuoteSection({ imageSrc }: { imageSrc: string }) {
  return (
    <section className={styles.imageQuoteSection} aria-label="Quote">
      <motion.div
        className={styles.imageQuoteImage}
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <img src={imageSrc} alt="" loading="lazy" />
      </motion.div>

      <motion.blockquote
        className={styles.imageQuoteText}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <p className={styles.imageQuoteQuote}>
          &ldquo;One night, a man appeared to him in a dream and asked: &lsquo;Isn&apos;t your name Mbonyicyambu?&rsquo; He
          replied, &lsquo;Yes, it is.&rsquo; The man said, &lsquo;God is going to make you the bridge for many in this
          world.&rsquo;&rdquo;
        </p>
        <cite className={styles.imageQuoteCite}>— A dream</cite>
      </motion.blockquote>
    </section>
  );
}

