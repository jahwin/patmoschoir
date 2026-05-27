import { motion } from "motion/react";
import styles from "./OurStoryTimeline.module.scss";
import { StorylineItem } from "../index";

interface Props {
  storyline: StorylineItem[];
  storyline_eyebrow: string | null;
  storyline_title: string | null;
}

export default function OurStoryTimeline({ storyline, storyline_eyebrow, storyline_title }: Props) {
  if (storyline.length === 0) return null;

  const events = storyline.map(s => ({ year: s.year, title: s.title, body: s.description }));

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          {storyline_eyebrow && <span className={styles.eyebrow}>{storyline_eyebrow}</span>}
          {storyline_title && <h2 className={styles.title}>{storyline_title}</h2>}
        </motion.div>

        <div className={styles.timeline}>
          <div className={styles.line} aria-hidden="true" />

          {events.map((event, i) => (
            <motion.div
              key={i}
              className={`${styles.entry} ${i % 2 === 0 ? styles.entryLeft : styles.entryRight}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
            >
              <div className={styles.entryDot} aria-hidden="true" />
              <div className={styles.entryCard}>
                <span className={styles.entryYear}>{event.year}</span>
                <h3 className={styles.entryTitle}>{event.title}</h3>
                <p className={styles.entryBody}>{event.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
