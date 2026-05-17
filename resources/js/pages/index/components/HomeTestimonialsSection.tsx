import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./HomeTestimonialsSection.module.scss";

/* ── Types ── */
type Platform = "youtube" | "facebook" | "instagram" | "x" | "website";

interface Testimonial {
  id: number;
  platform: Platform;
  name: string;
  handle: string;
  initials: string;
  avatarColor: string;
  text: string;
  date: string;
  verified?: boolean;
}

/* ── Platform meta ── */
const PLATFORM: Record<Platform, { label: string; color: string; icon: () => React.ReactElement }> = {
  youtube: {
    label: "YouTube",
    color: "#FF0000",
    icon: () => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  facebook: {
    label: "Facebook",
    color: "#1877F2",
    icon: () => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  instagram: {
    label: "Instagram",
    color: "#E1306C",
    icon: () => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  x: {
    label: "X (Twitter)",
    color: "#e7e7e7",
    icon: () => (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  website: {
    label: "Patmos Site",
    color: "#c9a962",
    icon: () => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
};

/* ── Testimonial data ── */
const ALL: Testimonial[] = [
  {
    id: 1,
    platform: "website",
    name: "Immaculée Nyiransabimana",
    handle: "Via patmoschoir.rw",
    initials: "IN",
    avatarColor: "#a98d4a",
    text: "I discovered Patmos Choir through this website and I have not stopped listening since. There is a peace in their music that I cannot explain with words. God is truly in this ministry.",
    date: "2 days ago",
  },
  {
    id: 2,
    platform: "website",
    name: "Gervais Ntwari",
    handle: "Via patmoschoir.rw",
    initials: "GN",
    avatarColor: "#7b6030",
    text: "I attended the Praise & Prayer Night at SDA Remera and I am still carrying what God did that evening. The choir led us into a place of deep encounter. Thank you Patmos.",
    date: "1 week ago",
    verified: true,
  },
  {
    id: 3,
    platform: "website",
    name: "Chantal Uwamahoro",
    handle: "Via patmoschoir.rw",
    initials: "CU",
    avatarColor: "#c9a962",
    text: "My family plays Patmos Choir every Sunday morning. It sets the tone for our whole week. This is not just music — it is ministry, and we are so grateful for everything you do.",
    date: "3 days ago",
  },
  {
    id: 4,
    platform: "youtube",
    name: "Claudine Umutoni",
    handle: "@claudine_umutoni",
    initials: "CU",
    avatarColor: "#7c4dff",
    text: "I was going through the darkest season of my life when a friend sent me this video. I played it on repeat for three days straight. Something in the harmonies just broke me open — in the best way. Thank you Patmos Choir.",
    date: "3 weeks ago",
  },
  {
    id: 5,
    platform: "facebook",
    name: "Jean-Pierre Hakizimana",
    handle: "@jphakizimana",
    initials: "JP",
    avatarColor: "#00897b",
    text: "Patmos Choir performed at my sister's wedding last month and the entire room fell silent when they began. People who hadn't cried in years were weeping — not from sadness but from the sheer presence of God in that room. Unforgettable.",
    date: "1 month ago",
  },
  {
    id: 6,
    platform: "instagram",
    name: "Aline Irakoze",
    handle: "@aline.irakoze",
    initials: "AI",
    avatarColor: "#e91e63",
    text: "The harmonies in Maranatha literally gave me chills from the first note. This is what worship is supposed to sound like — raw, sincere, anointed. 🙌",
    date: "5 days ago",
  },
  {
    id: 7,
    platform: "x",
    name: "Emmanuel Ndayishimiye",
    handle: "@emma_nday",
    initials: "EN",
    avatarColor: "#f57c00",
    text: "Still playing 'Tanga Imana' on repeat at 2am. Don't even care that I have a 6am shift. God bless Patmos Choir and everyone who makes this ministry possible. 🙏 #PatmosChoir",
    date: "2 weeks ago",
  },
  {
    id: 8,
    platform: "youtube",
    name: "Solange Mukamana",
    handle: "@solange_muka",
    initials: "SM",
    avatarColor: "#1565c0",
    text: "My mother is in the hospital and can no longer go to church. I showed her this video and she sang along to every word — she used to hear this choir live in Kigali in the 2000s. You gave her a piece of joy today. From our family, thank you.",
    date: "2 months ago",
  },
  {
    id: 9,
    platform: "facebook",
    name: "Pastor David Nkurunziza",
    handle: "@pastordavidrwa",
    initials: "DN",
    avatarColor: "#2e7d32",
    text: "We invited Patmos Choir for our revival week and the atmosphere shifted the moment they started singing. Three people gave their lives to Christ that evening. This is ministry in its truest form.",
    date: "6 weeks ago",
    verified: true,
  },
  {
    id: 10,
    platform: "instagram",
    name: "Nadine Uwera",
    handle: "@nadine_uwera",
    initials: "NU",
    avatarColor: "#6a1b9a",
    text: "Attended the Songs of Worship concert at Kigali Convention Center last November. Drove 4 hours from Musanze to be there. Worth every kilometer. 💛",
    date: "4 months ago",
  },
  {
    id: 11,
    platform: "x",
    name: "Thierry Habimana",
    handle: "@thabimana_rw",
    initials: "TH",
    avatarColor: "#c62828",
    text: "Woke up at 3am, couldn't sleep. Put on Patmos Choir. Felt God's peace wash over me like a wave. Fell back asleep smiling. That's real anointing.",
    date: "1 week ago",
  },
  {
    id: 12,
    platform: "youtube",
    name: "Vestine Ingabire",
    handle: "@vestine_ing",
    initials: "VI",
    avatarColor: "#00695c",
    text: "These people don't just sing — they minister to the soul. You can hear the difference between performance and genuine worship. Patmos Choir is the latter. May God keep you.",
    date: "3 months ago",
  },
  {
    id: 13,
    platform: "facebook",
    name: "Révérien Niyonsaba",
    handle: "@rev.niyonsaba",
    initials: "RN",
    avatarColor: "#558b2f",
    text: "Our church brought Patmos Choir for our 20th anniversary celebration. The congregation that night experienced something we still talk about every Sunday. Thank you for the gift of your voices.",
    date: "3 months ago",
    verified: true,
  },
  {
    id: 14,
    platform: "instagram",
    name: "Cynthia Uwimana",
    handle: "@cynthia.uwimana",
    initials: "CW",
    avatarColor: "#e65100",
    text: "Every time I feel spiritually dry I play Patmos Choir and something in me comes alive again. Genuine anointing is real and you can hear it. 🔥",
    date: "2 weeks ago",
  },
  {
    id: 15,
    platform: "x",
    name: "Fidèle Bigirimana",
    handle: "@fidele_bigi",
    initials: "FB",
    avatarColor: "#283593",
    text: "There are choirs, and then there is Patmos Choir. The level of unity, spirituality, and musicality in one group is rare. Rwanda is blessed to have them.",
    date: "6 weeks ago",
  },
];

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

      <div className={styles.cardAccent} style={{ background: meta.color }} />
    </article>
  );
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}

function PenIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

/* ── Share Testimonial Modal ── */
function ShareModal({ onClose }: { onClose: () => void }) {
  const [name, setName]         = useState("");
  const [message, setMessage]   = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [error, setError]           = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const getCsrfToken = () => {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : "";
  };

  const handleSubmit = async () => {
    setError("");
    if (!name.trim())    { setError("Please enter your name."); return; }
    if (!message.trim()) { setError("Please write your testimonial."); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/testimonials", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", "X-XSRF-TOKEN": getCsrfToken() },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Unable to submit. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Share your testimonial"
    >
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalTopBar} aria-hidden="true" />

        <div className={styles.modalHead}>
          <div>
            <h3 className={styles.modalTitle}>Share Your Testimonial</h3>
            <p className={styles.modalSubtitle}>Patmos Choir — Community</p>
          </div>
          <button type="button" className={styles.modalClose} onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <div className={styles.modalSep} aria-hidden="true" />

        {submitted ? (
          <div className={styles.successState}>
            <span className={styles.successIcon}><CheckIcon /></span>
            <h4 className={styles.successTitle}>Thank You!</h4>
            <p className={styles.successText}>
              Your testimonial has been received. We review all submissions before publishing.
              God bless you for sharing your story.
            </p>
            <button type="button" className={styles.successClose} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className={styles.modalSection}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="t-name">Full Name <span aria-hidden="true">*</span></label>
                <input
                  id="t-name"
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="t-message">Your Testimonial <span aria-hidden="true">*</span></label>
                <textarea
                  id="t-message"
                  className={styles.textarea}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share how Patmos Choir has touched your life…"
                  rows={5}
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  className={styles.error}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <div className={styles.modalFoot}>
              <button
                type="button"
                className={styles.submitBtn}
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting
                  ? <><span className={styles.spinner} aria-hidden="true" /> Submitting…</>
                  : <><PenIcon /> Submit Testimonial</>
                }
              </button>
              <button type="button" className={styles.cancelBtn} onClick={onClose} disabled={submitting}>
                Cancel
              </button>
            </div>

            <p className={styles.modalNote}>
              All testimonials are reviewed before being published on this page.
            </p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ── Section ── */
export default function HomeTestimonialsSection() {
  const trackRef   = useRef<HTMLDivElement>(null);
  const animRef    = useRef<number | null>(null);
  const pausedRef  = useRef(false);
  const [modalOpen, setModalOpen] = useState(false);

  /* Slow auto-scroll */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const step = () => {
      if (!pausedRef.current) {
        track.scrollLeft += 0.5;
        if (track.scrollLeft >= track.scrollWidth - track.clientWidth) {
          track.scrollLeft = 0;
        }
      }
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const scroll = (dir: -1 | 1) => {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.bgDeco} aria-hidden="true">
          <span className={styles.bgQuote}>&ldquo;</span>
        </div>

        <div className={styles.inner}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className={styles.eyebrow}>From the Community</span>
            <h2 className={styles.title}>What People Are Saying</h2>
            <p className={styles.subtitle}>Real encounters, shared voices.</p>

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

        {/* Carousel */}
        <div
          className={styles.carouselWrap}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navBtnLeft}`}
            onClick={() => scroll(-1)}
            aria-label="Scroll testimonials left"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navBtnRight}`}
            onClick={() => scroll(1)}
            aria-label="Scroll testimonials right"
          >
            <ChevronRight />
          </button>

          <div className={styles.carouselTrack} ref={trackRef}>
            {ALL.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </div>

          <div className={styles.fadeLeft}  aria-hidden="true" />
          <div className={styles.fadeRight} aria-hidden="true" />
        </div>

        {/* Submit CTA */}
        <div className={styles.inner}>
          <motion.div
            className={styles.submitCta}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className={styles.submitCtaText}>
              Has Patmos Choir touched your life? We'd love to hear your story.
            </p>
            <button
              type="button"
              className={styles.submitCtaBtn}
              onClick={() => setModalOpen(true)}
            >
              <PenIcon />
              Share Your Testimonial
            </button>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {modalOpen && <ShareModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
