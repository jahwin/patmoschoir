import { formatVotes, generateVotingUSSDCode, getImageUrl, isVotingEnded } from "@/utils/common"
import LazyImage from "./LazyImage"
import styles from "@/pages/events/style.module.scss"
import lazyImageStyles from "./LazyImage.module.scss"
import Button from "./Button";
import { Share2 } from 'lucide-react';
import ShareModal from './ShareModal';
import { useState } from 'react';

interface ParticipantCardProps {
  participant: {
    id: number;
    name: string;
    image: string;
    votes: string;
    item_index: string;
    session_id: string;
  },
  votingData: {
    end_time: string;
  }
  setParticipantNameToVote: (name: string) => void;
  fetchPricingData: (id: number) => void;
  shareUrl?: string;
  shareTitle?: string;
  shareDescription?: string;
}

export default function ParticipantCard({
  participant,
  votingData,
  setParticipantNameToVote,
  fetchPricingData,
  shareUrl = '',
  shareTitle = `Share ${participant.name}`,
  shareDescription = `Check out ${participant.name}!`
}: ParticipantCardProps) {
  const [showShareModal, setShowShareModal] = useState(false);

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
  };

  return (
    <div key={participant.id} className={styles.participantCard}>
      <div className={styles.participantImageContainer}>
        <LazyImage
          src={getImageUrl(participant.image)}
          alt={participant.name || 'Participant'}
          className={`${styles.participantImage} ${lazyImageStyles.participantImage}`}
        />
        <a href={`tel:${generateVotingUSSDCode(participant.session_id, participant.item_index)}`} className={styles.participantOverlay}>
          USSD: {generateVotingUSSDCode(participant.session_id, participant.item_index)}
        </a>
      </div>

      <div className={styles.participantContent}>
        <h4 className={styles.participantName}>{participant.name || 'Unknown Participant'}</h4>
        <div className={styles.voteCount}>
          <span className={styles.voteNumber}>{formatVotes(participant.votes || '0')}</span>
          <span className={styles.voteLabel}>VOTES</span>
        </div>

        <div className={styles.participantActions}>
          {!isVotingEnded(votingData.end_time) && (
            <Button
              variant="primary"
              className={styles.voteButton}
              onClick={() => {
                setParticipantNameToVote(participant.name)
                fetchPricingData(participant.id)
              }}
            >
              Vote Now
            </Button>
          )}

          <button
            className={styles.shareButton}
            onClick={handleShare}
            title="Share this participant"
          >
            <Share2 size={16} />
            {/* Share */}
          </button>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={handleCloseShareModal}
        url={shareUrl}
        title={shareTitle}
        description={shareDescription}
      />
    </div>
  )
}