import React from 'react';
import styles from './CandidateCard.module.scss';

interface Candidate {
  id: number;
  name: string;
  image: string;
  votes: string;
  item_index: number;
  slug: string;
  session_id: number;
  category_id: number;
}

interface CandidateCardProps {
  candidate: Candidate;
  onVote: (candidateId: number) => void;
  hasVoted: boolean;
  className?: string;
}

export default function CandidateCard({
  candidate,
  onVote,
  hasVoted,
  className = ""
}: CandidateCardProps) {
  const handleVote = () => {
    if (!hasVoted) {
      onVote(candidate.id);
    }
  };

  const handleShare = () => {
    // Share functionality
    if (navigator.share) {
      navigator.share({
        title: `Vote for ${candidate.name}`,
        text: `Vote for ${candidate.name} in the voting competition!`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Generate USSD code based on the pattern from the image
  const ussdCode = `*797*50*1*${candidate.session_id}*${candidate.item_index}#`;

  return (
    <div className={`${styles.candidateCard} ${className}`}>
      <div className={styles.cardImage}>
        {/* <img
          src={`https://cagura-assets.b-cdn.net/assets/uploaded/${candidate.image}`}
          alt={candidate.name}
          className={styles.candidateImage}
        /> */}
        <div className={styles.itemIndex}>{candidate.item_index}</div>
        <div className={styles.ussdCode}>
          <a href={`tel:${ussdCode}`}>{ussdCode}</a>
        </div>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.candidateName}>{candidate.name}</h3>
        <div className={styles.voteCount}>
          <span className={styles.voteNumber}>{parseInt(candidate.votes).toLocaleString()}</span>
          <span className={styles.voteLabel}>votes</span>
        </div>

        <div className={styles.actionButtons}>
          <button
            className={`${styles.voteButton} ${hasVoted ? styles.voted : ''}`}
            onClick={handleVote}
            disabled={hasVoted}
          >
            {hasVoted ? 'VOTED' : 'VOTE NOW'}
          </button>
          <button
            className={styles.shareButton}
            onClick={handleShare}
            title="Share"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
