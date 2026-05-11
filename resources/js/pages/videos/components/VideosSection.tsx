import React, { useState } from 'react';
import styles from './VideosSection.module.scss';
import VideoModal from './VideoModal';
import { Play } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types/shared';

interface Video {
  id: number;
  image: string | null;
  youtube_link: string | null;
  created_at: string;
  updated_at: string;
}

interface VideosSectionProps {
  videos: Video[];
  className?: string;
}

export default function VideosSection({ videos, className = "" }: VideosSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { siteContent } = usePage<SharedData>().props;
  const backgroundImage = siteContent?.home_videos_background_image;
  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.85)), url(${backgroundImage})`,
      }
    : undefined;

  if (!videos || videos.length === 0) {
    return null;
  }

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <>
      <section
        id="videos"
        className={`${styles.videosSection} ${backgroundImage ? styles.sectionWithBackground : ''} ${className}`}
        style={backgroundStyle}
      >
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>VIDEOS</h2>

          <div className={styles.videosGrid}>
            {videos.map((video) => (
              <div
                key={video.id}
                className={styles.videoCard}
                onClick={() => handleVideoClick(video)}
              >
                {video.image && (
                  <div className={styles.videoThumbnail}>
                    <img
                      src={video.image}
                      alt={`Video ${video.id}`}
                      className={styles.videoImage}
                    />
                    <div className={styles.playOverlay}>
                      <div className={styles.playButton}>
                        <Play size={48} fill="currentColor" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={isModalOpen}
        video={selectedVideo}
        onClose={handleCloseModal}
      />
    </>
  );
}
