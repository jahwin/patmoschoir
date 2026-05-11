import React from 'react';
import styles from './AboutSection.module.scss';
import { Link, usePage } from '@inertiajs/react';
import Button from '@/components/shared/Button';
import { ArrowRightIcon } from 'lucide-react';
import { SharedData } from '@/types/shared';

interface AboutSectionProps {
  className?: string;
}

export default function AboutSection({ className = "" }: AboutSectionProps) {
  const { siteContent, name } = usePage<SharedData>().props;
  const backgroundImage = siteContent?.home_about_background_image;
  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.85)), url(${backgroundImage})`,
      }
    : undefined;

  return (
    <section
      className={`${styles.aboutSection} ${backgroundImage ? styles.sectionWithBackground : ''} ${className}`}
      style={backgroundStyle}
    >
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>MEET {siteContent && siteContent.site_name ? siteContent.site_name : name}</h2>

        {
          siteContent && siteContent.about_text && (
            <div className={styles.contentGrid}>
              {/* Left Column - Text Content */}
              <div className={styles.textColumn}>
                <div className={styles.textContent}>
                  <p className={styles.paragraph}>
                    {siteContent.about_text}
                  </p>

                  <Link
                    className={styles.aboutLink}
                    href="/about"
                  >
                    <Button>
                      About Us
                      <ArrowRightIcon className={styles.arrowIcon} />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className={styles.imageColumn}>
                <div className={styles.imageContainer}>
                  <img
                    src={siteContent.about_image || undefined}
                    alt={`About ${siteContent && siteContent.site_name ? siteContent.site_name : name}`}
                    className={styles.aboutImage}
                  />
                </div>
              </div>
            </div>
          )
        }
      </div>
    </section>
  );
}
