import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/components/layouts/public-layout';
import styles from './style.module.scss';

interface MusicChannel {
  id: number;
  logo: string | null;
  link: string | null;
  button_text: string;
  service_name: string | null;
  rank: number;
  created_at: string;
  updated_at: string;
}

interface MusicChannelsPageProps {
  channels: MusicChannel[];
}

export default function MusicChannels({ channels = [] }: MusicChannelsPageProps) {
  return (
    <>
      <PublicLayout
        title="Music Channels"
        subtitle="Listen on Your Favorite Platform"
        description="Access our music on all major streaming platforms and music services."
      >
        <div className={styles.musicChannelsPage}>
          <div className={styles.container}>
            <nav
              id="music-services"
              className={styles.musicServiceList}
              role="navigation"
            >
              {channels.map((channel) => (
                <div
                  key={channel.id}
                  className={styles.musicServiceListItem}
                >
                  <a
                    id={`channel-${channel.id}`}
                    className={styles.musicServiceListLink}
                    href={channel.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-service-name={channel.service_name}
                    data-button-text={channel.button_text}
                  >
                    <div className={styles.musicServiceListContent}>
                      {channel.logo && (
                        <img
                          className={styles.musicServiceListImg}
                          src={channel.logo}
                          alt={channel.service_name || 'Music Service'}
                          height={40}
                          loading="lazy"
                        />
                      )}
                      <button
                        className={styles.btn}
                        tabIndex={-1}
                        title={channel.button_text}
                      >
                        <span className={styles.btnLabel}>
                          {channel.button_text}
                        </span>
                      </button>
                    </div>
                  </a>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </PublicLayout>
    </>
  );
}
