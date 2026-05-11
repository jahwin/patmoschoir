import React from 'react';
import styles from './ServicesProcess.module.scss';

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ServicesProcessProps {
  className?: string;
}

export default function ServicesProcess({ className = "" }: ServicesProcessProps) {
  const processSteps: ProcessStep[] = [
    {
      id: 1,
      title: "Initial Consultation",
      description: "We begin with a comprehensive consultation to understand your vision, requirements, and project goals.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    },
    {
      id: 2,
      title: "Concept Development",
      description: "Our team creates initial design concepts and 3D visualizations to bring your vision to life.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
        </svg>
      )
    },
    {
      id: 3,
      title: "Design Development",
      description: "We refine the design based on your feedback and develop detailed architectural plans and specifications.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      id: 4,
      title: "Construction Documentation",
      description: "We prepare comprehensive construction documents, permits, and coordinate with contractors and suppliers.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
      )
    },
    {
      id: 5,
      title: "Construction Administration",
      description: "We oversee the construction process to ensure quality, adherence to plans, and timely completion.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
      )
    }
  ];

  return (
    <section className={`${styles.servicesProcess} ${className}`}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Process</h2>
          <p className={styles.sectionDescription}>
            We follow a structured approach to ensure your project is delivered 
            on time, on budget, and exceeds your expectations.
          </p>
        </div>

        <div className={styles.processSteps}>
          {processSteps.map((step, index) => (
            <div key={step.id} className={styles.stepCard}>
              <div className={styles.stepNumber}>{index + 1}</div>
              <div className={styles.stepIcon}>
                {step.icon}
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
              {index < processSteps.length - 1 && (
                <div className={styles.stepConnector}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9,18 15,12 9,6"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
