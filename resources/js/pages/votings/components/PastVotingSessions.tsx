import React, { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import EventCard from '@/components/shared/EventCard';
import { IEvent } from '../../events/types/IEvent';
import styles from './PastVotingSessions.module.scss';
import { GET_PAST_EVENTS_URL } from '@/types/shared/urls';
import { SharedData } from '@/types/shared';

interface PastVotingSessionsProps {
  className?: string;
}

export default function PastVotingSessions({ className = "" }: PastVotingSessionsProps) {
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
            origindomain: "kalisimbievents.com"
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
    router.visit(`/voting/${event.slug}`);
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

  if (loading) {
    return (
      <section className={`${styles.pastVotingSessions} ${className}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>PAST VOTING SESSIONS</h2>
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`${styles.pastVotingSessions} ${className}`}>
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
    );
  }

  if (events.length === 0) {
    return (
      <section className={`${styles.pastVotingSessions} ${className}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>PAST VOTING SESSIONS</h2>
          <div className={styles.emptyContainer}>
            <div className={styles.emptyIcon}>📊</div>
            <h3 className={styles.emptyTitle}>No Events Found</h3>
            <p className={styles.emptyMessage}>No past events are currently available.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.pastVotingSessions} ${className}`}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>PAST VOTING SESSIONS</h2>
        
        <div className={styles.sessionsContainer}>
          <div className={styles.sessionsScroll}>
            {events.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                image={getImageUrl(event.coverImage)}
                status="ended"
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
  );
}
