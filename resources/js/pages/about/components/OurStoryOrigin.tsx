import { motion } from "motion/react";
import styles from "./OurStoryOrigin.module.scss";
import img4 from "../../../../assets/patmos/4.JPG";
import img5 from "../../../../assets/patmos/5.JPG";
import img7 from "../../../../assets/patmos/7.JPG";

export default function OurStoryOrigin() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* ── top: image left / text right ── */}
        <div className={styles.layout}>
          <div className={styles.imageStack}>
            <motion.div
              className={`${styles.imgFrame} ${styles.imgMain}`}
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65 }}
            >
              <img src={img4} alt="Patmos Choir performing on stage" loading="lazy" />
            </motion.div>

            <motion.div
              className={`${styles.imgFrame} ${styles.imgSecondary}`}
              initial={{ opacity: 0, x: -20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: 0.15 }}
            >
              <img src={img5} alt="Patmos Choir in worship" loading="lazy" />
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
              Born of Friendship,<br />Sustained by Grace
            </motion.h2>

            <motion.p
              className={styles.body}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              In 1996, a group of friends who had shared school halls in the Democratic Republic
              of Congo came together in Kigali at a wedding. Someone asked them to sing.
              They did — and something shifted. That single song was not the end of an evening;
              it was the beginning of a calling.
            </motion.p>

            <motion.p
              className={styles.body}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.18 }}
            >
              More voices joined in the weeks that followed. Friendships deepened. The group
              began to sense they were more than friends who sang together — they were a choir
              with a purpose. A name was needed. One member brought the word <em>Patmos</em>,
              drawn from the island in Scripture where John received his revelation, a place
              of exile turned into encounter. All agreed. The name was perfect.
            </motion.p>

            <motion.p
              className={styles.body}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
            >
              In the years since, Patmos Choir has never stopped. Through joy and loss,
              through sickness and harvest, through seasons of abundance and seasons of
              waiting — their voices have continued. They go to churches and crusades,
              but also to schools, weddings, homes of the grieving, and bedsides of
              those too weak to attend worship.
            </motion.p>

            {/* <motion.blockquote
              className={styles.pullQuote}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.28 }}
            >
              &ldquo;Well done, good and faithful servants&rdquo; — the words they
              live toward. Matthew&nbsp;25:23
            </motion.blockquote> */}
          </div>
        </div>

        {/* ── reverse: text left / image right ── */}
        <div className={`${styles.layout} ${styles.layoutReverse}`}>
          <div className={styles.content}>
            <motion.span
              className={styles.eyebrow}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              The Ministry Today
            </motion.span>

            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              Wherever the Need Is,<br />Their Voices Follow
            </motion.h2>

            <motion.p
              className={styles.body}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              Twenty-nine years on, Patmos Choir remains rooted in the same conviction that
              started it all: music is ministry. Not performance. Not platform. Ministry.
              Every concert is a service. Every rehearsal is preparation for an act of love.
            </motion.p>

            <motion.p
              className={styles.body}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.18 }}
            >
              The choir has grown to include voices from different generations — children of
              the original founders now sing alongside those who planted the first harmony.
              What has never changed is the heart: to bring the presence of God through song,
              to comfort the mourning, to lift the weary, and to point every listener toward
              something greater than themselves.
            </motion.p>
          </div>

          <motion.div
            className={`${styles.imgFrame} ${styles.imgFull}`}
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65 }}
          >
            <img src={img7} alt="Patmos Choir together in ministry" loading="lazy" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
