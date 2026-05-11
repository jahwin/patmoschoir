import React, { useState, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { IContestantDetails } from '../votings/types/IVoting';
import { SharedData } from '@/types/shared';
import PublicLayout from '@/components/layouts/public-layout';
import styles from "../events/style.module.scss";
import { GET_VOTING_PAYMENT_WIDGET_URL, GET_VOTING_PRICES_URL } from '@/types/shared/urls';
import { EPayingType, IPayVoteReqDto, PaymentWidget, PricingItem, VotingPricingItem } from '@/types/shared/ICommon';
import TicketModal from '@/components/modal/TicketModal';
import PaymentModal from '@/components/modal/PaymentModal';
import ShareModal from '@/components/shared/ShareModal';
import ParticipantCard from '@/components/shared/ParticipantCard';
import { isVotingEnded } from '@/utils/common';

interface PricingsResponse {
  status: string;
  message: string;
  return: VotingPricingItem[];
}

interface ContestantPageProps {
  slug: string;
  contestantData: IContestantDetails | null;
  error: string | null;
}

export default function ContestantPage({ slug, contestantData: initialContestantData, error: initialError }: ContestantPageProps) {
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

  const { siteContent } = usePage<SharedData>().props;

  // Extract voting_session_id, category_id, and contestant_slug from the URL
  const urlParts = slug.split('/');
  const votingSessionId = urlParts[0];
  const categoryId = urlParts[1];
  const contestantSlug = urlParts[2];

  // Use data from props
  const contestantData = initialContestantData;
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
    if (!contestantData) return;

    const updateCountdown = () => {
      setCountdown(formatCountdown(contestantData.end_time));
    };

    // Initial update
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [contestantData]);

  const fetchPricingData = async (participantId: number) => {
    if (!contestantData) return;

    setPricingLoading(true);

    try {
      const response = await fetch(GET_VOTING_PRICES_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'origindomain': siteContent?.origin_domain || ''
        },
        body: JSON.stringify({
          session_id: contestantData.id,
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
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.text();
          try {
            const parsedError = JSON.parse(errorData);
            if (parsedError.message) {
              errorMessage = parsedError.message;
            } else if (parsedError.status && parsedError.status === 'bad') {
              errorMessage = 'Unable to process your request. Please try again.';
            }
          } catch (jsonParseError) {
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
      setShowPaymentModal(false);
    } finally {
      setPaymentLoading(false)
    }
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


  const handleShareContestant = () => {
    setShowShareModal(true);
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
  };

  const handleBackToVoting = () => {
    if (contestantData) {
      router.visit(`/voting/${contestantData.title.toLowerCase().replace(/\s+/g, '-')}`);
    }
  };

  const handleBackToCategory = () => {
    if (contestantData) {
      router.visit(`/category/${contestantData.participant.category_name.toLowerCase().replace(/\s+/g, '-')}/${contestantData.id}`);
    }
  };

  if (error) {
    return (
      <PublicLayout title="Contestant" subtitle="Error" description="Error loading contestant">
        <div className={styles.eventPage}>
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>⚠️</div>
            <h2 className={styles.errorTitle}>Error Loading Contestant</h2>
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

  if (!contestantData) {
    return (
      <PublicLayout title="Contestant" subtitle="Not Found" description="Contestant not found">
        <div className={styles.eventPage}>
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>👤</div>
            <h2 className={styles.errorTitle}>Contestant Not Found</h2>
            <p className={styles.errorMessage}>The requested contestant could not be found.</p>
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

  const { participant } = contestantData;

  return (
    <>
      <Head title={participant.name} />
      <PublicLayout
        title={participant.name.toLowerCase()}
        description={`Vote for ${participant.name} in ${participant.category_name}`}
        tags={[
          {
            label: `${isVotingEnded(contestantData.end_time) ? 'Ended' : `Ends In ${countdown}`}`,
          }
        ]}
      >
        <div className={styles.eventPage}>
          {/* Back Navigation */}

          {/* Contestant Card Section */}
          <section className={styles.contestantSection}>
            <div className={styles.container}>
              <div className={styles.contestantCard}>
                <div className={styles.participantCardWrapper}>
                  <ParticipantCard
                    participant={{
                      id: participant.id,
                      name: participant.name,
                      image: participant.image,
                      votes: participant.votes || '0',
                      item_index: participant.item_index?.toString() || '0',
                      session_id: votingSessionId,
                    }}
                    votingData={{
                      end_time: contestantData.end_time,
                    }}
                    setParticipantNameToVote={setParticipantNameToVote}
                    fetchPricingData={fetchPricingData}
                    shareUrl={`/vote/${votingSessionId}/${categoryId}/${contestantSlug}`}
                    shareTitle={`Share ${participant.name}`}
                    shareDescription={`Check out ${participant.name} in the ${participant.category_name} category!`}
                  />
                </div>
              </div>
            </div>
          </section>

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
            url={`/vote/${votingSessionId}/${categoryId}/${contestantSlug}`}
            title={`Share ${participant.name}`}
            description={`Check out ${participant.name} in the ${participant.category_name} category!`}
          />
        </div>
      </PublicLayout>
    </>
  );
}
