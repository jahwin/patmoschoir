import React from 'react';
import styles from './ContactMap.module.scss';

interface ContactMapProps {
  className?: string;
}

export default function ContactMap({ className = "" }: ContactMapProps) {
  return (
    <section className={`${styles.contactMap} ${className}`}>
      <div className={styles.container}>
        <div className={styles.mapHeader}>
          <h2 className={styles.mapTitle}>Find Us</h2>
          <p className={styles.mapDescription}>
            Visit our office in the heart of Toronto's design district. 
            We're easily accessible by public transit and have parking available.
          </p>
        </div>

        <div className={styles.mapContainer}>
          <div className={styles.mapPlaceholder}>
            <div className={styles.mapIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h3 className={styles.mapTitle}>Interactive Map</h3>
            <p className={styles.mapText}>
              Click to view our location on Google Maps
            </p>
            <a 
              href="https://maps.google.com/?q=123+Architecture+Street+Toronto+ON+M5V+3A8"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapButton}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15,3 21,3 21,9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Open in Google Maps
            </a>
          </div>
        </div>

        <div className={styles.locationDetails}>
          <div className={styles.locationCard}>
            <div className={styles.locationIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div className={styles.locationContent}>
              <h3 className={styles.locationTitle}>Office Location</h3>
              <p className={styles.locationAddress}>
                123 Architecture Street<br />
                Toronto, ON M5V 3A8<br />
                Canada
              </p>
            </div>
          </div>

          <div className={styles.locationCard}>
            <div className={styles.locationIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
            </div>
            <div className={styles.locationContent}>
              <h3 className={styles.locationTitle}>Business Hours</h3>
              <p className={styles.locationAddress}>
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>

          <div className={styles.locationCard}>
            <div className={styles.locationIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className={styles.locationContent}>
              <h3 className={styles.locationTitle}>Parking</h3>
              <p className={styles.locationAddress}>
                Free parking available<br />
                Underground garage access<br />
                Street parking nearby
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
