import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./HomeSupportMinistrySection.module.scss";

const PRESET_AMOUNTS = [10, 25, 50, 100];

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function HomeSupportMinistrySection({ onDonate }: { onDonate?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(PRESET_AMOUNTS[1]);
  const [customAmount, setCustomAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const [autoClosing, setAutoClosing] = useState(false);

  const amountValue = useMemo(() => {
    if (customAmount.trim()) return Number(customAmount);
    return selectedAmount ?? 0;
  }, [customAmount, selectedAmount]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && !iframeUrl) setIsOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [isOpen, iframeUrl]);

  useEffect(() => {
    if (!iframeUrl) return;
    const handleMessage = (event: MessageEvent) => {
      const { type, status } = event.data ?? {};
      if (type !== "PAYMENT_STATUS") return;
      if (status === "success") {
        setAutoClosing(true);
        setTimeout(handleClose, 1000);
      } else if (status === "failed" || status === "close") {
        handleClose();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [iframeUrl]);

  const resetModal = () => {
    setErrorMessage(""); setIframeUrl(""); setSubmitting(false);
    setAutoClosing(false); setFullName(""); setEmail(""); setPhone("");
    setSelectedAmount(PRESET_AMOUNTS[1]); setCustomAmount("");
  };

  const handleClose = () => { setIsOpen(false); resetModal(); };

  const handlePresetClick = (amount: number) => { setSelectedAmount(amount); setCustomAmount(""); };

  const getCsrfToken = () => {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : "";
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    if (!fullName.trim()) { setErrorMessage("Full name is required."); return; }
    if (!amountValue || Number.isNaN(amountValue) || amountValue <= 0) {
      setErrorMessage("Please enter a valid donation amount."); return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/donations/initiate", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", "X-XSRF-TOKEN": getCsrfToken() },
        body: JSON.stringify({
          full_name: fullName.trim(),
          email: email.trim() || null,
          phone: phone.trim() || null,
          amount: amountValue,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Unable to start the donation.");
      }
      const data = await res.json();
      if (data?.iframe_url) setIframeUrl(data.iframe_url);
      else throw new Error("Payment gateway did not return a payment link.");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Unable to start the donation.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className={styles.section}>
        {/* Decorative background elements */}
        <div className={styles.bgGlow} aria-hidden="true" />
        <div className={styles.bgOrb} aria-hidden="true" />

        <div className={styles.inner}>
          {/* Header */}
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.eyebrow}>Support the Ministry</span>
            <h2 className={styles.title}>Build the Harbor</h2>
            <div className={styles.titleRule} aria-hidden="true" />
          </motion.div>

          {/* Body grid */}
          <div className={styles.body}>
            {/* Left — quote + pillars */}
            <motion.div
              className={styles.leftCol}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className={styles.pullQuote}>
                "Every gift becomes a seed. Every seed becomes a story. Every story becomes a testimony."
              </p>
              <p className={styles.bodyText}>
                This ministry exists because hearts believe in the vision. Through your generosity,
                more people can experience worship, healing, and hope. You are not just a donor —
                you are a co-builder of something eternal.
              </p>
            </motion.div>

            {/* Right — giving card */}
            <motion.div
              className={styles.givingCard}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className={styles.cardTopBar} aria-hidden="true" />
              <h3 className={styles.cardTitle}>Partner With Us</h3>
              <p className={styles.cardText}>
                Your offering fuels worship that reaches beyond four walls — into hospitals,
                streets, schools, and hearts that have never heard a song of hope.
              </p>

              <div className={styles.cardDivider} aria-hidden="true" />

              <div className={styles.cardQuickAmounts}>
                {PRESET_AMOUNTS.map((amt) => (
                  <span key={amt} className={styles.cardAmount}>${amt}</span>
                ))}
              </div>

              <button
                type="button"
                className={styles.donateBtn}
                onClick={() => setIsOpen(true)}
              >
                <HeartIcon />
                Donate Now
              </button>

              <p className={styles.cardNote}>
                <LockIcon /> Secure payment — all amounts in USD
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Donation modal ── */}
      <AnimatePresence>
        {isOpen && !iframeUrl && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label="Donate to Patmos Choir Ministry"
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

              {/* Modal header */}
              <div className={styles.modalHead}>
                <div>
                  <h3 className={styles.modalTitle}>Support the Ministry</h3>
                  <p className={styles.modalSubtitle}>Patmos Choir — Donation</p>
                </div>
                <button
                  type="button"
                  className={styles.modalClose}
                  onClick={handleClose}
                  aria-label="Close donation modal"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className={styles.modalSep} aria-hidden="true" />

              {/* Amount */}
              <div className={styles.modalSection}>
                <span className={styles.fieldLabel}>Choose Amount <em>(USD)</em></span>
                <div className={styles.amountGrid}>
                  {PRESET_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      className={`${styles.amountTile} ${selectedAmount === amt && !customAmount ? styles.amountTileActive : ""}`}
                      onClick={() => handlePresetClick(amt)}
                    >
                      <span className={styles.amountTileValue}>${amt}</span>
                      {selectedAmount === amt && !customAmount && (
                        <span className={styles.amountCheck} aria-hidden="true">✓</span>
                      )}
                    </button>
                  ))}
                </div>
                <div className={`${styles.customRow} ${customAmount ? styles.customRowActive : ""}`}>
                  <span className={styles.currencySign}>$</span>
                  <input
                    className={styles.customInput}
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                    placeholder="Enter custom amount"
                    inputMode="decimal"
                    aria-label="Custom donation amount"
                  />
                </div>
              </div>

              <div className={styles.modalSep} aria-hidden="true" />

              {/* Donor info */}
              <div className={styles.modalSection}>
                <span className={styles.fieldLabel}>Your Details</span>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="donate-name">Full Name <span aria-hidden="true">*</span></label>
                  <input
                    id="donate-name"
                    className={styles.input}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    autoComplete="name"
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="donate-email">Email <span className={styles.optional}>(optional)</span></label>
                    <input
                      id="donate-email"
                      className={styles.input}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      autoComplete="email"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="donate-phone">Phone <span className={styles.optional}>(optional)</span></label>
                    <input
                      id="donate-phone"
                      className={styles.input}
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+250 7xx xxx xxx"
                      autoComplete="tel"
                    />
                  </div>
                </div>
              </div>

              {/* Error */}
              <AnimatePresence>
                {errorMessage && (
                  <motion.p
                    className={styles.error}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {errorMessage}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Footer actions */}
              <div className={styles.modalFoot}>
                <button
                  type="button"
                  className={styles.submitBtn}
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? (
                    <><span className={styles.spinner} aria-hidden="true" /> Processing…</>
                  ) : (
                    <><HeartIcon /> Proceed to Payment</>
                  )}
                </button>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={handleClose}
                  disabled={submitting}
                >
                  Cancel
                </button>
              </div>

              <p className={styles.modalNote}>
                <LockIcon /> Secured payment. Your details are encrypted and never stored.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Payment iframe ── */}
      <AnimatePresence>
        {iframeUrl && (
          <motion.div
            className={styles.iframeOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {autoClosing && (
              <p className={styles.iframeSuccess}>Payment successful — closing…</p>
            )}
            <iframe
              title="Donate to Patmos Choir Ministry"
              src={iframeUrl}
              className={styles.iframe}
              allow="payment"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
