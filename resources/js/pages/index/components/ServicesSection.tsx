import React from 'react';
import { Link } from '@inertiajs/react';
import styles from './ServicesSection.module.scss';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string | null;
  inclusions: string;
  text: string | null;
  created_at: string;
  updated_at: string;
}

interface ServicesSectionProps {
  services: Service[];
  className?: string;
}

export default function ServicesSection({ services, className = "" }: ServicesSectionProps) {

  return (
    <section className={`${styles.servicesSection} ${className}`}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>OUR SERVICES</h2>
        
        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <div key={service.id} className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              <div className={styles.serviceNumber}>
                {String(service.id).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.sectionFooter}>
          <Link href="/services" className={styles.viewAllButton}>
            View All Services
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12,5 19,12 12,19"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
