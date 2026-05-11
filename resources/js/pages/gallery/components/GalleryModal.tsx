import React, { useState, useEffect } from 'react';
import styles from './GalleryModal.module.scss';
import { DownloadIcon } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  image: string;
  description: string;
  images: string[];
  created_at: string;
  updated_at: string;
}

interface GalleryModalProps {
  isOpen: boolean;
  item: GalleryItem | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  className?: string;
}

export default function GalleryModal({
  isOpen,
  item,
  onClose,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  className = ""
}: GalleryModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCopyToastVisible, setIsCopyToastVisible] = useState(false);

  // Reset image index when item changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [item]);

  useEffect(() => {
    if (!isCopyToastVisible) return;

    const timeoutId = window.setTimeout(() => {
      setIsCopyToastVisible(false);
    }, 2200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isCopyToastVisible]);

  if (!isOpen || !item) return null;

  // Combine featured image with gallery images
  const allImages = [item.image, ...(item.images || [])];
  const currentImage = allImages[currentImageIndex];

  const handleImagePrevious = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleImageNext = () => {
    if (currentImageIndex < allImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const hasImagePrevious = currentImageIndex > 0;
  const hasImageNext = currentImageIndex < allImages.length - 1;

  const getDownloadFilename = (imageUrl: string) => {
    try {
      const url = new URL(imageUrl, window.location.origin);
      const pathnameParts = url.pathname.split('/').filter(Boolean);
      const lastPart = pathnameParts[pathnameParts.length - 1];
      return lastPart || `${item.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    } catch {
      return `${item.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    }
  };

  const handleDownloadCurrentImage = async () => {
    const filename = getDownloadFilename(currentImage);

    try {
      const response = await fetch(currentImage);
      if (!response.ok) throw new Error('Failed to fetch image');

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback for cases where fetch is blocked by CORS.
      const link = document.createElement('a');
      link.href = currentImage;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShareCurrentImage = async () => {
    const shareUrl = currentImage;
    const shareTitle = item.title;
    const shareText = `${item.title} - Gallery Image`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // User cancelled or share failed; continue to clipboard fallback.
      }
    }

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setIsCopyToastVisible(true);
        return;
      } catch {
        // Fall back to prompt below.
      }
    }

    window.prompt('Copy this image link:', shareUrl);
  };

  // Global navigation handlers
  const handleGlobalPrevious = () => {
    // If there's a previous image in current gallery, go to it
    if (hasImagePrevious) {
      handleImagePrevious();
    } else {
      // Otherwise, go to previous gallery
      onPrevious();
    }
  };

  const handleGlobalNext = () => {
    // If there's a next image in current gallery, go to it
    if (hasImageNext) {
      handleImageNext();
    } else {
      // Otherwise, go to next gallery
      onNext();
    }
  };

  return (
    <div className={`${styles.modalOverlay} ${className}`} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {isCopyToastVisible && (
          <div className={styles.copyToast} role="status" aria-live="polite">
            Image link has been copied
          </div>
        )}
        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Global Navigation Buttons */}
        {(hasImagePrevious || hasPrevious) && (
          <button className={`${styles.navButton} ${styles.prevButton}`} onClick={handleGlobalPrevious} aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"/>
            </svg>
          </button>
        )}

        {(hasImageNext || hasNext) && (
          <button className={`${styles.navButton} ${styles.nextButton}`} onClick={handleGlobalNext} aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"/>
            </svg>
          </button>
        )}

        {/* Modal Body */}
        <div className={styles.modalBody}>
          <div className={styles.imageSection}>
            <img
              src={currentImage}
              alt={item.title}
              className={styles.modalImage}
            />
            
            {/* Image Counter */}
            {allImages.length > 1 && (
              <div className={styles.imageCounter}>
                {currentImageIndex + 1} / {allImages.length}
              </div>
            )}

            {/* Image Thumbnails */}
            {allImages.length > 1 && (
              <div className={styles.imageThumbnails}>
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    className={`${styles.thumbnail} ${index === currentImageIndex ? styles.activeThumbnail : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={image} alt={`${item.title} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.contentSection}>
            <div className={styles.projectHeader}>
              <h2 className={styles.projectTitle}>{item.title}</h2>
            </div>

            <div className={styles.projectDescription}>
              <p>{item.description}</p>
            </div>

            <div className={styles.projectActions}>
              <button className={styles.actionButton} onClick={handleDownloadCurrentImage}>
                <DownloadIcon size={16}  />
                Download
              </button>
              <button className={styles.actionButton} onClick={handleShareCurrentImage}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                  <polyline points="16,6 12,2 8,6"/>
                  <line x1="12" y1="2" x2="12" y2="15"/>
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
