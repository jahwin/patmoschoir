import React, { useState, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { IVotingDetails } from '../votings/types/IVoting';
import { SharedData } from '@/types/shared';
import Button from '@/components/shared/Button';
import PublicLayout from '@/components/layouts/public-layout';
import LazyImage from '@/components/shared/LazyImage';
import styles from "../events/style.module.scss";
import { GET_VOTING_PAYMENT_WIDGET_URL, GET_VOTING_PRICES_URL } from '@/types/shared/urls';
import { EPayingType, IPayVoteReqDto, PaymentWidget, PricingItem, VotingPricingItem } from '@/types/shared/ICommon';
import TicketModal from '@/components/modal/TicketModal';
import PaymentModal from '@/components/modal/PaymentModal';
import { Share2 } from 'lucide-react';
import ShareModal from '@/components/shared/ShareModal';
import ParticipantCard from '@/components/shared/ParticipantCard';
import { capitalize } from '@/utils/common';

interface PricingsResponse {
  status: string;
  message: string;
  return: VotingPricingItem[];
}

interface VotingPageProps {
  slug: string;
  votingData: IVotingDetails | null;
  error: string | null;
}

export default function VotingPage({ slug, votingData: initialVotingData, error: initialError }: VotingPageProps) {
  const [countdown, setCountdown] = useState<string>('');
  const [pricingData, setPricingData] = useState<VotingPricingItem[]>([]);
  const [pricingLoading, setPricingLoading] = useState(false);
  const [showPayVoteModal, setShowPayVoteModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [participantIdToVote, setParticipantIdToVote] = useState<number>(0);
  const [participantNameToVote, setParticipantNameToVote] = useState<string>('');

  const [selectedTicket, setSelectedTicket] = useState<IPayVoteReqDto['selected_price']>(null);
  const [numberOfPeople, setNumberOfPeople] = useState<IPayVoteReqDto['selected_amount']>(1);
  const [email, setEmail] = useState<IPayVoteReqDto['email']>('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const [paymentWidget, setPaymentWidget] = useState<PaymentWidget | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCategoryData, setShareCategoryData] = useState<{ id: number, name: string } | null>(null);

  const { siteContent } = usePage<SharedData>().props;

  // Use data from props
  const votingData = initialVotingData;
  const error = initialError;

  useEffect(() => {
    window.addEventListener(
      "message",
      (event) => {
        if (event.data && event.data.type === 'PAYMENT_STATUS') {
          const status = event.data.status;
          switch (status) {
            case 'init':
              setPaymentLoading(false);
              break;
            case 'success':
              setPaymentLoading(false);
              setTimeout(() => {
                setShowPayVoteModal(true);
                setShowPaymentModal(false);
              }, 1000);
              break;
            case "failed":
              setPaymentLoading(false);
              setShowPaymentModal(true);
              break;
            case "close":
              setShowPayVoteModal(true);
              setPaymentLoading(false);
              setShowPaymentModal(false);
              break;
          }
        }
      },
      false
    );
  }, []);


  // Update countdown every second
  useEffect(() => {
    if (!votingData) return;

    const updateCountdown = () => {
      setCountdown(formatCountdown(votingData.end_time));
    };

    // Initial update
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [votingData]);

  const fetchPricingData = async (participantId: number) => {
    if (!votingData) return;

    setPricingLoading(true);

    try {
      const response = await fetch(GET_VOTING_PRICES_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'origindomain': siteContent?.origin_domain || ''
        },
        body: JSON.stringify({
          session_id: votingData?.id,
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PricingsResponse = await response.json();

      if (data.return) {
        setPricingData(data.return);
        setParticipantIdToVote(participantId);
        setShowPayVoteModal(true)
      }
    } catch (err) {
      console.error('Error fetching pricing data:', err);
    } finally {
      setPricingLoading(false);
    }
  };

  const fetchPaymentWidget = async (selectedPricing: PricingItem | VotingPricingItem) => {
    setPaymentLoading(true);
    setPaymentError(null);

    try {
      // Type guard to ensure VotingPricingItem for voting payments
      const isVotingPricingItem = (p: PricingItem | VotingPricingItem): p is VotingPricingItem => {
        return 'id' in p && 'item_index' in p;
      };

      if (!isVotingPricingItem(selectedPricing)) {
        throw new Error('Invalid pricing item type for voting payment');
      }

      const payload: IPayVoteReqDto = {
        participant_id: participantIdToVote,
        selected_price: selectedPricing.id,
        selected_amount: numberOfPeople,
        currency: selectedPricing.currency,
        ip: window.location.hostname,
        url: "/vote/participant/pay",
        amount: selectedPricing.amount * numberOfPeople,
        first_name: "",
        last_name: "",
        email: email,
        phone_number: ""
      };


      const response = await fetch(GET_VOTING_PAYMENT_WIDGET_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        // Try to get the error response body
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.text();

          // Try to parse as JSON first
          try {
            const parsedError = JSON.parse(errorData);
            if (parsedError.message) {
              errorMessage = parsedError.message;
            } else if (parsedError.status && parsedError.status === 'bad') {
              errorMessage = 'Unable to process your request. Please try again.';
            }
          } catch (jsonParseError) {
            // If it's not JSON, use the raw text
            errorMessage = errorData || errorMessage;
          }
        } catch (e) {
        }
        throw new Error(errorMessage);
      }

      const data: PaymentWidget = await response.json();

      if (data.status === 'ok' && data.iframeUrl) {
        setPaymentWidget(data);
        setShowPayVoteModal(false);
        setShowPaymentModal(true);
      } else {
        throw new Error(data.message || 'Failed to get payment widget');
      }
    } catch (error) {
      setPaymentLoading(false);
      setPaymentError(error instanceof Error ? error.message : 'Failed to get payment widget');
      // Keep the ticket modal open and show the error there instead of payment modal
      setShowPaymentModal(false);
    } finally {
      setPaymentLoading(false)
    }
  };

  const getImageUrl = (imagePath: string | null | undefined) => {
    if (!imagePath) {
      return 'https://via.placeholder.com/200x120/2a2a2a/ffffff?text=No+Image';
    }
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

  const formatVotes = (votes: string) => {
    const voteCount = parseInt(votes) || 0;
    return voteCount.toLocaleString();
  };

  const isVotingEnded = (endTime: string) => {
    const now = new Date();
    const votingEndTime = new Date(endTime);
    return now > votingEndTime;
  };

  const getCountdown = (endTime: string) => {
    const now = new Date();
    const votingEndTime = new Date(endTime);
    const timeDiff = votingEndTime.getTime() - now.getTime();

    if (timeDiff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
        ended: true
      };
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      total: timeDiff,
      ended: false
    };
  };

  const formatCountdown = (endTime: string) => {
    const countdown = getCountdown(endTime);

    if (countdown.ended) {
      return "Voting Ended";
    }

    if (countdown.days > 0) {
      return `${countdown.days}d ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`;
    } else if (countdown.hours > 0) {
      return `${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`;
    } else if (countdown.minutes > 0) {
      return `${countdown.minutes}m ${countdown.seconds}s`;
    } else {
      return `${countdown.seconds}s`;
    }
  };


  const convertToEmbedUrl = (youtubeUrl: string) => {
    if (!youtubeUrl) return '';

    // Handle different YouTube URL formats
    let videoId = '';

    // Standard YouTube watch URL: https://www.youtube.com/watch?v=VIDEO_ID
    if (youtubeUrl.includes('youtube.com/watch?v=')) {
      videoId = youtubeUrl.split('v=')[1]?.split('&')[0] || '';
    }
    // Short YouTube URL: https://youtu.be/VIDEO_ID
    else if (youtubeUrl.includes('youtu.be/')) {
      videoId = youtubeUrl.split('youtu.be/')[1]?.split('?')[0] || '';
    }
    // Already an embed URL
    else if (youtubeUrl.includes('youtube.com/embed/')) {
      return youtubeUrl;
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return youtubeUrl; // Return original if we can't parse it
  };

  const handleShareCategory = (categoryId: number, categoryName: string) => {
    setShareCategoryData({ id: categoryId, name: categoryName });
    setShowShareModal(true);
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
    setShareCategoryData(null);
  };

  if (error) {
    return (
      <PublicLayout title="Voting Session" subtitle="Error" description="Error loading voting session">
        <div className={styles.eventPage}>
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>⚠️</div>
            <h2 className={styles.errorTitle}>Error Loading Voting Session</h2>
            <p className={styles.errorMessage}>{error}</p>
            <button
              className={styles.retryButton}
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
            <button
              className={styles.backButton}
              onClick={() => router.visit('/votings')}
            >
              Back to Voting Sessions
            </button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (!votingData) {
    return (
      <PublicLayout title="Voting Session" subtitle="Not Found" description="Voting session not found">
        <div className={styles.eventPage}>
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>📊</div>
            <h2 className={styles.errorTitle}>Voting Session Not Found</h2>
            <p className={styles.errorMessage}>The requested voting session could not be found.</p>
            <button
              className={styles.backButton}
              onClick={() => router.visit('/votings')}
            >
              Back to Voting Sessions
            </button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <>
      <Head>
        <title>{capitalize(votingData.title)}</title>
      </Head>
      <PublicLayout
        title={votingData.title.toLowerCase()}
        description={votingData.description}
        tags={[
          {
            label: `${isVotingEnded(votingData.end_time) ? 'Ended' : `Ends In ${countdown}`}`,
          }
        ]}
        backgroundImage={getImageUrl(votingData.cover_image)}
      >
        <div className={styles.eventPage}>
          {votingData.intro_video && (
            <section className={styles.introVideoSectionFullWidth}>
              <div className={styles.container}>
                <div className={styles.videoContainer}>
                  <iframe
                    src={convertToEmbedUrl(votingData.intro_video)}
                    title="Voting Session Intro Video"
                    className={styles.introVideo}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </section>
          )}

          {votingData.categories && votingData.categories.length > 0 && (
            <section className={styles.votingCategories}>
              <div className={styles.container}>
                <h2 className={styles.sectionTitle}>Voting Categories</h2>
                <div className={styles.categoriesList}>
                  {votingData.categories.map((category) => (
                    <div key={category.id} className={styles.categoryCard} id={`category-${category.id}`}>
                      <div className={styles.categoryHeader}>
                        <h3 className={styles.categoryTitle}>{category.name}</h3>
                        <div className={styles.categoryMeta}>
                          <span className={styles.participantCount}>
                            {category.participants.length} participants
                          </span>
                          <span className={styles.winnersCount}>
                            {category.winners} winner{category.winners !== 1 ? 's' : ''}
                          </span>
                          <button
                            className={styles.categoryShareButton}
                            onClick={() => handleShareCategory(category.id, category.name)}
                            title="Share this category"
                            aria-label="Share this category"
                          >
                            <Share2 size={18} />
                          </button>
                        </div>
                      </div>

                      <div className={styles.participantsGrid}>
                        {category.participants.map((participant) => (

                          <ParticipantCard
                            participant={{
                              id: participant.id,
                              name: participant.name,
                              image: participant.image,
                              votes: participant.votes,
                              item_index: participant.item_index.toString(),
                              session_id: votingData.id.toString(),
                            }}
                            votingData={{
                              end_time: votingData.end_time,
                            }}
                            setParticipantNameToVote={setParticipantNameToVote}
                            fetchPricingData={fetchPricingData}
                            shareUrl={`/vote/${votingData.id}/${category.id}/${participant.slug}`}
                            shareTitle={`Share ${participant.name}`}
                            shareDescription={`Check out ${participant.name} in the ${category.name} category!`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <TicketModal
            showModal={showPayVoteModal}
            setShowModal={setShowPayVoteModal}
            selectedTicket={selectedTicket}
            setSelectedTicket={setSelectedTicket}
            numberOfPeople={numberOfPeople}
            setNumberOfPeople={setNumberOfPeople}
            email={email}
            setEmail={setEmail}
            pricingData={pricingData}
            modalText='Select Vote Package'
            contentDescription={`You are about to vote for ${participantNameToVote}`}
            payingType={EPayingType.VOTE_PAYMENT}
            paymentLoading={paymentLoading}
            paymentError={paymentError}
            setPaymentError={setPaymentError}
            fetchPaymentWidget={fetchPaymentWidget}
          />

          <PaymentModal
            showPaymentModal={showPaymentModal}
            setShowPaymentModal={setShowPaymentModal}
            paymentWidget={paymentWidget}
            paymentLoading={paymentLoading}
            paymentError={paymentError}
            pricingData={pricingData}
            selectedTicket={selectedTicket}
            fetchPaymentWidget={fetchPaymentWidget}
          />

          {/* Share Modal */}
          <ShareModal
            isOpen={showShareModal}
            onClose={handleCloseShareModal}
            url={`/category/${shareCategoryData?.name?.trim().toLowerCase().replace(/\s+/g, '-')}/${votingData?.id}`}
            title={shareCategoryData ? `Share ${shareCategoryData.name} Category` : 'Share Category'}
            description={shareCategoryData ? `Check out the "${shareCategoryData.name}" category in this voting session!` : 'Share this voting category with others!'}
          />
        </div>
      </PublicLayout>
    </>
  );
}