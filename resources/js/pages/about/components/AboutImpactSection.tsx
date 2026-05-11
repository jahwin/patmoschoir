import { motion } from "motion/react";
import styles from "./AboutImpactSection.module.scss";

export default function AboutImpactSection({ imageSrc }: { imageSrc: string }) {
  return (
    <section className={styles.storyReverse} aria-label="Impact">
      <motion.div
        className={styles.storyText}
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.storyTitle}>Impact</h2>
        <p className={styles.storyLead}>A Journey Touching Thousands</p>
        <p className={styles.storyBody}>
          What began as a small voice behind a classroom has grown into a movement of worship reaching hearts
          across nations.
        </p>
        <p className={styles.storyBody}>
          Through music, gatherings, and ministry, the message continues to travel further every year.
        </p>
      </motion.div>

      <div className={styles.storyImageWrapReverse}>
        <img src={imageSrc} alt="On stage" className={styles.storyImage} loading="lazy" />
        <div className={styles.storyImageOverlayReverse} aria-hidden />
      </div>
    </section>
  );
}

