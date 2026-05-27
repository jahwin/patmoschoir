import { useEffect, useMemo, useState } from 'react';
import styles from './DonateSection.module.scss';
import Button from '@/components/shared/Button';

interface DonateSectionProps {
  className?: string;
}

const PRESET_AMOUNTS = [10, 25, 50, 100];

export default function DonateSection({ className = "" }: DonateSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(PRESET_AMOUNTS[0]);
  const [customAmount, setCustomAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [autoClosing, setAutoClosing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const amountValue = useMemo(() => {
    if (customAmount.trim()) {
      return Number(customAmount);
    }
    return selectedAmount ?? 0;
  }, [customAmount, selectedAmount]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !iframeUrl) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, iframeUrl]);

  useEffect(() => {
    if (!iframeUrl) {
      return;
    }



    const handleMessage = (event: MessageEvent) => {
      const { type, status } = event.data ?? {};
      if (type !== 'PAYMENT_STATUS') return;
      if (status === 'success') {
        setIframeUrl('');
        setIsOpen(false);
        setShowSuccess(true);
        setCountdown(5);
      } else if (status === 'failed' || status === 'close') {
        handleClose();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [iframeUrl]);

  // Countdown + auto-close for success modal
  useEffect(() => {
    if (!showSuccess) return;
    if (countdown <= 0) { setShowSuccess(false); resetModal(); return; }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [showSuccess, countdown]);

  const resetModal = () => {
    setErrorMessage('');
    setStatusMessage('');
    setIframeUrl('');
    setSubmitting(false);
    setAutoClosing(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setSelectedAmount(PRESET_AMOUNTS[0]);
    setCustomAmount('');
  };

  const handleClose = () => {
    setIsOpen(false);
    resetModal();
  };

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const getCsrfToken = () => {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
  };

  const handleSubmit = async () => {
    setErrorMessage('');
    setStatusMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Full name is required.');
      return;
    }

    if (!amountValue || Number.isNaN(amountValue) || amountValue <= 0) {
      setErrorMessage('Please enter a valid donation amount.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/donations/initiate', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': getCsrfToken(),
        },
        body: JSON.stringify({
          full_name: fullName.trim(),
          email: email.trim() || null,
          phone: phone.trim() || null,
          amount: amountValue,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || 'Unable to start the donation.');
      }

      const data = await response.json();
      if (data?.iframe_url) {
        setIframeLoaded(false);
        setIframeUrl(data.iframe_url);
      } else {
        throw new Error('Payment gateway did not return a payment link.');
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to start the donation.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={`${styles.donateSection} ${className}`}>
      <div className={styles.container}>
        <div className={styles.contentCard}>
          <div className={styles.textColumn}>
            <p className={styles.eyebrow}>Support the Ministry</p>
            <h2 className={styles.title}>Donate to Our Ministry</h2>
            <p className={styles.description}>
              Your generosity helps us reach more people, create life-giving resources,
              and expand our ministry outreach. Every gift makes a difference.
            </p>
          </div>
          <div className={styles.ctaColumn}>
            <div className={styles.ctaCard}>
              <p className={styles.ctaText}>
                Ready to give? Click below to open the donation options.
              </p>
              <Button onClick={() => setIsOpen(true)} size="lg">
                Donate Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && !iframeUrl && (
        <div
          className={styles.modalOverlay}
          onClick={iframeUrl ? undefined : handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Donate to our ministry"
        >
          <div
            className={`${styles.modalContent} ${iframeUrl ? styles.modalContentIframe : ''}`}
            onClick={(event) => event.stopPropagation()}
          >

            <div className={styles.formStack}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>Donate to Our Ministry</h3>
                <button
                  type="button"
                  className={styles.modalClose}
                  onClick={handleClose}
                  aria-label="Close donation modal"
                >
                  Close
                </button>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Full Name *</label>
                <input
                  className={styles.input}
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label className={styles.label}>Email (optional)</label>
                  <input
                    className={styles.input}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="your@email.com"
                    type="email"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Phone (optional)</label>
                  <input
                    className={styles.input}
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Phone number"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Select Amount (USD)</label>
                <div className={styles.amountGrid}>
                  {PRESET_AMOUNTS.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      className={`${styles.amountButton} ${selectedAmount === amount && !customAmount ? styles.amountActive : ''}`}
                      onClick={() => handlePresetClick(amount)}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div className={styles.customAmountRow}>
                  <span className={styles.currency}>$</span>
                  <input
                    className={styles.customAmountInput}
                    value={customAmount}
                    onChange={(event) => setCustomAmount(event.target.value)}
                    placeholder="Custom amount"
                    inputMode="decimal"
                  />
                </div>
              </div>

              {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}

              <div className={styles.modalActions}>
                <Button
                  onClick={handleSubmit}
                  disabled={submitting}
                  loading={submitting}
                >
                  Proceed to Payment
                </Button>
                <Button variant="outline" onClick={handleClose} disabled={submitting}>
                  Cancel
                </Button>
              </div>
            </div>

          </div>
        </div>
      )}


      {iframeUrl && (
        <div className={styles.iframeWrapper}>
          {!iframeLoaded && (
            <div className={styles.iframeLoader}>
              <span className={styles.iframeSpinner} aria-hidden="true" />
              <p className={styles.iframeLoaderText}>Loading payment…</p>
            </div>
          )}
          <iframe
            title="Donate to our ministry"
            src={iframeUrl}
            className={styles.iframe}
            style={{ opacity: iframeLoaded ? 1 : 0, transition: 'opacity 0.35s' }}
            allow="payment"
            onLoad={() => setIframeLoaded(true)}
          />
        </div>
      )}

      {showSuccess && (
        <div
          className={styles.successOverlay}
          onClick={() => { setShowSuccess(false); resetModal(); }}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.successModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.successIcon} aria-hidden="true">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3 className={styles.successTitle}>Thank You!</h3>
            <p className={styles.successSubtitle}>Your donation has been received.</p>
            <p className={styles.successMessage}>
              May God bless you abundantly for your generous gift to the Patmos Choir Ministry.
              Your support helps us reach more lives.
            </p>
            <div className={styles.successProgress}>
              <div
                className={styles.successProgressBar}
                style={{ animationDuration: '5s' }}
              />
            </div>
            <p className={styles.successCountdown}>Closing in {countdown}s</p>
            <button
              type="button"
              className={styles.successClose}
              onClick={() => { setShowSuccess(false); resetModal(); }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
