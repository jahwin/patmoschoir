import React, { useState } from 'react';
import styles from './EventCard.module.scss';
import Button from './Button';
import { Share2Icon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import ShareModal from './ShareModal';
import LazyImage from './LazyImage';

interface EventCardProps {
  title: string;
  description?: string;
  image: string;
  buttonText?: string;
  status: 'active' | 'ended';
  link?: string;
  endDate?: string;
  endTime?: string;
  className?: string;
  onClick?: () => void;
  onViewEvent?: () => void;
}

export default function EventCard({
  title,
  image,
  status,
  endDate,
  description,
  endTime,
  className = "",
  onClick,
  link = '',
  onViewEvent,
  buttonText = 'View Event'
}: EventCardProps) {
  const [showShareModal, setShowShareModal] = useState(false);

  const getStatusText = () => {
    if (status === 'ended') {
      return `ENDED: ${endDate} ${endTime}`;
    }
    return 'ACTIVE';
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShareModal(true);
  };

  const handleCloseModal = () => {
    setShowShareModal(false);
  };

  return (
    <Link 
      className={`${styles.eventCard} ${className}`}
      href={link}
    >
      <div className={styles.imageContainer}>
        <LazyImage 
          src={image} 
          alt={title}
          className={styles.eventImage}
        />
      </div>
      
      <div className={styles.content}>
        <div className={styles.contentTop}>
          <p className={styles.time}>
            {endDate && endTime ? `${endDate}, ${endTime}` : 'Date TBD'}
          </p>
          <h3 className={styles.title}>{title.toLocaleLowerCase()}</h3>
          {
            description && (
              <p className={styles.description} dangerouslySetInnerHTML={{ __html: description }}></p>
            )
          }
        </div>
        
        <div className={styles.buttonsContainer}>
          <Button 
            variant="primary" 
            className={styles.viewEventButton}
            onClick={(e) => {
             e.preventDefault();
              e.stopPropagation();
              onViewEvent?.();
            }}
          >
            {buttonText}
          </Button>
          <Button 
            className={styles.shareButton}
            onClick={handleShareClick}
            onMouseDown={(e) => e.stopPropagation()}
          >
             <Share2Icon width={20} height={20} />
          </Button>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={handleCloseModal}
        url={link || window.location.href}
        title={title}
        description={description}
      />
    </Link>
  );
}