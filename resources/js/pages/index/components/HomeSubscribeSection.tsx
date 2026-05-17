import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import styles from "./HomeSubscribeSection.module.scss";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export default function HomeSubscribeSection() {
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const { data, setData, post, processing, errors, reset } = useForm({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    if (!statusMessage) return;
    const id = window.setTimeout(() => setStatusMessage(null), 5000);
    return () => window.clearTimeout(id);
  }, [statusMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(name as keyof typeof data, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    post("/subscribe", {
      preserveScroll: true,
      onSuccess: () => {
        setStatusMessage({ type: "success", text: "Welcome to the Patmos community! We'll be in touch soon." });
        reset();
      },
      onError: () => {
        setStatusMessage({ type: "error", text: "Please fix the errors below and try again." });
      },
    });
  };

  return (
    <section id="join-us" className={styles.section}>
      <div className={styles.inner}>

        {/* Left — heading */}
        <motion.div
          className={styles.left}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          <motion.h2 className={styles.title} variants={fadeUp}>
            Join Us
          </motion.h2>
          <motion.p className={styles.description} variants={fadeUp}>
            Become part of the Patmos family. Fill in your details below and
            we'll keep you connected to our gatherings, worship releases, and
            community updates.
          </motion.p>

          <motion.div className={styles.dividerLine} variants={fadeUp} />

          {/* <motion.blockquote className={styles.quote} variants={fadeUp}>
            "Where two or three gather in my name, there am I with them."
            <cite>— Matthew 18:20</cite>
          </motion.blockquote> */}
        </motion.div>

        {/* Right — form */}
        <motion.div
          className={styles.right}
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <form className={styles.form} onSubmit={handleSubmit} noValidate>

            {/* Name row */}
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="join-first_name" className={styles.label}>First Name <span className={styles.required}>*</span></label>
                <input
                  id="join-first_name"
                  type="text"
                  name="first_name"
                  value={data.first_name}
                  onChange={handleChange}
                  required
                  autoComplete="given-name"
                  className={styles.input}
                  placeholder="John"
                />
                {errors.first_name && <p className={styles.error}>{errors.first_name}</p>}
              </div>
              <div className={styles.field}>
                <label htmlFor="join-last_name" className={styles.label}>Last Name <span className={styles.required}>*</span></label>
                <input
                  id="join-last_name"
                  type="text"
                  name="last_name"
                  value={data.last_name}
                  onChange={handleChange}
                  required
                  autoComplete="family-name"
                  className={styles.input}
                  placeholder="Doe"
                />
                {errors.last_name && <p className={styles.error}>{errors.last_name}</p>}
              </div>
            </div>

            {/* Email + Phone */}
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="join-email" className={styles.label}>Email Address <span className={styles.required}>*</span></label>
                <input
                  id="join-email"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className={styles.input}
                  placeholder="you@example.com"
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
              </div>
              <div className={styles.field}>
                <label htmlFor="join-phone" className={styles.label}>Phone Number</label>
                <input
                  id="join-phone"
                  type="tel"
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  className={styles.input}
                  placeholder="+250 700 000 000"
                />
                {errors.phone && <p className={styles.error}>{errors.phone}</p>}
              </div>
            </div>

            {/* Country + City */}
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="join-country" className={styles.label}>Country <span className={styles.required}>*</span></label>
                <input
                  id="join-country"
                  type="text"
                  name="country"
                  value={data.country}
                  onChange={handleChange}
                  required
                  autoComplete="country-name"
                  className={styles.input}
                  placeholder="Rwanda"
                />
                {errors.country && <p className={styles.error}>{errors.country}</p>}
              </div>
              <div className={styles.field}>
                <label htmlFor="join-city" className={styles.label}>City</label>
                <input
                  id="join-city"
                  type="text"
                  name="city"
                  value={data.city}
                  onChange={handleChange}
                  autoComplete="address-level2"
                  className={styles.input}
                  placeholder="Kigali"
                />
                {errors.city && <p className={styles.error}>{errors.city}</p>}
              </div>
            </div>

            {/* Address */}
            <div className={styles.field}>
              <label htmlFor="join-address" className={styles.label}>Street / Area Address</label>
              <input
                id="join-address"
                type="text"
                name="address"
                value={data.address}
                onChange={handleChange}
                autoComplete="street-address"
                className={styles.input}
                placeholder="123 Main Street, Nyarugenge"
              />
              {errors.address && <p className={styles.error}>{errors.address}</p>}
            </div>

            {statusMessage && (
              <div className={`${styles.status} ${statusMessage.type === "success" ? styles.statusSuccess : styles.statusError}`}>
                {statusMessage.text}
              </div>
            )}

            <button type="submit" className={styles.btn} disabled={processing}>
              {processing ? "Submitting…" : "Join the Community"}
            </button>

          </form>
        </motion.div>

      </div>
    </section>
  );
}
