import React from 'react';
import styles from './FAQHero.module.scss';

interface FAQHeroProps {
  className?: string;
}

export default function FAQHero({ className = "" }: FAQHeroProps) {
  return (
    <section className={`${styles.faqHero} ${className}`}>
      {/* Background Image */}
      <div className={styles.backgroundImage}>
        <div className={styles.backgroundOverlay}></div>
      </div>

      {/* Hero Content */}
      <div className={styles.heroContent}>
        <div className={styles.container}>
          <div className={styles.textContent}>
            <h1 className={styles.headline}>
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <p className={styles.subtitle}>
              Get Answers to Common Questions
            </p>
            <p className={styles.description}>
              Find answers to the most commonly asked questions about our architectural 
              services, design process, and project timelines. Can't find what you're 
              looking for? Contact us directly.
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.container}>
          <nav className={styles.breadcrumbNav}>
            <a href="/architecture" className={styles.breadcrumbLink}>Home</a>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>FAQ</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
