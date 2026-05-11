import React, { useEffect, useState } from 'react';
import styles from "./style.module.scss";
import PublicLayout from '@/components/layouts/public-layout';
import EventCard from '@/components/shared/EventCard';
import { IEvent } from './types/IEvent';
import { Head, router, usePage } from '@inertiajs/react';
import { GET_PAST_EVENTS_URL } from '@/types/shared/urls';
import { SharedData } from '@/types/shared';

export default function Events() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { siteContent } = usePage<SharedData>().props;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(GET_PAST_EVENTS_URL, {
          headers: {
            origindomain: siteContent?.origin_domain || ''
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: IEvent[] = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch events');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event: IEvent) => {
    // Navigate to the specific voting session page
    router.visit(`/events/${event.slug}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `https://cagura-assets.b-cdn.net/assets/uploaded/${imagePath}`;
  };

  return (
    <>
      <Head title="Events" />
      <PublicLayout title="Events" subtitle="Browse our events" description="Browse our events and find the perfect one for you.">
        {
          loading && (
            <section className={`${styles.pastVotingSessions}`}>
              <div className={styles.container}>
                <h2 className={styles.sectionTitle}>PAST VOTING SESSIONS</h2>
                <div className={styles.loadingContainer}>
                  <div className={styles.loadingSpinner}></div>
                  <p className={styles.loadingText}>Loading events...</p>
                </div>
              </div>
            </section>
          )
        }

        {
          error && (
            <section className={`${styles.pastVotingSessions}`}>
              <div className={styles.container}>
                <h2 className={styles.sectionTitle}>PAST VOTING SESSIONS</h2>
                <div className={styles.errorContainer}>
                  <div className={styles.errorIcon}>⚠️</div>
                  <h3 className={styles.errorTitle}>Error Loading Events</h3>
                  <p className={styles.errorMessage}>{error}</p>
                  <button
                    className={styles.retryButton}
                    onClick={() => window.location.reload()}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </section>
          )
        }

        {
          !loading && !error && events.length === 0 && (
            <section className={`${styles.pastVotingSessions}`}>
              <div className={styles.container}>
                <h2 className={styles.sectionTitle}>PAST VOTING SESSIONS</h2>
                <div className={styles.emptyContainer}>
                  <div className={styles.emptyIcon}>📊</div>
                  <h3 className={styles.emptyTitle}>No Events Found</h3>
                  <p className={styles.emptyMessage}>No past events are currently available.</p>
                </div>
              </div>
            </section>
          )
        }

        {
          !loading && !error && events.length > 0 && (
            <div className={styles.votingPage}>
              <section className={`${styles.pastVotingSessions}`}>
                <div className={styles.container}>
                  <h2 className={styles.sectionTitle}>PAST EVENTS</h2>

                  <div className={styles.sessionsContainer}>
                    <div className={styles.sessionsScroll}>
                      {events.map((event) => (
                        <EventCard
                          key={event.id}
                          title={event.title}
                          image={getImageUrl(event.coverImage)}
                          status="ended"
                          link={`/events/${event.slug}`}
                          description={event.description}
                          endDate={formatDate(event.endTime)}
                          endTime={formatTime(event.endTime)}
                          className={styles.sessionCard}
                          onClick={() => handleEventClick(event)}
                          onViewEvent={() => handleEventClick(event)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )
        }
      </PublicLayout>
    </>
  );
}
