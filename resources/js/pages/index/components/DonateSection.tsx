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
  const [statusMessage, setStatusMessage] = useState('');
  const [autoClosing, setAutoClosing] = useState(false);

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
      console.log(event);
      const response = event.data;
      const responseType = response.type;
      const responceStatus = response.status;
      switch (responseType) {
        case 'PAYMENT_STATUS':
          if (responceStatus === 'success') {
            setAutoClosing(true);
            window.setTimeout(() => {
              handleClose();
            }, 1000);
          } else if (responceStatus === 'failed') {
            handleClose();
          } else if (responceStatus === 'close') {
            handleClose();
          }
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [iframeUrl]);

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
          <iframe
            title="Donate to our ministry"
            src={iframeUrl}
            className={styles.iframe}
            allow="payment"
          />
        </div>
      )}
    </section>
  );
}
