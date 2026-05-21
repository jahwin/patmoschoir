import React, { useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '@/components/layouts/public-layout';
import styles from './style.module.scss';

const NOTES = ['♩', '♪', '♫', '♬', '𝄞', '𝄢'];

function FloatingNote({ note, style }: { note: string; style: React.CSSProperties }) {
  return (
    <span className={styles.floatingNote} style={style} aria-hidden="true">
      {note}
    </span>
  );
}

export default function NotFound() {
  const notes = [
    { note: '♪', style: { left: '8%',  top: '18%', animationDelay: '0s',   fontSize: '2.5rem', animationDuration: '9s'  } },
    { note: '♫', style: { left: '15%', top: '65%', animationDelay: '1.4s', fontSize: '1.8rem', animationDuration: '11s' } },
    { note: '𝄞', style: { left: '82%', top: '22%', animationDelay: '0.7s', fontSize: '3.2rem', animationDuration: '8s'  } },
    { note: '♬', style: { left: '88%', top: '70%', animationDelay: '2.1s', fontSize: '2rem',   animationDuration: '13s' } },
    { note: '♩', style: { left: '50%', top: '12%', animationDelay: '3s',   fontSize: '1.5rem', animationDuration: '10s' } },
    { note: '♪', style: { left: '70%', top: '80%', animationDelay: '1.8s', fontSize: '2.2rem', animationDuration: '7s'  } },
    { note: '♫', style: { left: '28%', top: '85%', animationDelay: '0.3s', fontSize: '1.6rem', animationDuration: '12s' } },
    { note: '𝄢', style: { left: '62%', top: '40%', animationDelay: '4s',   fontSize: '2.8rem', animationDuration: '9s'  } },
  ];

  return (
    <PublicLayout title="404 — Page Not Found">
      <div className={styles.page}>

        {/* Ambient glow blobs */}
        <div className={styles.blobLeft}  aria-hidden="true" />
        <div className={styles.blobRight} aria-hidden="true" />

        {/* Floating musical notes */}
        {notes.map((n, i) => (
          <FloatingNote key={i} note={n.note} style={n.style} />
        ))}

        {/* Staff lines */}
        <div className={styles.staff} aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={styles.staffLine} />
          ))}
        </div>

        <div className={styles.content}>
          {/* Eyebrow */}
          <p className={styles.eyebrow}>Error 404</p>

          {/* Giant 404 */}
          <div className={styles.heroNumber} aria-label="404">
            <span>4</span>
            <span className={styles.noteGlyph} aria-hidden="true">♩</span>
            <span>4</span>
          </div>

          {/* Divider */}
          <div className={styles.divider} aria-hidden="true">
            <div className={styles.dividerLine} />
            <div className={styles.dividerDiamond} />
            <div className={styles.dividerLine} />
          </div>

          {/* Headline */}
          <h1 className={styles.heading}>This melody went silent</h1>

          {/* Sub-copy */}
          <p className={styles.body}>
            The page you're searching for couldn't be found — perhaps it moved,
            was renamed, or simply rests in the silence between notes.
          </p>

          {/* Actions */}
          <div className={styles.actions}>
            <Link href="/" className={styles.btnPrimary}>
              Return Home
            </Link>
          </div>

          {/* Quick links */}
          <nav className={styles.quickLinks} aria-label="Helpful links">
            <span className={styles.quickDot} aria-hidden="true">·</span>
            <Link href="/events"   className={styles.quickLink}>Events</Link>
            <span className={styles.quickDot} aria-hidden="true">·</span>
            <Link href="/contact"  className={styles.quickLink}>Contact</Link>
            <span className={styles.quickDot} aria-hidden="true">·</span>
          </nav>
        </div>
      </div>
    </PublicLayout>
  );
}
