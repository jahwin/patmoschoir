import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, usePage } from "@inertiajs/react";
import styles from "./HomeEventsSection.module.scss";
import img8 from "../../../../assets/patmos/8.jpeg";
import img9 from "../../../../assets/patmos/9.jpeg";
import img10 from "../../../../assets/patmos/10.jpeg";
import img11 from "../../../../assets/patmos/11.jpeg";

interface Ticket {
  tier: string;
  section: string;
  description: string;
  price: number;
  available: boolean;
}

interface Event {
  id: number;
  type: "concert" | "outreach";
  name: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  coverImage?: string;
  tickets?: Ticket[];
}

const EVENTS: Event[] = [
  {
    id: 1,
    type: "concert",
    name: "Songs of Worship — A Night of Praise",
    date: "Saturday, May 30, 2026",
    time: "6:00 PM",
    location: "Kigali Convention Center, Rwanda",
    coverImage: img8,
    description:
      "An unforgettable evening of heartfelt worship as Patmos Choir lifts voices in praise. Come experience the transforming presence of God through music, prayer, and community.",
    tickets: [
      { tier: "VIP", section: "Front Row A–C", description: "Reserved front-row seating with welcome drink", price: 50, available: true },
      { tier: "Premium", section: "Rows D–H", description: "Excellent view with reserved allocated seat", price: 30, available: true },
      { tier: "Standard", section: "Main Hall", description: "Open seating in the main concert hall", price: 15, available: true },
      { tier: "Balcony", section: "Upper Level", description: "Elevated view from the upper balcony", price: 10, available: false },
    ],
  },
  {
    id: 2,
    type: "concert",
    name: "Praise & Prayer Night",
    date: "Saturday, June 14, 2026",
    time: "7:00 PM",
    location: "SDA Church, Remera, Kigali",
    coverImage: img9,
    description:
      "A sacred night dedicated to prayer and worship. Patmos Choir leads the congregation in a powerful encounter with God — expect healing, hope, and the glory of His presence.",
    tickets: [
      { tier: "VIP", section: "Front Row A–D", description: "Reserved front-row seating", price: 25, available: true },
      { tier: "Standard", section: "Main Hall", description: "General seating, open floor", price: 10, available: true },
    ],
  },
  {
    id: 3,
    type: "outreach",
    name: "Hospital Outreach Ministry",
    date: "Saturday, March 15, 2026",
    time: "10:00 AM",
    location: "CHUK Hospital, Kigali",
    coverImage: img10,
    description:
      "Bringing music and hope to patients who cannot attend worship services. We visit wards, sing, pray, and carry the peace of God to those who need it most.",
  },
  {
    id: 4,
    type: "outreach",
    name: "Youth Rehabilitation Ministry",
    date: "Saturday, April 5, 2026",
    time: "9:00 AM",
    location: "Nyanza Rehabilitation Center",
    description:
      "Sharing the message of redemption and grace through song with young people in rehabilitation. Every heart deserves to hear the Good News and experience love.",
  },
  {
    id: 5,
    type: "outreach",
    name: "Elderly Home Visit",
    date: "Sunday, April 27, 2026",
    time: "2:00 PM",
    location: "Maison des Aînés, Nyamirambo",
    coverImage: img11,
    description:
      "Visiting the elderly who can no longer attend church — bringing worship, fellowship, and the warmth of community to those who have given so much.",
  },
];

const CONCERTS = EVENTS.filter((e) => e.type === "concert");
const OUTREACH = EVENTS.filter((e) => e.type === "outreach");

const TIER_COLORS: Record<string, string> = {
  VIP: "#c9a962",
  Premium: "#8b7355",
  Standard: "#555",
  Balcony: "#444",
};

