import { motion } from "motion/react";
import Styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <motion.footer
      className={Styles.footer}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={Styles.inner}>
        <motion.p
          className={Styles.wordmark}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Patmos Choir
        </motion.p>

        <motion.p
          className={Styles.verse}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Worship. Community. Purpose.
        </motion.p>

        <motion.div
          className={Styles.line}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />

        <motion.p
          className={Styles.copy}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          &copy; {new Date().getFullYear()} Patmos Choir. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
}
