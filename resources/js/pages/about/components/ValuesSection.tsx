import React from 'react';
import styles from './ValuesSection.module.scss';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types/shared';

interface ValuesSectionProps {
  className?: string;
}

export default function ValuesSection({ className = "" }: ValuesSectionProps) {
  const { siteContent } = usePage<SharedData>().props;
  const values = siteContent?.values || [];

  if (!values || values.length === 0) {
    return null;
  }

  return (
    <section className={`${styles.valuesSection} ${className}`}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Values</h2>
          <p className={styles.sectionDescription}>
            The principles that guide our work and define our commitment to excellence
          </p>
        </div>

        <div className={styles.valuesGrid}>
          {values.map((value, index) => (
            <div key={index} className={styles.valueCard}>
              <div 
                className={styles.valueIcon}
                dangerouslySetInnerHTML={{ __html: value.icon }}
              />
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueDescription}>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
