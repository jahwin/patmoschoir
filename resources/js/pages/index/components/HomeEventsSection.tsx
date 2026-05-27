import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link, usePage } from "@inertiajs/react";
import styles from "./HomeEventsSection.module.scss";
import TicketModal from "@/components/modal/TicketModal";
import PaymentModal from "@/components/modal/PaymentModal";
import { EPayingType, PaymentWidget, PricingItem, VotingPricingItem } from "@/types/shared/ICommon";
import { GET_EVENT_PAYMENT_WIDGET_URL } from "@/types/shared/urls";

/**
 * Shape of a single event row from the local DB `events` table,
 * as serialised by Laravel (date is a full ISO-8601 string because
 * of the `date` cast + serializeDate).
 * The `pricings` array is injected server-side by WebController
 * via the Watch pricing API.
 */
interface LocalEvent {
  id: number;
  event_id: string | null;      // Watch event ID (e.g. "99")
  title: string;
  slug: string;
  description: string | null;
  date: string;                 // "2026-08-15T00:00:00.000000Z"
  start_time: string;           // "18:00:00"
  end_time: string | null;      // "23:59:00" | null
  location: string;
  image: string | null;         // resolved Storage URL, e.g. "/storage/events/..."
  booking_link: string | null;
  ussd: string | null;
  visibility: "Public" | "Unlisted";
  created_at: string;
  updated_at: string;
  /** Pricing tiers from Watch API — empty [] when no tickets set up yet */
  pricings: PricingItem[];
}

interface PageProps {
  events?: LocalEvent[];
}

/** Parse any ISO date/datetime string safely, avoiding timezone day-shift */
const parseDate = (d: string): Date => {
  // Slice just the date part so we can fix to local midnight
  const datePart = d.slice(0, 10); // "2026-08-15"
  const [y, mo, day] = datePart.split("-").map(Number);
  return new Date(y, mo - 1, day);
};

const fmtDate = (d: string) => {
  const date = parseDate(d);
  return {
    month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    day: date.getDate(),
    weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
    full: date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  };
};

