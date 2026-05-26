import { motion } from "motion/react";
import styles from "./OurStoryOrigin.module.scss";
import img4 from "../../../../assets/patmos/4.JPG";
import img5 from "../../../../assets/patmos/5.JPG";
import { AboutData } from "../index";

interface Props { about: AboutData }

/** Split text into [beside-poster, col-1-below, col-2-below].
 *  Normalises the raw string first (collapses \n into spaces) so CMS
 *  line-per-sentence storage doesn't create single-sentence chunks.
 *  First chunk targets ~40% of characters; remaining two split at ~50% each. */
function splitIntoThree(raw: string): [string, string | null, string | null] {
  // Normalise: collapse any newline sequences into a single space
  const text = raw.replace(/\n+/g, ' ').replace(/\s{2,}/g, ' ').trim();

  const findCut = (str: string, ratio: number): number => {
    const pos = Math.floor(str.length * ratio);
    // prefer a sentence end (". ") near the target position
    const after = str.indexOf('. ', pos);
    const before = str.lastIndexOf('. ', pos);
    if (after < 0 && before < 0) return -1;
    if (after < 0) return before;
    if (before < 0) return after;
    // pick whichever is closer to the target
    return (after - pos) <= (pos - before) ? after : before;
  };

  const cut1 = findCut(text, 0.40);
  if (cut1 < 0) return [text, null, null];

  const part1 = text.slice(0, cut1 + 1).trim();
  const remainder = text.slice(cut1 + 1).trim();

  const cut2 = findCut(remainder, 0.50);
  if (cut2 < 0) return [part1, remainder, null];

  return [
    part1,
    remainder.slice(0, cut2 + 1).trim(),
    remainder.slice(cut2 + 1).trim(),
  ];
}

export default function OurStoryOrigin({ about }: Props) {
  const mainImage = about.image || img4;
  const secondaryImage = about.subimage || img5;
  const titleText = about.title || null;

  const [para1, para2, para3] = about.text
    ? splitIntoThree(about.text)
    : [null, null, null];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* ── top: images left / first paragraph right ── */}
        <div className={styles.layout}>
          <div className={styles.imageStack}>
            <motion.div
              className={`${styles.imgFrame} ${styles.imgMain}`}
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65 }}
            >
              <img src={mainImage} alt="Patmos Choir performing on stage" loading="lazy" />
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

            <motion.div
              className={styles.yearBadge}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className={styles.yearBadgeYear}>1996</span>
              <span className={styles.yearBadgeLabel}>Est.</span>
            </motion.div>
          </div>

          <div className={styles.content}>
            <motion.span
              className={styles.eyebrow}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Where It Began
            </motion.span>

            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              {titleText ?? <><span>Born of Friendship,</span><br />Sustained by Grace</>}
            </motion.h2>

            {para1 && (
              <motion.p
                className={styles.body}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12 }}
              >
                {para1}
              </motion.p>
            )}
          </div>
        </div>

        {/* ── two-column continuation below the poster row ── */}
        {(para2 || para3) && (
          <motion.div
            className={styles.fullText}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
          >
            {para2 && <p className={`${styles.body} ${styles.fullTextCol}`}>{para2}</p>}
            {para3 && <p className={`${styles.body} ${styles.fullTextCol}`}>{para3}</p>}
          </motion.div>
        )}

      </div>
    </section>
  );
}
