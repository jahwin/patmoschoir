import React, { useState } from 'react';
import { Share2Icon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import ShareModal from './ShareModal';
import styles from './NewsCard.module.scss';
import Button from './Button';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  slug: string;
  featured: boolean;
}

interface NewsCardProps {
  post: BlogPost;
  className?: string;
  showShare?: boolean;
  onShare?: (post: BlogPost) => void;
}

export default function NewsCard({
  post,
  className = "",
  showShare = true,
  onShare
}: NewsCardProps) {
  const [showShareModal, setShowShareModal] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onShare) {
      onShare(post);
    } else {
      setShowShareModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowShareModal(false);
  };

  return (
    <>
      <Link
        href={`/news/${post.slug}`}
        className={`${styles.newsCard} ${post.featured ? styles.featured : ''} ${className}`}
      >
        <div className={styles.cardImage}>
          <img
            src={post.image}
            alt={post.title}
            className={styles.postImage}
          />
        </div>

        <div className={styles.cardContent}>
          <div className={styles.postContent}>
            <div className={styles.postMeta}>
              <span className={styles.postDate}>{formatDate(post.date)}</span>
              <span className={styles.postReadTime}>{post.readTime} read</span>
            </div>

            <h3 className={styles.postTitle}>{post.title}</h3>
            <div className={styles.postExcerpt}>
              <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
            </div>
          </div>

          <div className={styles.postFooter}>

            <div className={styles.postActions}>
              {showShare && (
                <button
                  className={styles.shareButton}
                  onClick={handleShareClick}
                  title="Share this post"
                >
                  <Share2Icon size={16} />
                </button>
              )}
              <Button variant='outline' className={styles.readMoreButton}>
                Read More
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12,5 19,12 12,19" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </Link>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          isOpen={showShareModal}
          onClose={handleCloseModal}
          url={`/news/${post.slug}`}
          title={post.title}
          description={post.excerpt}
        />
      )}
    </>
  );
}
