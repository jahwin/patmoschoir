import { motion } from "motion/react";
import { usePage } from "@inertiajs/react";
import styles from "./OurStoryValues.module.scss";
import { SharedData } from "@/types/shared";
import img8 from "../../../../assets/patmos/8.jpeg";

const DEFAULT_PILLARS = [
  {
    icon: "♪",
    title: "Mission",
    body: "To glorify God through choral ministry — bringing the message of the Gospel to every place our voices can reach, regardless of the size of the stage.",
  },
  {
    icon: "✦",
    title: "Vision",
    body: "A choir whose faithfulness outlasts generations; where new voices carry the same spirit that began in 1996, pointing all who hear toward Christ.",
  },
  {
    icon: "◎",
    title: "Values",
    body: "Integrity in worship. Humility in service. Unity among members. Devotion before performance. We serve people, not platforms.",
  },
];

export default function OurStoryValues() {
  const { siteContent } = usePage<SharedData>().props;

  const pillars = [
    {
      icon: "♪",
      title: "Mission",
      body: siteContent?.mission || DEFAULT_PILLARS[0].body,
    },
    {
      icon: "✦",
      title: "Vision",
      body: siteContent?.vision || DEFAULT_PILLARS[1].body,
    },
    {
      icon: "◎",
      title: "Values",
      body: DEFAULT_PILLARS[2].body,
    },
  ];

  return (
    <section className={styles.section}>
      <div
        className={styles.bg}
        style={{ backgroundImage: `url(${img8})` }}
        aria-hidden="true"
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className={styles.eyebrow}>What We Stand For</span>
          <h2 className={styles.title}>Mission, Vision & Values</h2>
        </motion.div>

        <div className={styles.cards}>
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <span className={styles.cardIcon}>{pillar.icon}</span>
              <h3 className={styles.cardTitle}>{pillar.title}</h3>
              <p className={styles.cardBody}>{pillar.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
