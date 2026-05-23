import { motion } from "motion/react";
import styles from "./HomeContactSection.module.scss";
import ContactInfo from "@/pages/contact/components/ContactInfo";
import ContactForm from "@/pages/contact/components/ContactForm";
import type { ContactsData } from "@/utils/contactData";

interface HomeContactSectionProps {
  contacts: ContactsData;
}

export default function HomeContactSection({ contacts }: HomeContactSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.eyebrow}>Get in Touch</span>
          <h2 className={styles.title}>Contact Us</h2>
          <p className={styles.subtitle}>
            Want to book us, partner with the ministry, or just say hello? We'd love to hear from you.
          </p>
        </motion.div>

        {/* Info + Form */}
        <div className={styles.body}>
          <motion.div
            className={styles.infoCol}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ContactInfo contacts={contacts} />
          </motion.div>

          <motion.div
            className={styles.formCol}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <ContactForm />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
