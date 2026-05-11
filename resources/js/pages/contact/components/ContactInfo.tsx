import React from 'react';
import styles from './ContactInfo.module.scss';
import { usePage } from '@inertiajs/react';
import { PhoneIcon, MailIcon, MapPinIcon, Clock } from 'lucide-react';
import { SharedData } from '@/types/shared';

interface ContactInfoProps {
  className?: string;
}

export default function ContactInfo({ className = "" }: ContactInfoProps) {
  const { siteContent } = usePage<SharedData>().props;
  const phones: string[] = siteContent?.phones || [];
  const emails: string[] = siteContent?.emails || [];
  const address1: string | undefined = siteContent?.address || undefined;
  const address2: string | undefined = undefined;
  const businessHours: string[] = [
    'Mon-Fri: 9:00 AM - 6:00 PM',
    'Sat: 10:00 AM - 4:00 PM',
    'Sun: Closed',
  ];

  const contactMethods = [
    {
      icon: <PhoneIcon />,
      title: 'Phone',
      details: phones.length > 0 ? phones : ['+1 (000) 000-0000'],
      description: 'Call us for immediate assistance',
    },
    {
      icon: <MailIcon />,
      title: 'Email',
      details: emails.length > 0 ? emails : ['info@example.com'],
      description: 'Send us an email anytime',
    },
    {
      icon: <MapPinIcon />,
      title: 'Address',
      details: [address1 || 'Your office address', ...(address2 ? [address2] : [])],
      description: 'Visit our office',
    },
  ];

  return (
    <section className={`${styles.contactInfo} ${className}`}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Contact Information</h2>
          <p className={styles.sectionDescription}>
            Get in touch with our team through any of these channels. We're here to help 
            bring your architectural vision to life.
          </p>
        </div>

        <div className={styles.contactGrid}>
          {contactMethods.map((method, index) => (
            <div key={index} className={styles.contactCard}>
              <div className={styles.cardIcon}>
                {method.icon}
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{method.title}</h3>
                <div className={styles.cardDetails}>
                  {method.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className={styles.detailItem}>{detail}</p>
                  ))}
                </div>
                <p className={styles.cardDescription}>{method.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
