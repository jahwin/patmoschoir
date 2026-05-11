import React from 'react';
import { X } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import styles from './JoinMinistryModal.module.scss';
import modalOverlayStyles from '@/pages/event-details/style.module.scss';

interface JoinMinistryModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

export default function JoinMinistryModal({
  showModal,
  setShowModal,
}: JoinMinistryModalProps) {
  const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
    full_name: '',
    phone: '',
    email: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(name as keyof typeof data, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    post('/ministry/join', {
      onSuccess: () => {
        reset();
        setTimeout(() => {
          setShowModal(false);
        }, 2000);
      },
    });
  };

  if (!showModal) return null;

  return (
    <div
      className={modalOverlayStyles.modalOverlay}
      onClick={() => setShowModal(false)}
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.modalTitle}>Join Us</h2>
          <button
            onClick={() => setShowModal(false)}
            className={styles.closeButton}
            aria-label="Close modal"
          >
            <X />
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <p className={styles.description}>
            Fill out the form below to Join Us. We'll get back to you soon!
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Full Name */}
            <div className={styles.formGroup}>
              <label htmlFor="full_name" className={styles.formLabel}>
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={data.full_name}
                onChange={handleInputChange}
                className={styles.inputField}
                placeholder="Enter your full name"
                required
              />
              {errors.full_name && (
                <p className={styles.errorText}>{errors.full_name}</p>
              )}
            </div>

            {/* Phone */}
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.formLabel}>
                Phone Number <span className={styles.requiredLabel}>*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={data.phone}
                onChange={handleInputChange}
                className={styles.inputField}
                placeholder="+1 (555) 123-4567"
                required
              />
              {errors.phone && (
                <p className={styles.errorText}>{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleInputChange}
                className={styles.inputField}
                placeholder="your.email@example.com"
                required
              />
              {errors.email && (
                <p className={styles.errorText}>{errors.email}</p>
              )}
            </div>

            {/* Success Message */}
            {recentlySuccessful && (
              <div className={styles.successMessage}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
                Thank you! Your submission has been received. We'll contact you soon.
              </div>
            )}

            {/* Submit Button */}
            <div className={styles.actionButtons}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className={styles.cancelButton}
                disabled={processing}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={processing}
              >
                {processing ? (
                  <>
                    <div className={styles.spinner}></div>
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
