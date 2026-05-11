import React from 'react';
import styles from './MusicSection.module.scss';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types/shared';

interface Music {
  id: number;
  image: string | null;
  link: string | null;
  created_at: string;
  updated_at: string;
}

interface MusicSectionProps {
  music: Music[];
  className?: string;
}

export default function MusicSection({ music, className = "" }: MusicSectionProps) {
  const { siteContent } = usePage<SharedData>().props;
  const backgroundImage = siteContent?.home_music_background_image;
  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.85)), url(${backgroundImage})`,
      }
    : undefined;

  if (!music || music.length === 0) {
    return null;
  }

  return (
    <section
      id="music"
      className={`${styles.musicSection} ${backgroundImage ? styles.sectionWithBackground : ''} ${className}`}
      style={backgroundStyle}
    >
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>MUSIC</h2>
        
        <div className={styles.musicGrid}>
          {music.map((item) => (
            <a
              key={item.id}
              href={item.link || '#'}
              target={item.link?.startsWith('http') ? '_blank' : undefined}
              rel={item.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={styles.musicCard}
            >
              {item.image && (
                <img 
                  src={item.image} 
                  alt={`Music ${item.id}`}
                  className={styles.musicImage}
                />
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
