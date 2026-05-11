import React from 'react';
import styles from './NewsCTA.module.scss';
import { usePage } from '@inertiajs/react';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  Gitlab,
  Dribbble,
  Twitch,
  Slack,
  X,
  Codepen,
  Globe,
  Mail,
  Link as LinkIcon,
  Music,
} from 'lucide-react';
import { SharedData, SocialLink } from '@/types/shared';

interface NewsCTAProps {
  className?: string;
}

export default function NewsCTA({ className = "" }: NewsCTAProps) {
  const { siteContent, name } = usePage<SharedData>().props;

  const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
    facebook: Facebook,
    meta: Facebook,
    twitter: Twitter,
    x: X,
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube,
    github: Github,
    gitlab: Gitlab,
    dribbble: Dribbble,
    twitch: Twitch,
    slack: Slack,
    codepen: Codepen,
    email: Mail,
    mail: Mail,
    website: Globe,
    site: Globe,
    link: LinkIcon,
    tiktok: Music,
  };
  return (
    <section className={`${styles.newsCTA} ${className}`}>
      <div className={styles.container}>
        <div className={styles.ctaContent}>
          <div className={styles.textSection}>
            <h2 className={styles.ctaTitle}>Stay Updated</h2>
            <p className={styles.ctaDescription}>
              Subscribe to our newsletter and never miss the latest architectural 
              insights, project updates, and industry trends.
            </p>
          </div>

          <div className={styles.actionSection}>

            {siteContent && siteContent.social_links && siteContent.social_links.length > 0 && (
              <div className={styles.socialLinks}>
                <h3 className={styles.socialTitle}>Follow Us</h3>
                <div className={styles.socialButtons}>
                  {
                    siteContent.social_links.map((social: SocialLink, idx: number) => {
                      const platform: string = (social?.platform || '').toLowerCase();
                      const Icon = iconMap[platform] || Globe;
                      const href: string = social?.url || '#';
                      const label: string = platform || 'website';
                      return (
                        <a
                          key={`${label}-${idx}`}
                          href={href}
                          className={styles.socialButton}
                          aria-label={label}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon size={20} />
                        </a>
                      );
                    })
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
