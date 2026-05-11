import React from 'react';
import styles from './MissionVision.module.scss';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types/shared';

interface MissionVisionProps {
  className?: string;
}

export default function MissionVision({ className = "" }: MissionVisionProps) {
  const { siteContent, name } = usePage<SharedData>().props;
  return (
    <>
      {
        siteContent && siteContent.mission && siteContent.vision &&  (
          <section className={`${styles.missionVision} ${className}`}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Mission & Vision</h2>
                <p className={styles.sectionDescription}>
                  Our guiding principles that drive every project and decision
                </p>
              </div>
      
              <div className={styles.contentGrid}>
                {/* Mission */}
                <div className={styles.missionCard}>
                  <div className={styles.cardIcon}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h3 className={styles.cardTitle}>Our Mission</h3>
                  <p className={styles.cardDescription}>{siteContent.mission}</p>
                </div>
      
                {/* Vision */}
                <div className={styles.visionCard}>
                  <div className={styles.cardIcon}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </div>
                  <h3 className={styles.cardTitle}>Our Vision</h3>
                  <p className={styles.cardDescription}>{siteContent.vision}</p>
                </div>
              </div>
            </div>
          </section>
        )
      }
    </>
  );
}
