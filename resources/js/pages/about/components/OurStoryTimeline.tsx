import { motion } from "motion/react";
import styles from "./OurStoryTimeline.module.scss";
import { StorylineItem } from "../index";

const FALLBACK_EVENTS = [
  { year: "1996", title: "The First Song", body: "Former schoolmates from DRC reunite in Kigali and sing together at a friend's wedding. The room goes still. Something holy is present." },
  { year: "1997", title: "A Choir Takes Shape", body: "More voices join. The group begins rehearsing regularly, believing they are more than friends who sing — they are a choir with a calling." },
  { year: "1998", title: "The Name: Patmos", body: "A member suggests the name Patmos — the island of exile and revelation in Scripture. The name is received with unanimity and kept to this day." },
  { year: "Early 2000s", title: "Ministry Expands", body: "Patmos begins ministering beyond churches: crusades, schools, community gatherings. Their reach grows across Kigali and surrounding areas." },
  { year: "2010s", title: "A New Generation", body: "Children of the founding members begin to join. The choir becomes multi-generational, carrying the original spirit into new voices." },
  { year: "Today", title: "29 Years of Faithfulness", body: "Patmos Choir continues to go wherever God calls — churches, crusades, hospitals, homes of the grieving, and the bedsides of those too weak to worship elsewhere." },
];

interface Props { storyline: StorylineItem[] }

export default function OurStoryTimeline({ storyline }: Props) {
  const events = storyline.length > 0
    ? storyline.map(s => ({ year: s.year, title: s.title, body: s.description }))
    : FALLBACK_EVENTS;
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
          <span className={styles.eyebrow}>The Journey</span>
          <h2 className={styles.title}>29 Years in the Making</h2>
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
