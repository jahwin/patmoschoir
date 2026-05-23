import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './GalleryModal.module.scss';
import { DownloadIcon } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  image: string;
  description: string;
  images: string[];
  year: number;
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
  className = '',
}: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);

  // Reset slide index when album changes
  useEffect(() => { setCurrentIndex(0); setDirection(0); }, [item]);

  useEffect(() => {
    if (!toastVisible) return;
    const t = window.setTimeout(() => setToastVisible(false), 2200);
    return () => window.clearTimeout(t);
  }, [toastVisible]);

  const allImages = item ? [item.image, ...(item.images ?? [])] : [];
  const currentImage = allImages[currentIndex] ?? '';
  const hasImgPrev = currentIndex > 0;
  const hasImgNext = currentIndex < allImages.length - 1;

  const goTo = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const imgPrev = () => { if (hasImgPrev) goTo(currentIndex - 1); else if (hasPrevious) onPrevious(); };
  const imgNext = () => { if (hasImgNext) goTo(currentIndex + 1); else if (hasNext)    onNext(); };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  imgPrev();
      if (e.key === 'ArrowRight') imgNext();
      if (e.key === 'Escape')     onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, currentIndex, hasImgPrev, hasImgNext, hasPrevious, hasNext]);

  const getFilename = (url: string) => {
    try {
      const parts = new URL(url, window.location.origin).pathname.split('/').filter(Boolean);
      return parts[parts.length - 1] || `${item?.title ?? 'photo'}.jpg`;
    } catch { return `${item?.title ?? 'photo'}.jpg`; }
  };

  const handleDownload = async () => {
    const filename = getFilename(currentImage);
    try {
      const res = await fetch(currentImage);
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = filename;
      document.body.appendChild(a); a.click();
      document.body.removeChild(a); URL.revokeObjectURL(url);
    } catch {
      const a = document.createElement('a');
      a.href = currentImage; a.download = filename;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: item?.title, url: currentImage }); return; } catch {}
    }
    if (navigator.clipboard?.writeText) {
      try { await navigator.clipboard.writeText(currentImage); setToastVisible(true); return; } catch {}
    }
    window.prompt('Copy image link:', currentImage);
  };

  if (!isOpen || !item) return null;

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div
      className={`${styles.overlay} ${className}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      {/* Toast */}
      {toastVisible && (
        <div className={styles.toast} role="status" aria-live="polite">
          Image link copied
        </div>
      )}

      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* ── Image (full area) ── */}
        <div className={styles.imageWrap}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={currentImage}
              src={currentImage}
              alt={item.title}
              className={styles.image}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              draggable={false}
            />
          </AnimatePresence>

          {/* ── Top overlay: title + description ── */}
          <div className={styles.topOverlay}>
            <div className={styles.topOverlayContent}>
              <div className={styles.topMeta}>
                <span className={styles.topDate}>{item.year}</span>
                {allImages.length > 1 && (
                  <span className={styles.topCounter}>
                    {currentIndex + 1} / {allImages.length}
                  </span>
                )}
              </div>
              <h2 className={styles.topTitle}>{item.title}</h2>
              {item.description && (
                <p className={styles.topDesc}>{item.description}</p>
              )}
            </div>
          </div>

          {/* ── Bottom overlay: thumbnails + actions ── */}
          <div className={styles.bottomOverlay}>
            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className={styles.thumbsRow}>
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`${styles.thumb} ${idx === currentIndex ? styles.thumbActive : ''}`}
                    onClick={() => goTo(idx)}
                    aria-label={`Go to image ${idx + 1}`}
                    aria-current={idx === currentIndex}
                  >
                    <img src={img} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className={styles.actions}>
              <button type="button" className={styles.actionBtn} onClick={handleDownload} aria-label="Download">
                <DownloadIcon size={15} />
                <span>Download</span>
              </button>
              <button type="button" className={styles.actionBtn} onClick={handleShare} aria-label="Share">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                  <polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
                </svg>
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* ── Prev / Next arrows ── */}
          {(hasImgPrev || hasPrevious) && (
            <button type="button" className={`${styles.arrow} ${styles.arrowPrev}`} onClick={imgPrev} aria-label="Previous image">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
          )}
          {(hasImgNext || hasNext) && (
            <button type="button" className={`${styles.arrow} ${styles.arrowNext}`} onClick={imgNext} aria-label="Next image">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          )}

          {/* ── Close button ── */}
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

      </div>
    </div>
  );
}