const fmtTime = (t: string | null): string | null => {
  if (!t) return null;
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hr = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hr}:${String(m).padStart(2, "0")} ${ampm}`;
};

const isUpcoming = (d: string) => parseDate(d) >= new Date(new Date().toDateString());

export default function HomeEventsSection() {
  const { props, url } = usePage<PageProps>();
  const events: LocalEvent[] = props.events ?? [];
  const isHomePage = url.split("?")[0] === "/";

  const sorted = [...events].sort((a, b) => {
    const aUp = isUpcoming(a.date), bUp = isUpcoming(b.date);
    if (aUp !== bUp) return aUp ? -1 : 1;
    const diff = parseDate(a.date).getTime() - parseDate(b.date).getTime();
    return aUp ? diff : -diff;
  });

  const visible = isHomePage ? sorted.slice(0, 2) : sorted;

  if (visible.length === 0) {
    return null;
  }

  // Ticketed concerts = has event_id or booking_link; outreach = neither
  const CONCERTS = visible.filter((e) => e.event_id || e.booking_link);
  const OUTREACH = visible.filter((e) => !e.event_id && !e.booking_link);

  // ── Payment modal state ──
  const [activeEvent, setActiveEvent] = useState<LocalEvent | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [email, setEmail] = useState("");
  const [paymentWidget, setPaymentWidget] = useState<PaymentWidget | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const openTickets = (event: LocalEvent) => {
    setActiveEvent(event);
    setSelectedTicket(null);
    setNumberOfPeople(1);
    setEmail("");
    setPaymentError(null);
    setPaymentWidget(null);
    setShowTicketModal(true);
  };

  const fetchPaymentWidget = async (selectedPricing: PricingItem | VotingPricingItem) => {
    setPaymentLoading(true);
    setPaymentError(null);

    try {
      const isPricing = (p: PricingItem | VotingPricingItem): p is PricingItem =>
        "pricing_id" in p;

      if (!isPricing(selectedPricing)) throw new Error("Invalid pricing type");

      const payload = {
        eventId: selectedPricing.event_id,
        selected_price: selectedPricing.pricing_id,
        selected_amount: selectedPricing.amount,
        numberOfPeople: numberOfPeople.toString(),
        emailDelivery: email ? email.split("@")[0] : "guest",
        currency: selectedPricing.currency,
        url: "/event/item/pay",
        amount: selectedPricing.amount * numberOfPeople,
        first_name: "",
        last_name: "",
        email: email || "",
        phone_number: "",
      };

      const res = await fetch(GET_EVENT_PAYMENT_WIDGET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = `HTTP error ${res.status}`;
        try { const e = await res.json(); if (e.message) msg = e.message; } catch {}
        throw new Error(msg);
      }

      const data: PaymentWidget = await res.json();
      if (data.status === "ok" && data.iframeUrl) {
        setPaymentWidget(data);
        setShowTicketModal(false);
        setShowPaymentModal(true);
      } else {
        throw new Error(data.message || "Failed to load payment");
      }
    } catch (err) {
      setPaymentLoading(false);
      setPaymentError(err instanceof Error ? err.message : "Payment failed");
      setShowPaymentModal(false);
    }
  };

  useEffect(() => {
    // Only listen when our payment modal is actually open — prevents
    // donation iframe messages from accidentally triggering the ticket modal.
    if (!showPaymentModal) return;

    const handler = (e: MessageEvent) => {
      if (e.data?.type !== "PAYMENT_STATUS") return;
      switch (e.data.status) {
        case "init":
        case "success":
          setPaymentLoading(false);
          break;
        case "failed":
          setPaymentLoading(false);
          setShowPaymentModal(true);
          break;
        case "close":
          setShowTicketModal(true);
          setPaymentLoading(false);
          setShowPaymentModal(false);
          break;
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [showPaymentModal]);

  // ── Ticket button logic per event ──
  const renderTicketAction = (event: LocalEvent) => {
    if (event.event_id) {
      if (event.pricings.length > 0) {
        return (
          <button type="button" className={styles.concertBtn} onClick={() => openTickets(event)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/>
            </svg>
            Buy Tickets
          </button>
        );
      }
      return (
        <span className={styles.comingSoonBadge}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          Tickets Coming Soon
        </span>
      );
    }
    if (event.booking_link) {
      return (
        <a href={event.booking_link} target="_blank" rel="noopener noreferrer" className={styles.concertBtn}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Book Now
        </a>
      );
    }
    return null;
  };

  return (
    <>
      <section id="events" className={styles.section}>
        <div className={styles.bgDeco} aria-hidden="true">
          <span className={styles.bgDecoCircle} />
          <span className={styles.bgDecoLine} />
        </div>

        <div className={styles.inner}>

          {/* ── SECTION TITLE (home page only) ── */}
          {isHomePage && (
            <motion.div
              className={styles.header}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className={styles.eyebrow}>Our Schedule</span>
              <h1 className={styles.title}>Events & Ministry</h1>
              <p className={styles.subtitle}>Join us in worship, outreach, and community</p>
            </motion.div>
          )}

          {/* ── CONCERTS ── */}
          {CONCERTS.length > 0 && (
            <>
              <div className={styles.blockHeader}>
                <span className={styles.blockLabel}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                  Concerts
                </span>
                <span className={styles.blockLine} aria-hidden="true" />
              </div>

              <div className={styles.concertGrid}>
                {CONCERTS.map((event, i) => {
                  const d = fmtDate(event.date);
                  const time = fmtTime(event.start_time);
                  const upcoming = isUpcoming(event.date);
                  return (
                    <motion.article
                      key={event.id}
                      className={styles.concertCard}
                      initial={{ opacity: 0, y: 32 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.55, delay: i * 0.1 }}
                    >
                      <div className={styles.concertCardAccent} />
                      {event.image && (
                        <div
                          className={styles.concertCardCover}
                          style={{ backgroundImage: `url(${event.image})` }}
                          aria-hidden="true"
                        />
                      )}
                      <div className={styles.concertCardBody}>
                        <div className={styles.concertDateBadge}>
                          <span className={styles.concertMonth}>{d.month}</span>
                          <span className={styles.concertDay}>{d.day}</span>
                        </div>

                        <div className={styles.concertInfo}>
                          <div className={styles.statusRow}>
                            <span className={upcoming ? styles.badgeUpcoming : styles.badgePast}>
                              {upcoming ? "Upcoming" : "Past"}
                            </span>
                          </div>
                          <h3 className={styles.concertName}>{event.title}</h3>

                          <div className={styles.concertMeta}>
                            <span>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                              {time && <>{time} &nbsp;·&nbsp;</>}{d.weekday}
                            </span>
                            <span>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                              {event.location}
                            </span>
                            {event.ussd && (
                              <span>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                                {event.ussd}
                              </span>
                            )}
                          </div>

                          {event.description && (
                            <p className={styles.concertDesc}>{event.description}</p>
                          )}

                          {upcoming && renderTicketAction(event)}
                        </div>
                      </div>
                      <div className={styles.concertCardNoise} aria-hidden="true" />
                    </motion.article>
                  );
                })}
              </div>
            </>
          )}

          {/* ── OUTREACH ── */}
          {OUTREACH.length > 0 && (
            <>
              <div className={styles.blockHeader} style={{ marginTop: CONCERTS.length > 0 ? "4rem" : undefined }}>
                <span className={styles.blockLabel}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
                  </svg>
                  Outreach Programs
                </span>
                <span className={styles.blockLine} aria-hidden="true" />
              </div>

              <div className={styles.outreachGrid}>
                {OUTREACH.map((event, i) => {
                  const d = fmtDate(event.date);
                  const time = fmtTime(event.start_time);
                  const upcoming = isUpcoming(event.date);
                  return (
                    <motion.article
                      key={event.id}
                      className={styles.outreachCard}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                    >
                      {event.image && (
                        <div
                          className={styles.outreachCardCover}
                          style={{ backgroundImage: `url(${event.image})` }}
                          aria-hidden="true"
                        />
                      )}
                      <div className={styles.outreachIndex} aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className={styles.outreachBody}>
                        <div className={styles.statusRow}>
                          <span className={upcoming ? styles.badgeUpcoming : styles.badgePast}>
                            {upcoming ? "Upcoming" : "Past"}
                          </span>
                        </div>
                        <h3 className={styles.outreachName}>{event.title}</h3>
                        <div className={styles.outreachMeta}>
                          <span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            {d.full}
                          </span>
                          {time && (
                            <span>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                              {time}
                            </span>
                          )}
                          <span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            {event.location}
                          </span>
                        </div>
                        {event.description && (
                          <p className={styles.outreachDesc}>{event.description}</p>
                        )}
                      </div>
                      <div className={styles.outreachTag}>Outreach</div>
                    </motion.article>
                  );
                })}
              </div>
            </>
          )}

          {/* ── EMPTY STATE ── */}
          {visible.length === 0 && (
            <div className={styles.emptyState}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <p>No events scheduled yet. Check back soon.</p>
            </div>
          )}

          {/* ── VIEW MORE (home page only) ── */}
          {isHomePage && sorted.length > 2 && (
            <motion.div
              className={styles.footer}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/events" className={styles.viewAllBtn}>
                View More Events
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </motion.div>
          )}

        </div>
      </section>

      {/* ── TICKET MODAL ── */}
      <TicketModal
        showModal={showTicketModal}
        setShowModal={setShowTicketModal}
        selectedTicket={selectedTicket}
        setSelectedTicket={setSelectedTicket}
        numberOfPeople={numberOfPeople}
        setNumberOfPeople={setNumberOfPeople}
        email={email}
        setEmail={setEmail}
        pricingData={activeEvent?.pricings ?? []}
        paymentLoading={paymentLoading}
        paymentError={paymentError}
        setPaymentError={setPaymentError}
        fetchPaymentWidget={fetchPaymentWidget}
        payingType={EPayingType.EVENT_PAYMENT}
        modalText={activeEvent?.title ?? "Choose Ticket"}
        contentDescription={
          activeEvent
            ? `${fmtDate(activeEvent.date).full}${fmtTime(activeEvent.start_time) ? " · " + fmtTime(activeEvent.start_time) : ""} · ${activeEvent.location}`
            : "You are about to start payment process"
        }
      />

      {/* ── PAYMENT MODAL ── */}
      <PaymentModal
        showPaymentModal={showPaymentModal}
        setShowPaymentModal={setShowPaymentModal}
        paymentWidget={paymentWidget}
        paymentLoading={paymentLoading}
        paymentError={paymentError}
        pricingData={activeEvent?.pricings ?? []}
        selectedTicket={selectedTicket}
        fetchPaymentWidget={fetchPaymentWidget}
      />
    </>
  );
}
