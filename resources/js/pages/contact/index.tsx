import React from 'react';
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";
import ContactMap from "./components/ContactMap";
import styles from "./style.module.scss";
import PublicLayout from '@/components/layouts/public-layout';
import { Head } from '@inertiajs/react';

export default function Contact() {
  return (
    <>
      <Head title="Contact Us" />
      <PublicLayout title="Contact Us" subtitle="Reach Out to Our Expert Team" description="Reach out to us for any questions, project inquiries, or collaboration opportunities. Our dedicated team is here to assist you every step of the way.">
        <div className={styles.contactPage}>
          <ContactInfo />
          <ContactForm />
          {/* <ContactMap /> */}
        </div>
      </PublicLayout>
    </>
  );
}
