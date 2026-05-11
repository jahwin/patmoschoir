import React from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '@/components/layouts/public-layout';
import styles from './style.module.scss';

export default function NotFound() {
  return (
    <PublicLayout
      title="404 - Page Not Found"
      subtitle="Oops! Something went wrong"
    >
      <div className={`${styles.notFoundPage} not-found-page`}>
        <div className={styles.container}>

          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Large 404 Number */}
            <div className={styles.errorNumber}>404</div>
            <div className={styles.errorTitle}>Page Not Found</div>

            {/* Description */}
            <div className={styles.description}>
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <Link href="/" className={styles.primaryButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={styles.buttonIcon}>
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
                Back to Home
              </Link>

              <Link href="/contact" className={styles.secondaryButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={styles.buttonIcon}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                Help Center
              </Link>
            </div>

            {/* Suggestions */}
            <div className={styles.suggestions}>
              <h3 className={styles.suggestionsTitle}>You might want to:</h3>
              <div className={styles.suggestionsList}>
                <div className={styles.suggestionItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={styles.suggestionIcon}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span>Check our sitemap</span>
                </div>
                <div className={styles.suggestionItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={styles.suggestionIcon}>
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <span>Contact support</span>
                </div>
                <div className={styles.suggestionItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={styles.suggestionIcon}>
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                  </svg>
                  <span>Return to previous page</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className={styles.decorativeElements}>
            <div className={styles.warningIcon}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
              </svg>
            </div>
            <div className={styles.circle1}></div>
            <div className={styles.circle2}></div>
            <div className={styles.circle3}></div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
