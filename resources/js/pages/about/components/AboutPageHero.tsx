import React from 'react';
import styles from './AboutPageHero.module.scss';

interface AboutPageHeroProps {
  className?: string;
}

export default function AboutPageHero({ className = "" }: AboutPageHeroProps) {
  return (
    <section className={`${styles.aboutHero} ${className}`}>
      {/* Background Image */}
      <div className={styles.backgroundImage}>
        <div className={styles.backgroundOverlay}></div>
      </div>

      {/* Hero Content */}
      <div className={styles.heroContent}>
        <div className={styles.container}>
          <div className={styles.textContent}>
            <h1 className={styles.headline}>
              ABOUT BAUEN
            </h1>
            <p className={styles.subtitle}>
              Crafting Tomorrow's Architecture Today
            </p>
            <p className={styles.description}>
              We are a leading architecture and design firm dedicated to creating innovative, 
              sustainable, and inspiring spaces that transform communities and enhance lives.
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
            <span className={styles.breadcrumbCurrent}>About</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
