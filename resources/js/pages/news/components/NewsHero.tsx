import React from 'react';
import styles from './NewsHero.module.scss';

interface NewsHeroProps {
  className?: string;
}

export default function NewsHero({ className = "" }: NewsHeroProps) {
  return (
    <section className={`${styles.newsHero} ${className}`}>
      {/* Background Image */}
      <div className={styles.backgroundImage}>
        <div className={styles.backgroundOverlay}></div>
      </div>

      {/* Hero Content */}
      <div className={styles.heroContent}>
        <div className={styles.container}>
          <div className={styles.textContent}>
            <h1 className={styles.headline}>
              NEWS & BLOG
            </h1>
            <p className={styles.subtitle}>
              Stay Updated with Latest Insights
            </p>
            <p className={styles.description}>
              Discover the latest trends in architecture, design innovations, 
              project showcases, and industry insights from our expert team.
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
            <span className={styles.breadcrumbCurrent}>News</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
