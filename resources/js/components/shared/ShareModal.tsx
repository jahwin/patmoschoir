import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Mail, 
  Facebook, 
  Linkedin, 
  MessageCircle, 
  Twitter, 
  MessageSquare, 
  Copy, 
  X,
  QrCode
} from 'lucide-react';
import styles from './ShareModal.module.scss';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title?: string;
  description?: string;
}

interface SocialPlatform {
  name: string;
  icon: React.ReactNode;
  color: string;
  shareUrl: (url: string, title?: string, description?: string) => string;
}

const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    name: 'Email',
    icon: <Mail size={20} />,
    color: '#272727',
    shareUrl: (url, title, description) => 
      `mailto:?subject=${encodeURIComponent(title || 'Check this out')}&body=${encodeURIComponent(description || '')}%0A%0A${encodeURIComponent(url)}`
  },
  {
    name: 'Facebook',
    icon: <Facebook size={20} />,
    color: '#1877F2',
    shareUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  },
  {
    name: 'LinkedIn',
    icon: <Linkedin size={20} />,
    color: '#0077B5',
    shareUrl: (url, title) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title || '')}`
  },
  {
    name: 'Chat',
    icon: <MessageCircle size={20} />,
    color: '#6B7280',
    shareUrl: (url) => url
  },
  // {
  //   name: 'Tumblr',
  //   icon: <Tumblr size={20} />,
  //   color: '#001935',
  //   shareUrl: (url, title, description) => 
  //     `https://www.tumblr.com/widgets/share/tool?posttype=link&title=${encodeURIComponent(title || '')}&caption=${encodeURIComponent(description || '')}&content=${encodeURIComponent(url)}`
  // },
  {
    name: 'Twitter',
    icon: <Twitter size={20} />,
    color: '#1DA1F2',
    shareUrl: (url, title) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title || '')}`
  },
  {
    name: 'WhatsApp',
    icon: <MessageSquare size={20} />,
    color: '#25D366',
    shareUrl: (url, title) => `https://wa.me/?text=${encodeURIComponent(title || '')}%20${encodeURIComponent(url)}`
  }
];

export default function ShareModal({ 
  isOpen, 
  onClose, 
  url, 
  title = 'Share This Link',
  description 
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}${url}`;

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSocialShare = (platform: SocialPlatform) => {
    const shareUrl = platform.shareUrl(fullUrl, title, description);
    
    if (platform.name === 'Email' || platform.name === 'Chat') {
      window.location.href = shareUrl;
    } else {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const generateQRCode = () => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(fullUrl)}`;
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title.toLowerCase()}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Social Media Icons */}
        <div className={styles.socialIcons}>
          {SOCIAL_PLATFORMS.map((platform, index) => (
            <button
              key={index}
              className={styles.socialButton}
              style={{ backgroundColor: platform.color }}
              onClick={() => handleSocialShare(platform)}
              title={`Share on ${platform.name}`}
            >
              {platform.icon}
            </button>
          ))}
        </div>

        {/* QR Code */}
        <div className={styles.qrSection}>
          <div className={styles.qrCode}>
            <img 
              src={generateQRCode()} 
              alt="QR Code" 
              className={styles.qrImage}
            />
          </div>
        </div>

        {/* Copy Link Section */}
        <div className={styles.copySection}>
          <label className={styles.copyLabel}>Copy Link</label>
          <div className={styles.copyContainer}>
            <input
              type="text"
              value={fullUrl}
              readOnly
              className={styles.urlInput}
            />
            <button
              className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
              onClick={handleCopyLink}
              title={copied ? 'Copied!' : 'Copy to clipboard'}
            >
              {copied ? (
                <QrCode size={16} />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button className={styles.closeModalButton} onClick={onClose}>
          CLOSE
        </button>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
