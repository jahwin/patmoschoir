import React from 'react';
import styles from './ServicesCTA.module.scss';
import { useJoinMinistryModal } from '@/contexts/JoinMinistryModalContext';

interface ServicesCTAProps {
  className?: string;
}

export default function ServicesCTA({ className = "" }: ServicesCTAProps) {
  const { openModal } = useJoinMinistryModal();

  return (
    <section className={`${styles.servicesCTA} ${className}`}>
      <div className={styles.container}>
        <div className={styles.ctaContent}>
          <div className={styles.textSection}>
            <h2 className={styles.ctaTitle}>Join Us</h2>
            <p className={styles.ctaDescription}>
              Become part of our growing community and make a difference. Join us in spreading faith, hope, and love to those around us.
            </p>
          </div>

          <div className={styles.actionSection}>
            <div className={styles.ctaButtons}>
              <button 
                type="button"
                onClick={openModal}
                className={styles.primaryButton}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Join Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
