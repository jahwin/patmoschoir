import React from 'react';
import styles from './BreadCrumb.module.scss';
import { usePage } from '@inertiajs/react';

interface BreadCrumbProps {
  className?: string;
  title: string;
  subtitle?: string;
  description?: string;
  tags?: {
    label: string;
  }[];
  backgroundImage?: string;
}

export default function BreadCrumb({ className = "", title, subtitle, description, tags, backgroundImage = undefined }: BreadCrumbProps) {
  const { siteContent } = usePage().props as any;

  let backgroundToUse = '';
  
  if (backgroundImage) {
    backgroundToUse = backgroundImage;
  } else if (siteContent?.subimage) {
    backgroundToUse = siteContent?.subimage;
  } else {
    backgroundToUse = "https://images.unsplash.com/photo-1522158637959-30385a09e0da?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470";
  }
  return (
    <section className={`${styles.aboutHero} ${className}`}>
      {/* Background Image */}
      <div 
        className={styles.backgroundImage}
        style={{
          backgroundImage: backgroundToUse ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${backgroundToUse})` : undefined
        }}
      >
        <div className={styles.backgroundOverlay}></div>
      </div>

      {/* Hero Content */}
      <div className={styles.heroContent}>
        <div className={styles.container}>
          <div className={styles.textContent}>
            <h1 className={styles.headline}>
              {title}
            </h1>
            {
              subtitle && (
                <p className={styles.subtitle}>
                  {subtitle}
                </p>
              )
            }
            {
              description && (
                <p className={styles.description}>
                  {description}
                </p>
              )
            }

            {
              tags && tags.length > 0 && (
                <nav className={styles.breadcrumb}>
                  <div className={styles.breadcrumbNav}>
                    {
                      tags.map((tag, index) => (
                        <span className={styles.breadcrumbLink} key={index}>{tag.label}</span>
                      ))
                    }
                  </div>
                </nav>
              )
            }

          </div>
        </div>
      </div>
    </section>
  );
}