export default function HomeEventsSection() {
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);

  return (
    <>
      <section id="events" className={styles.section}>
        {/* Decorative background elements */}
        <div className={styles.bgDeco} aria-hidden="true">
          <span className={styles.bgDecoCircle} />
          <span className={styles.bgDecoLine} />
        </div>

        <div className={styles.inner}>

          {/* ── SECTION TITLE ── */}
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.eyebrow}>Our Schedule</span>
            <h2 className={styles.title}>Events & Ministry</h2>
            <p className={styles.subtitle}>Join us in worship, outreach, and community</p>
          </motion.div>

          {/* ── CONCERTS ── */}
          <div className={styles.blockHeader}>
            <span className={styles.blockLabel}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
              Upcoming Concerts
            </span>
            <span className={styles.blockLine} aria-hidden="true" />
          </div>

          <div className={styles.concertGrid}>
            {CONCERTS.map((event, i) => (
              <motion.article
                key={event.id}
                className={styles.concertCard}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
              >
                <div className={styles.concertCardAccent} />
                {event.coverImage && (
                  <div
                    className={styles.concertCardCover}
                    style={{ backgroundImage: `url(${event.coverImage})` }}
                    aria-hidden="true"
                  />
                )}
                <div className={styles.concertCardBody}>
                  <div className={styles.concertDateBadge}>
                    <span className={styles.concertMonth}>
                      {event.date.split(" ")[1]}
                    </span>
                    <span className={styles.concertDay}>
                      {event.date.split(" ")[2]?.replace(",", "")}
                    </span>
                  </div>

                  <div className={styles.concertInfo}>
                    <h3 className={styles.concertName}>{event.name}</h3>

                    <div className={styles.concertMeta}>
                      <span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {event.time} &nbsp;·&nbsp; {event.date.split(",")[0]}
                      </span>
                      <span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {event.location}
                      </span>
                    </div>

                    <p className={styles.concertDesc}>{event.description}</p>

                    <button
                      type="button"
                      className={styles.concertBtn}
                      onClick={() => setActiveEvent(event)}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/></svg>
                      Buy Tickets
                    </button>
                  </div>
                </div>
                <div className={styles.concertCardNoise} aria-hidden="true" />
              </motion.article>
            ))}
          </div>

          {/* ── OUTREACH ── */}
          <div className={styles.blockHeader} style={{ marginTop: "4rem" }}>
            <span className={styles.blockLabel}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
              </svg>
              Outreach Programs
            </span>
            <span className={styles.blockLine} aria-hidden="true" />
          </div>

          <div className={styles.outreachGrid}>
            {OUTREACH.map((event, i) => (
              <motion.article
                key={event.id}
                className={styles.outreachCard}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {event.coverImage && (
                  <div
                    className={styles.outreachCardCover}
                    style={{ backgroundImage: `url(${event.coverImage})` }}
                    aria-hidden="true"
                  />
                )}
                <div className={styles.outreachIndex} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className={styles.outreachBody}>
                  <h3 className={styles.outreachName}>{event.name}</h3>
                  <div className={styles.outreachMeta}>
                    <span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      {event.date}
                    </span>
                    {event.time && (
                      <span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {event.time}
                      </span>
                    )}
                    <span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {event.location}
                    </span>
                  </div>
                  <p className={styles.outreachDesc}>{event.description}</p>
                </div>
                <div className={styles.outreachTag}>Outreach</div>
              </motion.article>
            ))}
          </div>

          {/* View All link — hidden on the dedicated /events page */}
          {usePage().url.split("?")[0] === "/" && (
            <motion.div
              className={styles.footer}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/events" className={styles.viewAllBtn}>
                View All Events
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </motion.div>
          )}

        </div>
      </section>

      {/* ── TICKET MODAL ── */}
      <AnimatePresence>
        {activeEvent && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActiveEvent(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Tickets for ${activeEvent.name}`}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className={styles.modalHead}>
                <div>
                  <span className={styles.modalEyebrow}>Select Your Tickets</span>
                  <h3 className={styles.modalTitle}>{activeEvent.name}</h3>
                  <p className={styles.modalMeta}>
                    {activeEvent.date} &nbsp;·&nbsp; {activeEvent.time} &nbsp;·&nbsp; {activeEvent.location}
                  </p>
                </div>
                <button
                  type="button"
                  className={styles.modalClose}
                  onClick={() => setActiveEvent(null)}
                  aria-label="Close"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>

              {/* Ticket cards */}
              <div className={styles.ticketGrid}>
                {activeEvent.tickets?.map((ticket, i) => (
                  <motion.div
                    key={ticket.tier}
                    className={`${styles.ticketCard} ${!ticket.available ? styles.ticketSoldOut : ""}`}
                    style={{ "--tier-color": TIER_COLORS[ticket.tier] ?? "#555" } as React.CSSProperties}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.3 }}
                  >
                    {/* Watermark letter */}
                    <span className={styles.ticketWatermark} aria-hidden="true">
                      {ticket.tier[0]}
                    </span>

                    <div className={styles.ticketInner}>
                      <span className={styles.ticketTier}>{ticket.tier}</span>
                      <span className={styles.ticketPrice}>${ticket.price}</span>
                      <span className={styles.ticketSection}>{ticket.section}</span>
                    </div>

                    <button
                      type="button"
                      className={styles.buyBtn}
                      disabled={!ticket.available}
                      aria-disabled={!ticket.available}
                    >
                      {ticket.available ? "Buy Now" : "Sold Out"}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
