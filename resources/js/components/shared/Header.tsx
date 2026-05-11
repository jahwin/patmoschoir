import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { Link, router, usePage } from '@inertiajs/react';
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
  Menu,
  X as CloseIcon,
  Music,
} from 'lucide-react';
interface HeaderProps {
  className?: string;
  onOpenJoinMinistryModal?: () => void;
}

export default function Header({ className = "", onOpenJoinMinistryModal }: HeaderProps) {
  const currentRoute = usePage().url;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { siteContent, name } = usePage().props as any;

  // Close mobile menu whenever route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentRoute]);

  // Handle scroll to music section after navigation
  useEffect(() => {
    if (currentRoute === '/' && window.location.hash === '#music') {
      setTimeout(() => {
        const element = document.getElementById('music');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [currentRoute]);

  const handleListenClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (currentRoute === '/') {
      // Already on home page, just scroll
      const element = document.getElementById('music');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to home page with hash
      router.visit('/#music', {
        onFinish: () => {
          setTimeout(() => {
            const element = document.getElementById('music');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        },
      });
    }
  };

  const iconMap: Record<string, React.ComponentType<any>> = {
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
    <>
      {
        currentRoute === '/' && siteContent && siteContent.social_links && siteContent.social_links.length > 0 && (
          <div className={styles.socialSidebar}>
            {
              siteContent.social_links.map((social: any, idx: number) => {
                const platform: string = (social?.platform || '').toLowerCase();
                const Icon = iconMap[platform] || Globe;
                const href: string = social?.url || '#';
                const label: string = platform || 'website';
                return (
                  <a
                    key={`${label}-${idx}`}
                    href={href}
                    className={styles.socialLink}
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

        )
      }
      <header className={`${styles.header} ${className}`}>

        {/* Main Header Content */}
        <div className={styles.headerContent}>
          {/* Logo */}
          {
            siteContent && siteContent.site_logo ? (
              <Link href="/" className={styles.logo}>
                <img src={siteContent.site_logo} alt={siteContent.site_name} />
              </Link>
            ) : (
              <div className={styles.logo}>
                <div className={styles.logoText}>
                  <div className={styles.logoMain}>{siteContent && siteContent.site_name ? siteContent.site_name : name}</div>
                </div>
              </div>
            )
          }

          {/* Mobile Toggle */}
          <button
            type="button"
            className={styles.mobileToggle}
            aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="site-mobile-nav"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            {isMobileMenuOpen ? <CloseIcon size={22} /> : <Menu size={22} />}
          </button>

          {/* Desktop Navigation */}
          <nav className={styles.navigation}>
            <Link href="/services" className={`${styles.navLink} ${currentRoute === '/services' ? styles.active : ''}`}>Our Ministry</Link>
            <a href="/#videos" className={`${styles.navLink} ${currentRoute === '/videos' ? styles.active : ''}`}>Watch</a>
            <a href="/#music" onClick={handleListenClick} className={`${styles.navLink} ${currentRoute === '/' ? styles.active : ''}`}>Listen</a>
            <Link href="/#tours" className={`${styles.navLink} ${currentRoute === '/#tours' ? styles.active : ''}`}>Tours</Link>
            <Link href="/gallery" className={`${styles.navLink} ${currentRoute === '/gallery' ? styles.active : ''}`}>Gallery</Link>
          </nav>


          {/* CTA Button */}
          <button
            type="button"
            onClick={() => onOpenJoinMinistryModal?.()}
            className={styles.ctaButton}
          >
            Join Us
          </button>

        </div>

        {/* Mobile Navigation Panel */}
        <nav
          id="site-mobile-nav"
          className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <Link href="/services" className={`${styles.mobileNavLink} ${currentRoute === '/services' ? styles.active : ''}`}>Our Ministry</Link>
          <a href="/#videos" className={`${styles.mobileNavLink} ${currentRoute === '/videos' ? styles.active : ''}`}>Watch</a>
          <a href="/#music" onClick={handleListenClick} className={`${styles.mobileNavLink} ${currentRoute === '/' ? styles.active : ''}`}>Listen</a>
          <Link href="/#tours" className={`${styles.mobileNavLink} ${currentRoute === '/#tours' ? styles.active : ''}`}>Tours</Link>
          <Link href="/gallery" className={`${styles.mobileNavLink} ${currentRoute === '/gallery' ? styles.active : ''}`}>Gallery</Link>
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenJoinMinistryModal?.();
            }}
            className={styles.mobileNavLink}
          >
            Join Us
          </button>
        </nav>
      </header>
    </>
  );
}
