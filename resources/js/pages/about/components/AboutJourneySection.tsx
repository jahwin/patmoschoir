import { motion } from "motion/react";
import styles from "./AboutJourneySection.module.scss";

export default function AboutJourneySection({ imageSrc }: { imageSrc: string }) {
  return (
    <section className={styles.storyReverse} aria-label="The journey">
      <motion.div
        className={styles.storyText}
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.storyTitle}>The journey</h2>
        <p className={styles.storyLead}>
          Years later, that quiet beginning has become something far greater. Israel Mbonyi is now a
          multi-award-winning gospel artist, known for songs that have reached millions across Africa and
          beyond.
        </p>
        <p className={styles.storyBody}>
          From intimate worship gatherings to sold-out arenas, his music has carried a message of faith, hope,
          and salvation to audiences across the world. But the mission has never changed. It was never about fame.
          It was never about recognition. It has always been about the message.
        </p>
      </motion.div>

      <div className={styles.storyImageWrapReverse}>
        <img src={imageSrc} alt="On stage" className={styles.storyImage} loading="lazy" />
        <div className={styles.storyImageOverlayReverse} aria-hidden />
      </div>
    </section>
  );
}

