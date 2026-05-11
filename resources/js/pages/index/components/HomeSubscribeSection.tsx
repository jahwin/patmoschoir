import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import styles from "./HomeSubscribeSection.module.scss";

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

export default function HomeSubscribeSection() {
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const { data, setData, post, processing, errors, reset } = useForm({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!statusMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setStatusMessage(null);
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [statusMessage]);

  const handleSubscribeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(name as keyof typeof data, value);
  };

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    post("/subscribe", {
      preserveScroll: true,
      onSuccess: () => {
        setStatusMessage({
          type: "success",
          text: "Thank you for subscribing! Your submission was successful.",
        });
        reset();
      },
      onError: () => {
        setStatusMessage({
          type: "error",
          text: "We could not submit your subscription. Please fix the errors and try again.",
        });
      },
    });
  };

  return (
    <section id="subscribe" className={styles.subscribe}>
      <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}>
        <motion.p className="main-section-subtitle" variants={sectionTitle}>
          Keep up to date
        </motion.p>
        <motion.h2 className="main-section-title" variants={sectionTitle}>
          Subscribe
        </motion.h2>
        <motion.p className="main-section-text" variants={sectionTitle}>
          Join the Mbonyi community and stay close to the journey. Receive updates about upcoming gatherings, new songs,
          and moments of worship shared with the world.
        </motion.p>

        <motion.form className={styles.subscribeForm} onSubmit={handleSubscribeSubmit} variants={staggerItem}>
          <div className={styles.subscribeRow}>
            <label htmlFor="subscribe-firstName" className={styles.subscribeLabel}>
              First name
            </label>
            <input
              id="subscribe-firstName"
              type="text"
              name="first_name"
              value={data.first_name}
              onChange={handleSubscribeChange}
              required
              autoComplete="given-name"
              className={styles.subscribeInput}
              placeholder="First name"
            />
            {errors.first_name && <p className={styles.subscribeError}>{errors.first_name}</p>}
          </div>

          <div className={styles.subscribeRow}>
            <label htmlFor="subscribe-lastName" className={styles.subscribeLabel}>
              Last name
            </label>
            <input
              id="subscribe-lastName"
              type="text"
              name="last_name"
              value={data.last_name}
              onChange={handleSubscribeChange}
              required
              autoComplete="family-name"
              className={styles.subscribeInput}
              placeholder="Last name"
            />
            {errors.last_name && <p className={styles.subscribeError}>{errors.last_name}</p>}
          </div>

          <div className={styles.subscribeRow}>
            <label htmlFor="subscribe-email" className={styles.subscribeLabel}>
              Email
            </label>
            <input
              id="subscribe-email"
              type="email"
              name="email"
              value={data.email}
              onChange={handleSubscribeChange}
              required
              autoComplete="email"
              className={styles.subscribeInput}
              placeholder="you@example.com"
            />
            {errors.email && <p className={styles.subscribeError}>{errors.email}</p>}
          </div>

          <div className={styles.subscribeRow}>
            <label htmlFor="subscribe-phone" className={styles.subscribeLabel}>
              Phone <span className={styles.subscribeOptional}>(optional)</span>
            </label>
            <input
              id="subscribe-phone"
              type="tel"
              name="phone"
              value={data.phone}
              onChange={handleSubscribeChange}
              autoComplete="tel"
              className={styles.subscribeInput}
              placeholder="+250 700 000 000"
            />
            {errors.phone && <p className={styles.subscribeError}>{errors.phone}</p>}
          </div>

          {statusMessage && (
            <div
              className={`${styles.subscribeStatus} ${
                statusMessage.type === "success" ? styles.subscribeStatusSuccess : styles.subscribeStatusError
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          <button type="submit" className={styles.subscribeBtn} disabled={processing}>
            {processing ? "Submitting..." : "Subscribe"}
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
}

