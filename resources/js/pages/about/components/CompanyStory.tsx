import React from 'react';
import styles from './CompanyStory.module.scss';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types/shared';

interface CompanyStoryProps {
  className?: string;
}

export default function CompanyStory({ className = "" }: CompanyStoryProps) {
  const { siteContent, name } = usePage<SharedData>().props;
  return (
    <section className={`${styles.companyStory} ${className}`}>
      <div className={styles.container}>
        <div className={styles.contentGrid}>
          {/* Left Column - Text Content */}
          {
            siteContent && siteContent.about_us && siteContent.about_us.length > 10 && (
              <div className={styles.textColumn}>
                <h2 className={styles.sectionTitle}>Our Story</h2>
                <div className={styles.storyContent}>
                  <div className={styles.paragraph} dangerouslySetInnerHTML={{__html: siteContent.about_us}} />
                </div>
              </div>
            )
          }

          {/* Right Column - Image */}
          {
            siteContent && siteContent.about_image && (
              <div className={styles.imageColumn}>
                <div className={styles.imageContainer}>
                  <img
                    src={siteContent.about_image}
                    alt={`About ${siteContent && siteContent.site_name ? siteContent.site_name : name}`}
                    className={styles.storyImage}
                  />
                </div>
              </div>
            )
          }
        </div>
      </div>
    </section>
  );
}
