import { motion } from "motion/react";
import styles from "./AboutBeginningsSection.module.scss";

export default function AboutBeginningsSection({ imageSrc }: { imageSrc: string }) {
  return (
    <section className={styles.story} aria-label="Beginnings">
      <div className={styles.storyImageWrap}>
        <img src={imageSrc} alt="Israel Mbonyi" className={styles.storyImage} loading="lazy" />
        <div className={styles.storyImageOverlay} aria-hidden />
      </div>

      <motion.div
        className={styles.storyText}
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.storyTitle}>Beginnings</h2>
        <p className={styles.storyLead}>
          Born in the Democratic Republic of Congo and raised in Rwanda, Israel Mbonyi discovered his love for
          music early in life.
        </p>
        <p className={styles.storyBody}>
          Church was his first stage. The choir became his family and training ground. And songs became the
          language of his faith. There, surrounded by prayer, harmony, and community, he discovered something
          powerful: Music could carry faith.
        </p>
        <br />
        <p className={styles.storyBody}>
          It could heal. It could speak where words fail. It could bring people closer to God. And slowly, song by
          song, a calling began to grow.
        </p>
      </motion.div>
    </section>
  );
}

