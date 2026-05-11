import { motion } from "motion/react";
import { Link } from "@inertiajs/react";
import styles from "./HomeAboutSection.module.scss";
import img2 from "../../../../assets/patmos/4.JPG";
import img3 from "../../../../assets/patmos/5.JPG";
import img6 from "../../../../assets/patmos/9.jpeg";

const MILESTONES = [
  { year: "1996", text: "Friends reunited in Kigali sing at a wedding — the spark that started it all." },
  { year: "Early Days", text: "More voices join. A singing group grows into a full choir." },
  { year: "The Name", text: "A member brings the name \"Patmos\" — from the island in Scripture — and all agree." },
  { year: "Today", text: "29 years of ministry: churches, crusades, schools, homes, and wherever God calls." },
];

export default function HomeAboutSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.layout}>
          {/* Left — images */}
          <div className={styles.imageStack}>
            <motion.div
              className={`${styles.imgFrame} ${styles.imgMain}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65 }}
            >
              <img src={img2} alt="Patmos Choir performing" loading="lazy" />
            </motion.div>

            <motion.div
              className={`${styles.imgFrame} ${styles.imgSecondary}`}
              initial={{ opacity: 0, x: -20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: 0.15 }}
            >
              <img src={img3} alt="Patmos Choir in worship" loading="lazy" />
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

          {/* Right — story */}
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

            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              Born of Friendship,<br />Sustained by Grace
            </motion.h2>

            <motion.p
              className={styles.body}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.14 }}
            >
              In 1996, a group of friends who had shared school halls in DRC came together in
              Kigali to sing at a wedding. What began as one song became a calling. More voices
              joined; friendships deepened. They decided they were more than a singing group —
              they were a choir. And a name was found in Scripture: <em>Patmos</em>.
            </motion.p>

            <motion.p
              className={styles.body}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Through joy and loss, sickness and harvest, Patmos Choir has never ceased to
              minister. They go to churches and crusades, but also to schools, weddings, homes
              of the grieving, and bedsides of those too weak to attend worship. Wherever the
              need is, their voices follow.
            </motion.p>

            <motion.blockquote
              className={styles.pullQuote}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              &ldquo;Well done, faithful servants&rdquo; — the words they live toward. Matthew&nbsp;25:23
            </motion.blockquote>

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

        {/* Timeline */}
        <motion.div
          className={styles.timeline}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {MILESTONES.map((m, i) => (
            <div key={i} className={styles.milestone}>
              <div className={styles.milestoneDot} />
              <span className={styles.milestoneYear}>{m.year}</span>
              <p className={styles.milestoneText}>{m.text}</p>
            </div>
          ))}
        </motion.div>

        {/* Bottom accent image */}
        <motion.div
          className={styles.accentImg}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <img src={img6} alt="Patmos Choir together" loading="lazy" />
          <div className={styles.accentImgOverlay} />
          <p className={styles.accentCaption}>
            Patmos Choir — Kigali, Rwanda
          </p>
        </motion.div>

      </div>
    </section>
  );
}
