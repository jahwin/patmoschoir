import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { IEventDetails } from '../events/types/IEvent';
import Button from '@/components/shared/Button';
import PublicLayout from '@/components/layouts/public-layout';
import styles from "../events/style.module.scss";
import { GET_EVENT_ITEM_URL } from '@/types/shared/urls';

interface ApiResponse {
  status: string;
  message: string;
  return: IEventDetails;
}

interface EventPageProps {
  slug: string;
}

export default function EventPage({ slug }: EventPageProps) {
  const [eventData, setEventData] = useState<IEventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(GET_EVENT_ITEM_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            slug: slug,
            query: ""
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        if (data.status === 'ok' && data.return) {
          setEventData(data.return);
        } else {
          throw new Error(data.message || 'Event not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching event data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [slug]);

  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `https://cagura-assets.b-cdn.net/assets/uploaded/${imagePath}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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

  const formatCurrency = (amount: number, currency: string) => {
    return Math.round(amount).toLocaleString('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    });
  };

  const isEventEnded = (endTime: string) => {
    const now = new Date();
    const eventEndTime = new Date(endTime);
    return now > eventEndTime;
  };

  if (loading) {
    return (
      <PublicLayout title="Event" subtitle="Loading..." description="Loading event data...">
        <div className={styles.eventPage}>
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Loading event data...</p>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (error) {
    return (
      <PublicLayout title="Event" subtitle="Error" description="Error loading event">
        <div className={styles.eventPage}>
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>⚠️</div>
            <h2 className={styles.errorTitle}>Error Loading Event</h2>
            <p className={styles.errorMessage}>{error}</p>
            <button
              className={styles.retryButton}
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
            <button
              className={styles.backButton}
              onClick={() => router.visit('/events')}
            >
              Back to Events
            </button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (!eventData) {
    return (
      <PublicLayout title="Event" subtitle="Not Found" description="Event not found">
        <div className={styles.eventPage}>
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>📅</div>
            <h2 className={styles.errorTitle}>Event Not Found</h2>
            <p className={styles.errorMessage}>The requested event could not be found.</p>
            <button
              className={styles.backButton}
              onClick={() => router.visit('/events')}
            >
              Back to Events
            </button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <>
      <Head title={eventData.title} />
      <PublicLayout
        title={eventData.title.toLowerCase()}
        subtitle="Event Details"
      >
        <div className={styles.eventPage}>

          <section className={styles.eventDetails}>
            <div className={styles.container}>
              <div className={styles.detailsGrid}>
                <div className={styles.leftColumn}>
                  <div className={styles.eventImageContainer}>
                    <img
                      src={getImageUrl(eventData.coverImage)}
                      alt={eventData.title}
                      className={styles.eventImage}
                    />
                  </div>

                  <div className={styles.detailsContent}>
                    <h2 className={styles.sectionTitle}>About This Event</h2>
                    <div
                      className={styles.eventDescription}
                      dangerouslySetInnerHTML={{ __html: eventData.description }}
                    />

                    <div className={styles.eventCategory}>
                      <span className={styles.categoryLabel}>Category:</span>
                      <span className={styles.categoryValue}>{eventData.category}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Event Meta and Ticket Packages */}
                <div className={styles.rightColumn}>
                  {/* Event Meta Information */}
                  <div className={styles.eventMetaCard}>
                    <h2 className={styles.sectionTitle}>Event Details</h2>
                    <div className={styles.eventMeta}>
                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Date</span>
                        <span className={styles.metaValue}>{formatDate(eventData.startTime)}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Time</span>
                        <span className={styles.metaValue}>{formatTime(eventData.startTime)} - {formatTime(eventData.endTime)}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Venue</span>
                        <span className={styles.metaValue}>{eventData.venue}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Location</span>
                        <span className={styles.metaValue}>{eventData.location}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Organizer</span>
                        <span className={styles.metaValue}>{eventData.organizers}</span>
                      </div>
                    </div>
                  </div>

                  {/* Ticket Packages or Event Ended Message */}
                  {isEventEnded(eventData.endTime) ? (
                    <div className={styles.eventEndedSection}>
                      <h2 className={styles.sectionTitle}>Event Status</h2>
                      <div className={styles.eventEndedCard}>
                        <h3 className={styles.endedTitle}>Event Has Ended</h3>
                        <p className={styles.endedMessage}>
                          This event ended on {formatDate(eventData.endTime)} at {formatTime(eventData.endTime)}.
                          Thank you for your interest!
                        </p>
                      </div>
                    </div>
                  ) : (
                    eventData.packages && eventData.packages.length > 0 && (
                      <div className={styles.ticketSection}>
                        <h2 className={styles.sectionTitle}>Ticket Packages</h2>
                        <div className={styles.ticketPackages}>
                          {eventData.packages.map((pkg, index) => (
                            <div key={index} className={styles.ticketPackage}>
                              <div className={styles.packageHeader}>
                                <h3 className={styles.packageName}>{pkg.seatType.toLowerCase()}</h3>
                                <div className={styles.packagePrice}>
                                  {formatCurrency(pkg.amount, pkg.currency)}
                                </div>
                              </div>
                              <Button
                                variant="primary"
                                className={styles.buyButton}
                                onClick={() => {
                                  console.log('Buy ticket:', pkg);
                                }}
                              >
                                Buy Ticket
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </PublicLayout>
    </>
  );
}
