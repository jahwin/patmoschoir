import React from 'react';
import CandidateCard from './CandidateCard';
import styles from './VotingCategory.module.scss';

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

interface VotingCategoryProps {
  category: {
    id: number;
    name: string;
    description: string;
    candidates: Candidate[];
  };
  onVote: (candidateId: number) => void;
  votedCandidates: number[];
  className?: string;
}

export default function VotingCategory({ 
  category, 
  onVote, 
  votedCandidates, 
  className = "" 
}: VotingCategoryProps) {
  return (
    <section className={`${styles.votingCategory} ${className}`}>
      <div className={styles.container}>
        <div className={styles.categoryHeader}>
          <h2 className={styles.categoryTitle}>{category.name}</h2>
          <p className={styles.categoryDescription}>{category.description}</p>
        </div>

        <div className={styles.candidatesGrid}>
          {category.candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onVote={onVote}
              hasVoted={votedCandidates.includes(candidate.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
