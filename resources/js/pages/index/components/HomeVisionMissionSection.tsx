import { motion } from "motion/react";
import styles from "./HomeVisionMissionSection.module.scss";

const PILLARS = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    label: "Vision",
    title: "Hearts Transformed",
    body: "Patmos Choir envisions a world where hearts are transformed and lives are uplifted through the power of worship. Through our songs, we seek to create deep spiritual encounters that bring healing, restore hope, and draw people closer to God — reaching individuals and communities with a message of faith and love.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "Mission",
    title: "Preaching Through Song",
    body: "Our mission is to preach the Word of God through heartfelt songs of worship that touch lives and inspire change. We are committed to bringing hope, encouragement, and healing — creating moments where people can encounter God's presence. As a united choir, we strive to grow spiritually and musically, using our voices to serve, uplift, and impact communities with love and purpose.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    label: "Values",
    title: "What We Stand On",
    values: [
      { name: "Faith", desc: "Rooted in trust in God and His Word." },
      { name: "Unity", desc: "One choir, one purpose, one voice." },
      { name: "Service", desc: "Going wherever we are called to go." },
      { name: "Humility", desc: "Vessels for His glory alone." },
    ],
  },
];

const cardVariant = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

export default function HomeVisionMissionSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
        >
          <span className={styles.eyebrow}>Who We Are</span>
          <h2 className={styles.title}>Purpose & Passion</h2>
          <p className={styles.subtitle}>
            Every song we sing is a prayer. Every performance is a ministry.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {PILLARS.map((pillar, i) => (
            <motion.article
              key={pillar.label}
              className={styles.card}
              variants={cardVariant}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
            >
              <div className={styles.cardIcon}>{pillar.icon}</div>
              <span className={styles.cardLabel}>{pillar.label}</span>
              <h3 className={styles.cardTitle}>{pillar.title}</h3>
              {pillar.body && (
                <p className={styles.cardBody}>{pillar.body}</p>
              )}
              {pillar.values && (
                <ul className={styles.valuesList}>
                  {pillar.values.map((v) => (
                    <li key={v.name}>
                      <strong>{v.name}</strong>
                      <span>{v.desc}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.article>
          ))}
        </div>

        <motion.div
          className={styles.taglineRow}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <span className={styles.taglineDivider} aria-hidden="true" />
          <p className={styles.tagline}>
            &ldquo;Where worship speaks, hearts are healed, and hope is restored.&rdquo;
          </p>
          <span className={styles.taglineDivider} aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
