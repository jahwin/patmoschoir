import React from 'react';
import styles from './ShowsSection.module.scss';

interface Show {
  id: number;
  show_date: string | null;
  venue: string;
  city: string;
  state: string;
  title: string;
  ticket_url: string | null;
  created_at: string;
  updated_at: string;
}

interface ShowsSectionProps {
  shows: Show[];
  className?: string;
}

const formatShowDate = (dateString: string | null) => {
  if (!dateString) {
    return 'TBA';
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).toUpperCase();
};

export default function ShowsSection({ shows, className = '' }: ShowsSectionProps) {
  return (
    <section id="tours" className={`${styles.showsSection} ${className}`}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>BOOK TICKETS</p>
          <h2 className={styles.sectionTitle}>TOURS</h2>
        </div>

        <div className={styles.showsTable}>
          {shows.length === 0 ? (
            <div className={styles.emptyState}>
              <span>No shows announced yet.</span>
              <span className={styles.soonBadge}>SOON</span>
            </div>
          ) : shows.map((show) => {
            const location = [show.city, show.state].filter(Boolean).join(', ');
            const ticketLink = show.ticket_url?.trim();

            return (
              <div key={show.id} className={styles.showRow}>
                <div className={styles.showDate}>{formatShowDate(show.show_date)}</div>
                <div className={styles.showDetails}>
                  <div className={styles.venue}>{show.venue}</div>
                  <div className={styles.title}>{show.title}</div>
                </div>
                <div className={styles.location}>{location}</div>
                <div className={styles.action}>
                  {ticketLink ? (
                    <a
                      href={ticketLink}
                      className={styles.ticketButton}
                      target={ticketLink.startsWith('http') ? '_blank' : undefined}
                      rel={ticketLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      TICKETS
                    </a>
                  ) : (
                    <span className={styles.soonBadge}>SOON</span>
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
