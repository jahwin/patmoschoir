import React from 'react';
import styles from './GalleryHero.module.scss';

interface GalleryHeroProps {
  className?: string;
}

export default function GalleryHero({ className = "" }: GalleryHeroProps) {
  return (
    <section className={`${styles.galleryHero} ${className}`}>
      {/* Background Image */}
      <div className={styles.backgroundImage}>
        <div className={styles.backgroundOverlay}></div>
      </div>

      {/* Hero Content */}
      <div className={styles.heroContent}>
        <div className={styles.container}>
          <div className={styles.textContent}>
            <h1 className={styles.headline}>
              PROJECT GALLERY
            </h1>
            <p className={styles.subtitle}>
              Explore Our Architectural Portfolio
            </p>
            <p className={styles.description}>
              Discover our diverse collection of architectural projects, from residential 
              masterpieces to commercial landmarks that define modern design excellence.
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
            <span className={styles.breadcrumbCurrent}>Gallery</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
