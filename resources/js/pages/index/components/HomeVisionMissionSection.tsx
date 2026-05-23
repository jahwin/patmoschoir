import { motion } from "motion/react";
import styles from "./HomeVisionMissionSection.module.scss";
import type { AboutData } from "../index";

const cardVariant = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const visionIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const missionIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const valuesIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

interface HomeVisionMissionSectionProps {
  about: AboutData;
}

export default function HomeVisionMissionSection({ about }: HomeVisionMissionSectionProps) {
  const pillars: {
    key: string;
    icon: React.ReactNode;
    label: string;
    title: string;
    body?: string;
    values?: { name: string; desc: string }[];
  }[] = [];

  if (about.vision?.trim()) {
    pillars.push({
      key: "vision",
      icon: visionIcon,
      label: "Vision",
      title: "Our Vision",
      body: about.vision.trim(),
    });
  }

  if (about.mission?.trim()) {
    pillars.push({
      key: "mission",
      icon: missionIcon,
      label: "Mission",
      title: "Our Mission",
      body: about.mission.trim(),
    });
  }

  const values = (about.values ?? [])
    .filter((v) => v.title?.trim() || v.description?.trim())
    .map((v) => ({
      name: v.title?.trim() || "Value",
      desc: v.description?.trim() || "",
    }));

  if (values.length > 0) {
    pillars.push({
      key: "values",
      icon: valuesIcon,
      label: "Values",
      title: "What We Stand On",
      values,
    });
  }

  if (pillars.length === 0) return null;

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
          {pillars.map((pillar, i) => (
            <motion.article
              key={pillar.key}
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
              {pillar.body && <p className={styles.cardBody}>{pillar.body}</p>}
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
      </div>
    </section>
  );
}
