import PublicLayout from '@/components/layouts/public-layout';
import { Head } from '@inertiajs/react';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';
import styles from './style.module.scss';

export default function Contact() {
  return (
    <>
      <Head title="Contact — Patmos Choir" />
      <PublicLayout>
        <section className={styles.section}>
          <div className={styles.inner}>

            {/* Header */}
            <div className={styles.header}>
              <span className={styles.eyebrow}>Get in Touch</span>
              <h1 className={styles.title}>Contact Us</h1>
              <p className={styles.subtitle}>
                Whether you want to book us, partner with the ministry, or simply say hello —
                we'd love to hear from you.
              </p>
            </div>

            {/* Merged body: info left, form right */}
            <div className={styles.body}>
              <div className={styles.infoCol}>
                <ContactInfo />
              </div>
              <div className={styles.formCol}>
                <ContactForm />
              </div>
            </div>

          </div>
        </section>
      </PublicLayout>
    </>
  );
}
