import React from 'react';
import styles from './VotingStats.module.scss';

interface VotingStatsProps {
  totalVotes: number;
  totalCandidates: number;
  votedCategories: number;
  totalCategories: number;
  className?: string;
}

export default function VotingStats({ 
  totalVotes, 
  totalCandidates, 
  votedCategories, 
  totalCategories, 
  className = "" 
}: VotingStatsProps) {
  const stats = [
    {
      label: 'Total Votes Cast',
      value: totalVotes.toLocaleString(),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4"/>
          <circle cx="12" cy="12" r="10"/>
        </svg>
      )
    },
    {
      label: 'Candidates',
      value: totalCandidates,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    },
    {
      label: 'Categories Voted',
      value: `${votedCategories}/${totalCategories}`,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
        </svg>
      )
    },
    {
      label: 'Participation Rate',
      value: `${Math.round((votedCategories / totalCategories) * 100)}%`,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      )
    }
  ];

  return (
    <section className={`${styles.votingStats} ${className}`}>
      <div className={styles.container}>
        <div className={styles.statsHeader}>
          <h2 className={styles.statsTitle}>Voting Statistics</h2>
          <p className={styles.statsDescription}>
            Track your voting progress and see how the community is participating
          </p>
        </div>

        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>
                {stat.icon}
              </div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
