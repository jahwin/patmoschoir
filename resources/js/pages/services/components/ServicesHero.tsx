import React from 'react';
import styles from './ServicesHero.module.scss';

interface ServicesHeroProps {
  className?: string;
}

export default function ServicesHero({ className = "" }: ServicesHeroProps) {
  return (
    <section className={`${styles.servicesHero} ${className}`}>
      {/* Background Image */}
      <div className={styles.backgroundImage}>
        <div className={styles.backgroundOverlay}></div>
      </div>

      {/* Hero Content */}
      <div className={styles.heroContent}>
        <div className={styles.container}>
          <div className={styles.textContent}>
            <h1 className={styles.headline}>
              OUR SERVICES
            </h1>
            <p className={styles.subtitle}>
              Comprehensive Architectural Solutions
            </p>
            <p className={styles.description}>
              From concept to completion, we offer a full range of architectural 
              services designed to bring your vision to life. Our expertise spans 
              residential, commercial, and sustainable design solutions.
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
            <span className={styles.breadcrumbCurrent}>Services</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
