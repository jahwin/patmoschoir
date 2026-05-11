import React, { useEffect } from 'react';
import styles from './VideoModal.module.scss';
import { X } from 'lucide-react';

interface Video {
  id: number;
  image: string | null;
  youtube_link: string | null;
  created_at: string;
  updated_at: string;
}

interface VideoModalProps {
  isOpen: boolean;
  video: Video | null;
  onClose: () => void;
}

// Function to extract YouTube video ID from various URL formats
function getYouTubeVideoId(url: string | null): string | null {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

// Function to get YouTube embed URL
function getYouTubeEmbedUrl(youtubeLink: string | null): string | null {
  const videoId = getYouTubeVideoId(youtubeLink);
  if (!videoId) return null;
  
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
}

export default function VideoModal({ isOpen, video, onClose }: VideoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;

  const embedUrl = getYouTubeEmbedUrl(video.youtube_link);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>

        {/* Video Container */}
        <div className={styles.videoContainer}>
          {embedUrl ? (
            <div className={styles.videoWrapper}>
              <iframe
                src={embedUrl}
                title={`Video ${video.id}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.videoIframe}
              />
            </div>
          ) : (
            <div className={styles.errorMessage}>
              <p>Invalid YouTube URL</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
