import { motion } from "motion/react";
import styles from "./HomeTicketsSection.module.scss";

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const sectionTitle = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export interface HomeShow {
  id: number;
  show_date: string | null;
  venue: string;
  city: string;
  state: string;
  title: string;
  ticket_url: string | null;
  ticket_button_text: string | null;
  no_tickets_button_text: string | null;
  created_at: string;
  updated_at: string;
}

const formatShowDate = (dateString: string | null) => {
  if (!dateString) {
    return 'TBA';
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).toUpperCase();
};


export default function HomeTicketsSection({ shows }: { shows: HomeShow[] }) {
  return (
    <section id="tickets" className={styles.tickets}>
      <div className={styles.ticketsOverlay} aria-hidden />

      <motion.div
        className={styles.ticketsInner}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <motion.p className="main-section-subtitle" variants={sectionTitle}>
          Check out your city
        </motion.p>
        <motion.h2 className="main-section-title" variants={sectionTitle}>
          Secure your ticket
        </motion.h2>

        <motion.div className={styles.showsList} variants={staggerContainer}>
          {shows.map((show) => (
            <motion.article
              key={show.id}
              className={styles.show}
              variants={staggerItem}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.showDetails}>
                <p className={styles.showDate}>{formatShowDate(show.show_date)}</p>
                <p className={styles.showVenue}>{show.title}</p>
              </div>
              <div className={styles.showLocationContainer}>
                <p className={styles.showLocation}>
                  {show.venue}, {show.city}, {show.state}
                </p>
                
                {
                  show.ticket_url ? (
                    <a href={show.ticket_url || '#'} className={styles.ticketBtn} target="_blank" rel="noopener noreferrer">
                      {show.ticket_url ? (show.ticket_button_text || 'Tickets') : (show.no_tickets_button_text || 'Stay Connected, Tickets will be available soon')}
                    </a>
                  ) : (
                    <span className={styles.soonBadge}>{show.no_tickets_button_text || 'Stay Connected, Tickets will be available soon'}</span>
                  )
                }
              </div>
              
            </motion.article>
          ))}
        </motion.div>

        <motion.div className="tickets-notify" variants={staggerItem}>
          <p className="tickets-notify-text">Get notified of upcoming concerts and events.</p>
          <a
            href="https://www.instagram.com/israelmbonyi"
            target="_blank"
            rel="noopener noreferrer"
            className="tickets-notify-btn"
          >
            Follow Israel Mbonyi
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

