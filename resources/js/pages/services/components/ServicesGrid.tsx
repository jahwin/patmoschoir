import React from 'react';
import styles from './ServicesGrid.module.scss';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  inclusions: string;
  text: string | null;
  created_at: string;
  updated_at: string;
}

interface ServicesGridProps {
  services: Service[];
  className?: string;
}

export default function ServicesGrid({ services, className = "" }: ServicesGridProps) {
  // Helper function to parse inclusions string into array
  const parseInclusions = (inclusions: string): string[] => {
    if (!inclusions) return [];
    
    // Remove HTML tags and split by comma
    const cleanInclusions = inclusions.replace(/<[^>]*>/g, '').trim();
    return cleanInclusions.split(',').map(item => item.trim()).filter(item => item.length > 0);
  };

  // Default service icon
  const defaultIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  );

  return (
    <section className={`${styles.servicesGrid} ${className}`}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Services</h2>
          <p className={styles.sectionDescription}>
            We provide comprehensive architectural solutions tailored to your needs. 
            From initial concept to final construction, our team delivers excellence at every stage.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service) => {
            const inclusions = parseInclusions(service.inclusions);
            
            return (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.cardImage}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className={styles.serviceImage}
                  />
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  
                  {inclusions.length > 0 && (
                    <div className={styles.serviceFeatures}>
                      <h4 className={styles.featuresTitle}>What's Included:</h4>
                      <ul className={styles.featuresList}>
                        {inclusions.map((inclusion, index) => (
                          <li key={index} className={styles.featureItem}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M9 12l2 2 4-4"/>
                              <circle cx="12" cy="12" r="10"/>
                            </svg>
                            {inclusion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.text && (
                    <div className={styles.additionalText}>
                      <div dangerouslySetInnerHTML={{ __html: service.text }} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
