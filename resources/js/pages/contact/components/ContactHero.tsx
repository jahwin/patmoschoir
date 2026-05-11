import React from 'react';
import styles from './ContactHero.module.scss';

interface ContactHeroProps {
  className?: string;
}

export default function ContactHero({ className = "" }: ContactHeroProps) {
  return (
    <section className={`${styles.contactHero} ${className}`}>
      {/* Background Image */}
      <div className={styles.backgroundImage}>
        <div className={styles.backgroundOverlay}></div>
      </div>

      {/* Hero Content */}
      <div className={styles.heroContent}>
        <div className={styles.container}>
          <div className={styles.textContent}>
            <h1 className={styles.headline}>
              GET IN TOUCH
            </h1>
            <p className={styles.subtitle}>
              Let's Start Your Project
            </p>
            <p className={styles.description}>
              Ready to bring your architectural vision to life? Contact our team 
              of experts for a consultation and let's discuss how we can help 
              transform your ideas into reality.
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.container}>
          <nav className={styles.breadcrumbNav}>
            <a href="/kalisimbi" className={styles.breadcrumbLink}>Home</a>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>Contact</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
