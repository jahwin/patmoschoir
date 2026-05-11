import { motion } from "motion/react";
import styles from "./AboutMissionSection.module.scss";

export default function AboutMissionSection({ imageSrc }: { imageSrc: string }) {
  return (
    <section className={styles.story} aria-label="The Mission">
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
        <h2 className={styles.storyTitle}>The Mission</h2>
        <p className={styles.storyLead}>
          Every song he writes carries the same heartbeat: To bring people closer to God. To remind the
          weary that hope still exists. To help the searching find faith again. To create moments where heaven
          feels near.
        </p>
        <p className={styles.storyBody}>
          Through music, Israel Mbonyi continues to build a bridge connecting hearts to worship, and people
          to the presence of God. “God is going to make you the bridge for many in this world.” What began as a
          dream has now become a journey.
        </p>
        <br />
        <p className={styles.storyBody}>
          It could heal. It could speak where words fail. It could bring people closer to God. And slowly, song
          by song, a calling began to grow.
        </p>
      </motion.div>
    </section>
  );
}

