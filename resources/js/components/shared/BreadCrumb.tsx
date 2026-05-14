import { motion } from "motion/react";
import { usePage } from "@inertiajs/react";
import styles from "./BreadCrumb.module.scss";
import heroImg from "../../../assets/patmos/1.JPG";

interface BreadCrumbProps {
  className?: string;
  title: string;
  subtitle?: string;
  description?: string;
  tags?: { label: string }[];
  backgroundImage?: string;
}

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
};

export default function BreadCrumb({
  className = "",
  title,
  description,
  backgroundImage,
}: BreadCrumbProps) {
  const { siteContent } = usePage().props as any;
  const bg = backgroundImage || siteContent?.subimage || heroImg;

  return (
    <section className={`${styles.hero} ${className}`}>
      <div
        className={styles.heroBg}
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden="true"
      />
      <div className={styles.heroOverlay} aria-hidden="true" />

      <motion.div
        className={styles.heroContent}
        initial="initial"
        animate="animate"
        variants={{ animate: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } } }}
      >
        <motion.h1
          className={styles.title}
          variants={fadeUp}
          transition={{ duration: 0.55 }}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            className={styles.description}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
