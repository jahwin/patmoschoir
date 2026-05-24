import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./HomeSupportMinistrySection.module.scss";
import type { DonationAmount, DonationCurrency, DonationData } from "../index";

const FALLBACK_AMOUNTS: DonationAmount[] = [
  { amount: 10, currency: "USD" },
  { amount: 25, currency: "USD" },
  { amount: 50, currency: "USD" },
  { amount: 100, currency: "USD" },
];

function formatAmount(amount: number, currency: DonationCurrency): string {
  if (currency === "RWF") {
    return `RWF ${amount.toLocaleString()}`;
  }
  return `$${amount % 1 === 0 ? amount : amount.toFixed(2)}`;
}

const CURRENCIES: DonationCurrency[] = ["USD", "RWF"];

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

interface HomeSupportMinistrySectionProps {
  donation: DonationData;
  onDonate?: () => void;
}

export default function HomeSupportMinistrySection({ donation, onDonate }: HomeSupportMinistrySectionProps) {
  const presetAmounts = useMemo(
    () => (donation.amounts && donation.amounts.length > 0 ? donation.amounts : FALLBACK_AMOUNTS),
    [donation.amounts],
  );

  const currencyNote = useMemo(() => {
    const currencies = [...new Set(presetAmounts.map((item) => item.currency))];
    if (currencies.length === 1) {
      return currencies[0] === "RWF" ? "all amounts in RWF" : "all amounts in USD";
    }
    return `amounts in ${currencies.join(" & ")}`;
  }, [presetAmounts]);

  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const defaultPreset = presetAmounts[1] ?? presetAmounts[0] ?? null;
  const [selectedPreset, setSelectedPreset] = useState<DonationAmount | null>(defaultPreset);
  const [activeCurrency, setActiveCurrency] = useState<DonationCurrency>(
    defaultPreset?.currency ?? "USD",
  );
  const [customAmount, setCustomAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const [autoClosing, setAutoClosing] = useState(false);

  const amountValue = useMemo(() => {
    if (customAmount.trim()) return Number(customAmount);
    return selectedPreset?.amount ?? 0;
  }, [customAmount, selectedPreset]);

  const eyebrow = donation.subdescription?.trim() || "Support the Ministry";
  const title = donation.title?.trim() || "Build the Harbor";
  const pullQuote = donation.description?.trim();
  const cardTitle = donation.card_title?.trim() || "Partner With Us";
  const cardText = donation.card_description?.trim();

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
    const preset = presetAmounts[1] ?? presetAmounts[0] ?? null;
    setSelectedPreset(preset);
    setActiveCurrency(preset?.currency ?? "USD");
    setCustomAmount("");
  };

  const handleClose = () => { setIsOpen(false); resetModal(); };

  const handlePresetClick = (preset: DonationAmount) => {
    setSelectedPreset(preset);
    setActiveCurrency(preset.currency);
    setCustomAmount("");
  };

  const isPresetActive = (preset: DonationAmount) =>
    !customAmount &&
    selectedPreset?.amount === preset.amount &&
    selectedPreset?.currency === preset.currency;

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
          currency: activeCurrency,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Unable to start the donation.");
      }
      const data = await res.json();
      if (data?.iframe_url) {
        onDonate?.();
        setIframeUrl(data.iframe_url);
      } else {
        throw new Error("Payment gateway did not return a payment link.");
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Unable to start the donation.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.bgGlow} aria-hidden="true" />
        <div className={styles.bgOrb} aria-hidden="true" />

        <div className={styles.inner}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.eyebrow}>Support the Ministry</span>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.titleRule} aria-hidden="true" />
          </motion.div>

          <div className={styles.body}>
            {/* Left — quote + pillars */}
            <motion.div
              className={styles.leftCol}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {donation.description && (
                <p className={styles.pullQuote}>
                  "{donation.description}"
                </p>
              )}
              {donation.subdescription && (
                <p className={styles.bodyText}>{donation.subdescription}</p>
              )}
            </motion.div>

            <motion.div
              className={styles.givingCard}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className={styles.cardTopBar} aria-hidden="true" />
              <h3 className={styles.cardTitle}>{cardTitle}</h3>
              {cardText && <p className={styles.cardText}>{cardText}</p>}

              {presetAmounts.length > 0 && (
                <>
                  <div className={styles.cardDivider} aria-hidden="true" />
                  <div className={styles.cardQuickAmounts}>
                    {presetAmounts.map((preset) => (
                      <span
                        key={`${preset.currency}-${preset.amount}`}
                        className={styles.cardAmount}
                      >
                        {formatAmount(preset.amount, preset.currency)}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <button
                type="button"
                className={styles.donateBtn}
                onClick={() => setIsOpen(true)}
              >
                <HeartIcon />
                Donate Now
              </button>

              <p className={styles.cardNote}>
                <LockIcon /> Secure payment — {currencyNote}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

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

              <div className={styles.modalSection}>
                <span className={styles.fieldLabel}>
                  Choose Amount <em>({activeCurrency})</em>
                </span>
                <div className={styles.amountGrid}>
                  {presetAmounts.map((preset) => (
                    <button
                      key={`${preset.currency}-${preset.amount}`}
                      type="button"
                      className={`${styles.amountTile} ${isPresetActive(preset) ? styles.amountTileActive : ""}`}
                      onClick={() => handlePresetClick(preset)}
                    >
                      <span className={styles.amountTileValue}>
                        {formatAmount(preset.amount, preset.currency)}
                      </span>
                      {isPresetActive(preset) && (
                        <span className={styles.amountCheck} aria-hidden="true">✓</span>
                      )}
                    </button>
                  ))}
                </div>
                <div
                  className={`${styles.customRow} ${
                    customAmount || !selectedPreset ? styles.customRowActive : ""
                  }`}
                >
                  <input
                    className={styles.customInput}
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedPreset(null);
                    }}
                    onFocus={() => setSelectedPreset(null)}
                    placeholder="Enter custom amount"
                    inputMode="decimal"
                    aria-label={`Custom donation amount in ${activeCurrency}`}
                  />
                  <div
                    className={styles.currencySelector}
                    role="group"
                    aria-label="Donation currency"
                  >
                    {CURRENCIES.map((currency) => (
                      <button
                        key={currency}
                        type="button"
                        className={`${styles.currencyOption} ${
                          activeCurrency === currency ? styles.currencyOptionActive : ""
                        }`}
                        onClick={() => {
                          setActiveCurrency(currency);
                          setSelectedPreset(null);
                        }}
                        aria-pressed={activeCurrency === currency}
                        aria-label={`Use ${currency}`}
                      >
                        {currency}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.modalSep} aria-hidden="true" />

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
