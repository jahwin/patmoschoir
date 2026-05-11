import { useRef, useState } from "react";
import { motion } from "motion/react";
import styles from "./HomeTestimonialsSection.module.scss";

/* ── Types ── */
type Platform = "youtube" | "facebook" | "instagram" | "x";

interface Testimonial {
  id: number;
  platform: Platform;
  name: string;
  handle: string;
  initials: string;
  avatarColor: string;
  text: string;
  date: string;
  likes: number;
  verified?: boolean;
}

/* ── Platform meta ── */
const PLATFORM: Record<Platform, { label: string; color: string; icon: () => JSX.Element }> = {
  youtube: {
    label: "YouTube",
    color: "#FF0000",
    icon: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  facebook: {
    label: "Facebook",
    color: "#1877F2",
    icon: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  instagram: {
    label: "Instagram",
    color: "#E1306C",
    icon: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  x: {
    label: "X (Twitter)",
    color: "#e7e7e7",
    icon: () => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
};

/* ── Mock testimonial data ── */
const ALL: Testimonial[] = [
  // Row A
  {
    id: 1,
    platform: "youtube",
    name: "Claudine Umutoni",
    handle: "@claudine_umutoni",
    initials: "CU",
    avatarColor: "#7c4dff",
    text: "I was going through the darkest season of my life when a friend sent me this video. I played it on repeat for three days straight. Something in the harmonies just broke me open — in the best way. Thank you Patmos Choir.",
    date: "3 weeks ago",
    likes: 847,
    verified: false,
  },
  {
    id: 2,
    platform: "facebook",
    name: "Jean-Pierre Hakizimana",
    handle: "@jphakizimana",
    initials: "JP",
    avatarColor: "#00897b",
    text: "Patmos Choir performed at my sister's wedding last month and the entire room fell silent when they began. People who hadn't cried in years were weeping — not from sadness but from the sheer presence of God in that room. Unforgettable.",
    date: "1 month ago",
    likes: 312,
  },
  {
    id: 3,
    platform: "instagram",
    name: "Aline Irakoze",
    handle: "@aline.irakoze",
    initials: "AI",
    avatarColor: "#e91e63",
    text: "The harmonies in Maranatha literally gave me chills from the first note. This is what worship is supposed to sound like — raw, sincere, anointed. 🙌",
    date: "5 days ago",
    likes: 1203,
  },
  {
    id: 4,
    platform: "x",
    name: "Emmanuel Ndayishimiye",
    handle: "@emma_nday",
    initials: "EN",
    avatarColor: "#f57c00",
    text: "Still playing 'Tanga Imana' on repeat at 2am. Don't even care that I have a 6am shift. God bless Patmos Choir and everyone who makes this ministry possible. 🙏 #PatmosChoir",
    date: "2 weeks ago",
    likes: 528,
  },
  {
    id: 5,
    platform: "youtube",
    name: "Solange Mukamana",
    handle: "@solange_muka",
    initials: "SM",
    avatarColor: "#1565c0",
    text: "My mother is in the hospital and can no longer go to church. I showed her this video and she sang along to every word — she used to hear this choir live in Kigali in the 2000s. You gave her a piece of joy today. From our family, thank you.",
    date: "2 months ago",
    likes: 2140,
    verified: false,
  },
  {
    id: 6,
    platform: "facebook",
    name: "Pastor David Nkurunziza",
    handle: "@pastordavidrwa",
    initials: "DN",
    avatarColor: "#2e7d32",
    text: "We invited Patmos Choir for our revival week and the atmosphere shifted the moment they started singing. Three people gave their lives to Christ that evening. This is ministry in its truest form.",
    date: "6 weeks ago",
    likes: 674,
    verified: true,
  },
  {
    id: 7,
    platform: "instagram",
    name: "Nadine Uwera",
    handle: "@nadine_uwera",
    initials: "NU",
    avatarColor: "#6a1b9a",
    text: "Attended the Songs of Worship concert at Kigali Convention Center last November. Drove 4 hours from Musanze to be there. Worth every kilometer. 💛",
    date: "4 months ago",
    likes: 892,
  },
  {
    id: 8,
    platform: "x",
    name: "Thierry Habimana",
    handle: "@thabimana_rw",
    initials: "TH",
    avatarColor: "#c62828",
    text: "Woke up at 3am, couldn't sleep. Put on Patmos Choir. Felt God's peace wash over me like a wave. Fell back asleep smiling. That's real anointing.",
    date: "1 week ago",
    likes: 741,
  },
  // Row B
  {
    id: 9,
    platform: "youtube",
    name: "Vestine Ingabire",
    handle: "@vestine_ing",
    initials: "VI",
    avatarColor: "#00695c",
    text: "These people don't just sing — they minister to the soul. You can hear the difference between performance and genuine worship. Patmos Choir is the latter. May God keep you.",
    date: "3 months ago",
    likes: 1567,
  },
  {
    id: 10,
    platform: "facebook",
    name: "Marie-Claire Umubyeyi",
    handle: "@marieclaire.rw",
    initials: "MC",
    avatarColor: "#ad1457",
    text: "I pray that God continues to use Patmos Choir to reach many more hearts. I have been following them since 2015 and watched them grow in grace and anointing. So proud of this choir.",
    date: "2 weeks ago",
    likes: 445,
  },
  {
    id: 11,
    platform: "instagram",
    name: "Ange Hirwa",
    handle: "@ange.hirwa",
    initials: "AH",
    avatarColor: "#0277bd",
    text: "Found this page through a friend's story and I haven't stopped listening since. 'Ijambo Ry'Ubukiza' is everything. New fan here. 🎶✨",
    date: "3 days ago",
    likes: 304,
  },
  {
    id: 12,
    platform: "x",
    name: "Kevin Izabayo",
    handle: "@izabayo_k",
    initials: "KI",
    avatarColor: "#37474f",
    text: "The Patmos Choir outreach at Nyanza last year changed my cousin's life. He came back home a different person. Thank you for going where not everyone goes. #OutreachMinistry",
    date: "5 months ago",
    likes: 983,
  },
  {
    id: 13,
    platform: "youtube",
    name: "Bertille Gasana",
    handle: "@bertille_gasa",
    initials: "BG",
    avatarColor: "#5c6bc0",
    text: "I put this on during my morning devotion and ended up spending two hours in worship. Cancelled all my meetings. Best decision I made all week. God is good.",
    date: "1 month ago",
    likes: 2344,
  },
  {
    id: 14,
    platform: "facebook",
    name: "Révérien Niyonsaba",
    handle: "@rev.niyonsaba",
    initials: "RN",
    avatarColor: "#558b2f",
    text: "Our church brought Patmos Choir for our 20th anniversary celebration. The congregation that night experienced something we still talk about every Sunday. Thank you for the gift of your voices.",
    date: "3 months ago",
    likes: 531,
    verified: true,
  },
  {
    id: 15,
    platform: "instagram",
    name: "Cynthia Uwimana",
    handle: "@cynthia.uwimana",
    initials: "CW",
    avatarColor: "#e65100",
    text: "Every time I feel spiritually dry I play Patmos Choir and something in me comes alive again. Genuine anointing is real and you can hear it. 🔥",
    date: "2 weeks ago",
    likes: 1789,
  },
  {
    id: 16,
    platform: "x",
    name: "Fidèle Bigirimana",
    handle: "@fidele_bigi",
    initials: "FB",
    avatarColor: "#283593",
    text: "There are choirs, and then there is Patmos Choir. The level of unity, spirituality, and musicality in one group is rare. Rwanda is blessed to have them.",
    date: "6 weeks ago",
    likes: 1102,
  },
];

const ROW_A = ALL.slice(0, 8);
const ROW_B = ALL.slice(8, 16);

/* ── Helper: heart icon ── */
function HeartIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

/* ── Card ── */
function TestimonialCard({ t }: { t: Testimonial }) {
  const meta = PLATFORM[t.platform];
  const Icon = meta.icon;

  return (
    <article
      className={styles.card}
      style={{ "--platform-color": meta.color } as React.CSSProperties}
    >
      <div className={styles.cardTop}>
        <div className={styles.platformBadge} style={{ color: meta.color }}>
          <Icon />
          <span>{meta.label}</span>
        </div>
        <span className={styles.cardDate}>{t.date}</span>
      </div>

      <blockquote className={styles.cardText}>
        <span className={styles.openQuote} aria-hidden="true">&ldquo;</span>
        {t.text}
        <span className={styles.closeQuote} aria-hidden="true">&rdquo;</span>
      </blockquote>

      <div className={styles.cardFooter}>
        <div className={styles.cardAuthor}>
          <div
            className={styles.avatar}
            style={{ background: t.avatarColor }}
            aria-hidden="true"
          >
            {t.initials}
          </div>
          <div className={styles.authorInfo}>
            <span className={styles.authorName}>
              {t.name}
              {t.verified && (
                <svg className={styles.verifiedIcon} width="13" height="13" viewBox="0 0 24 24" fill={meta.color} aria-label="Verified">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
                </svg>
              )}
            </span>
            <span className={styles.authorHandle}>{t.handle}</span>
          </div>
        </div>
        <div className={styles.cardLikes}>
          <HeartIcon />
          <span>{t.likes.toLocaleString()}</span>
        </div>
      </div>

      {/* Platform color accent line */}
      <div className={styles.cardAccent} style={{ background: meta.color }} />
    </article>
  );
}

/* ── Marquee row ── */
function MarqueeRow({ items, reverse = false }: { items: Testimonial[]; reverse?: boolean }) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className={styles.marqueeRow}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`${styles.marqueeTrack} ${reverse ? styles.marqueeReverse : ""} ${paused ? styles.marqueePaused : ""}`}
      >
        {/* Duplicate for seamless loop */}
        {[...items, ...items].map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

/* ── Section ── */
export default function HomeTestimonialsSection() {
  return (
    <section className={styles.section}>
      {/* Background decoration */}
      <div className={styles.bgDeco} aria-hidden="true">
        <span className={styles.bgQuote}>&ldquo;</span>
      </div>

      <div className={styles.inner}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className={styles.eyebrow}>From the Community</span>
          <h2 className={styles.title}>What People Are Saying</h2>
          <p className={styles.subtitle}>
            Voices from YouTube, Facebook, Instagram, and X — real people, real encounters.
          </p>

          {/* Platform pills */}
          <div className={styles.platformPills}>
            {(Object.entries(PLATFORM) as [Platform, typeof PLATFORM[Platform]][]).map(([key, p]) => {
              const Icon = p.icon;
              return (
                <span key={key} className={styles.pill} style={{ "--c": p.color } as React.CSSProperties}>
                  <Icon /> {p.label}
                </span>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Marquee rows — full bleed */}
      <div className={styles.marqueeWrap}>
        <MarqueeRow items={ROW_A} />
        <MarqueeRow items={ROW_B} reverse />
      </div>

      {/* Edge fades */}
      <div className={styles.fadeLeft}  aria-hidden="true" />
      <div className={styles.fadeRight} aria-hidden="true" />

      {/* Footer CTA */}
      <div className={styles.inner}>
        <motion.div
          className={styles.footer}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.footerText}>
            Were you touched by Patmos Choir's ministry?
          </p>
          <div className={styles.footerLinks}>
            <a href="https://www.youtube.com/@patmoschoir" target="_blank" rel="noopener noreferrer" className={styles.footerLink} style={{ "--c": "#FF0000" } as React.CSSProperties}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              Leave a comment
            </a>
            <a href="https://www.facebook.com/patmoschoir" target="_blank" rel="noopener noreferrer" className={styles.footerLink} style={{ "--c": "#1877F2" } as React.CSSProperties}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Share on Facebook
            </a>
            <a href="https://www.instagram.com/patmoschoir" target="_blank" rel="noopener noreferrer" className={styles.footerLink} style={{ "--c": "#E1306C" } as React.CSSProperties}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              Tag us on Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
