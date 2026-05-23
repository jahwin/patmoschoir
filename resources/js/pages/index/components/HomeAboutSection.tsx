import { motion } from "motion/react";
import { Link } from "@inertiajs/react";
import styles from "./HomeAboutSection.module.scss";
import img2 from "../../../../assets/patmos/4.JPG";
import img3 from "../../../../assets/patmos/5.JPG";
import img6 from "../../../../assets/patmos/9.jpeg";
import type { AboutData } from "../index";

interface HomeAboutSectionProps {
  about: AboutData;
}

type Milestone = { year: string; title?: string; text: string };

/** Show at most 4 timeline points: start, mid points, and last. */
function pickTimelineMilestones(items: Milestone[], max = 4): Milestone[] {
  const n = items.length;
  if (n <= max) return items;

  const indices = new Set<number>([0, n - 1]);
  const middleSlots = max - 2;

  for (let i = 1; i <= middleSlots; i++) {
    indices.add(Math.round((i * (n - 1)) / (middleSlots + 1)));
  }

  return [...indices]
    .sort((a, b) => a - b)
    .map((index) => items[index]);
}

export default function HomeAboutSection({ about }: HomeAboutSectionProps) {
  const mainImage = about.image || img2;
  const secondaryImage = about.subimage || img3;
  const posterImage = about.poster || img6;

  const milestones = (about.storyline ?? [])
    .filter((s) => s.title?.trim() || s.description?.trim() || s.year?.trim())
    .map((s) => ({
      year: s.year?.trim() || "",
      title: s.title?.trim(),
      text: s.description?.trim() || "",
    }));

  const timelineMilestones = pickTimelineMilestones(milestones);
  const firstStorylineYear = milestones[0]?.year;

  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.imageStack}>
            <motion.div
              className={`${styles.imgFrame} ${styles.imgMain}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65 }}
            >
              <img src={mainImage} alt="Patmos Choir performing" loading="lazy" />
            </motion.div>

            <motion.div
              className={`${styles.imgFrame} ${styles.imgSecondary}`}
              initial={{ opacity: 0, x: -20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: 0.15 }}
            >
              <img src={secondaryImage} alt="Patmos Choir in worship" loading="lazy" />
            </motion.div>

            {firstStorylineYear && (
              <motion.div
                className={styles.yearBadge}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className={styles.yearBadgeYear}>{firstStorylineYear}</span>
                <span className={styles.yearBadgeLabel}>Est.</span>
              </motion.div>
            )}
          </div>

          <div className={styles.content}>
            <motion.span
              className={styles.eyebrow}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Story
            </motion.span>

            {about.title?.trim() && (
              <motion.h2
                className={styles.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.08 }}
              >
                {about.title}
              </motion.h2>
            )}

            {about.text?.trim() && (
              <motion.p
                className={styles.body}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.14 }}
              >
                {about.text}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/about" className="btn">Read the Full Story</Link>
            </motion.div>
          </div>
        </div>

        {timelineMilestones.length > 0 && (
          <motion.div
            className={styles.timeline}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {timelineMilestones.map((m, i) => (
              <div
                key={`${m.year}-${m.title ?? ""}-${i}`}
                className={styles.milestone}
              >
                <div className={styles.milestoneDot} />
                {m.year && <span className={styles.milestoneYear}>{m.year}</span>}
                {(m.title || m.text) && (
                  <p className={styles.milestoneText}>
                    {m.title && <strong>{m.title}: </strong>}
                    {m.text}
                  </p>
                )}
              </div>
            ))}
          </motion.div>
        )}

        <motion.div
          className={styles.accentImg}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <img src={posterImage} alt="Patmos Choir together" style={{ objectPosition: "center" }} loading="lazy" />
          <div className={styles.accentImgOverlay} />
          <p className={styles.accentCaption}>Patmos Choir — Kigali, Rwanda</p>
        </motion.div>
      </div>
    </section>
  );
}
