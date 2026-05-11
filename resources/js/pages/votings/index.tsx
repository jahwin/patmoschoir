import React, { useEffect, useState } from 'react';
import styles from "../events/style.module.scss";
import PublicLayout from '@/components/layouts/public-layout';
import EventCard from '@/components/shared/EventCard';
import { IVoting } from './types/IVoting';
import { Head, router, usePage } from '@inertiajs/react';
import { GET_PAST_VOTING_SESSIONS_URL, GET_VOTING_SESSIONS_URL } from '@/types/shared/urls';
import { SharedData } from '@/types/shared';

interface VotingResponse {
  status: string;
  message: string;
  return: IVoting[];
}

export default function Votings() {
  const [votings, setVotings] = useState<IVoting[]>([]);
  const [currentVotings, setCurrentVotings] = useState<IVoting[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentLoading, setCurrentLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentError, setCurrentError] = useState<string | null>(null);

  const { siteContent } = usePage<SharedData>().props;

  useEffect(() => {
    const fetchPastVotings = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(GET_PAST_VOTING_SESSIONS_URL, {
          headers: {
            origindomain: siteContent?.origin_domain || ''
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: VotingResponse = await response.json();

        if (data.status === 'ok' && data.return) {
          setVotings(data.return);
        } else {
          throw new Error(data.message || 'Failed to fetch past voting sessions');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch past voting sessions');
        console.error('Error fetching past voting sessions:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCurrentVotings = async () => {
      try {
        setCurrentLoading(true);
        setCurrentError(null);

        const response = await fetch(GET_VOTING_SESSIONS_URL, {
          headers: {
            origindomain: siteContent?.origin_domain || ""
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: VotingResponse = await response.json();

        if (data.status === 'ok' && data.return) {
          setCurrentVotings(data.return);
        } else {
          throw new Error(data.message || 'Failed to fetch current voting sessions');
        }
      } catch (err) {
        setCurrentError(err instanceof Error ? err.message : 'Failed to fetch current voting sessions');
        console.error('Error fetching current voting sessions:', err);
      } finally {
        setCurrentLoading(false);
      }
    };

    fetchPastVotings();
    fetchCurrentVotings();
  }, []);

  const handleVotingClick = (voting: IVoting) => {
    // Navigate to the specific voting session page
    router.visit(`/voting/${voting.slug}`);
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
      <Head title="Votings" />
      <PublicLayout title="Votings" subtitle="Browse our votings">
        {/* Current Voting Sessions Section */}
        {
          currentLoading && (
            <section className={`${styles.pastVotingSessions}`}>
              <div className={styles.container}>
                <h2 className={styles.sectionTitle}>CURRENT VOTING SESSIONS</h2>
                <div className={styles.loadingContainer}>
                  <div className={styles.loadingSpinner}></div>
                  <p className={styles.loadingText}>Loading current voting sessions...</p>
                </div>
              </div>
            </section>
          )
        }

        {
          currentError && (
            <section className={`${styles.pastVotingSessions}`}>
              <div className={styles.container}>
                <h2 className={styles.sectionTitle}>CURRENT VOTING SESSIONS</h2>
                <div className={styles.errorContainer}>
                  <div className={styles.errorIcon}>⚠️</div>
                  <h3 className={styles.errorTitle}>Error Loading Current Voting Sessions</h3>
                  <p className={styles.errorMessage}>{currentError}</p>
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
          !currentLoading && !currentError && currentVotings.length === 0 && (
            <section className={`${styles.pastVotingSessions}`}>
              <div className={styles.container}>
                <h2 className={styles.sectionTitle}>CURRENT VOTING SESSIONS</h2>
                <div className={styles.emptyContainer}>
                  <div className={styles.emptyIcon}>🗳️</div>
                  <h3 className={styles.emptyTitle}>No Active Voting Sessions</h3>
                  <p className={styles.emptyMessage}>No voting sessions are currently active.</p>
                </div>
              </div>
            </section>
          )
        }

        {
          !currentLoading && !currentError && currentVotings.length > 0 && (
            <div className={styles.votingPage}>
              <section className={`${styles.pastVotingSessions}`}>
                <div className={styles.container}>
                  <h2 className={styles.sectionTitle}>CURRENT VOTING SESSIONS</h2>

                  <div className={styles.sessionsContainer}>
                    <div className={styles.sessionsScroll}>
                      {currentVotings.map((voting) => (
                        <EventCard
                          key={voting.slug}
                          title={voting.title}
                          image={getImageUrl(voting.cover_image)}
                          status="active"
                          link={`/voting/${voting.slug}`}
                          description={voting.description}
                          endDate={formatDate(voting.end_time)}
                          endTime={formatTime(voting.end_time)}
                          className={styles.sessionCard}
                          onClick={() => handleVotingClick(voting)}
                          onViewEvent={() => handleVotingClick(voting)}
                          buttonText="Vote Now"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )
        }

        {/* Past Voting Sessions Section */}
        {
          loading && (
            <section className={`${styles.pastVotingSessions}`}>
              <div className={styles.container}>
                <h2 className={styles.sectionTitle}>PAST VOTING SESSIONS</h2>
                <div className={styles.loadingContainer}>
                  <div className={styles.loadingSpinner}></div>
                  <p className={styles.loadingText}>Loading voting sessions...</p>
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
                  <h3 className={styles.errorTitle}>Error Loading Voting Sessions</h3>
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
          !loading && !error && votings.length === 0 && (
            <section className={`${styles.pastVotingSessions}`}>
              <div className={styles.container}>
                <h2 className={styles.sectionTitle}>PAST VOTING SESSIONS</h2>
                <div className={styles.emptyContainer}>
                  <div className={styles.emptyIcon}>📊</div>
                  <h3 className={styles.emptyTitle}>No Voting Sessions Found</h3>
                  <p className={styles.emptyMessage}>No past voting sessions are currently available.</p>
                </div>
              </div>
            </section>
          )
        }

        {
          !loading && !error && votings.length > 0 && (
            <div className={styles.votingPage}>
              <section className={`${styles.pastVotingSessions}`}>
                <div className={styles.container}>
                  <h2 className={styles.sectionTitle}>PAST VOTING SESSIONS</h2>

                  <div className={styles.sessionsContainer}>
                    <div className={styles.sessionsScroll}>
                      {votings.map((voting) => (
                        <EventCard
                          key={voting.slug}
                          title={voting.title}
                          image={getImageUrl(voting.cover_image)}
                          status="ended"
                          link={`/voting/${voting.slug}`}
                          description={voting.description}
                          endDate={formatDate(voting.end_time)}
                          endTime={formatTime(voting.end_time)}
                          className={styles.sessionCard}
                          onClick={() => handleVotingClick(voting)}
                          onViewEvent={() => handleVotingClick(voting)}
                          buttonText="View Voting"
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
