import React from 'react';
import styles from './ContactForm.module.scss';
import { useForm } from '@inertiajs/react';

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = "" }: ContactFormProps) {
  const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(name as keyof typeof data, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    post('/contact', {
      onSuccess: () => reset(),
    });
  };

  return (
    <section className={`${styles.contactForm} ${className}`}>
      <div className={styles.container}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>Send Us a Message</h2>
          <p className={styles.formDescription}>
            Fill out the form below and we'll get back to you within 24 hours. 
            We're excited to hear about your project!
          </p>
        </div>

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Your full name"
                  required
                />
                {errors.name && <p className={styles.errorText}>{errors.name}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="your.email@example.com"
                  required
                />
                {errors.email && <p className={styles.errorText}>{errors.email}</p>}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.formLabel}>Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={data.phone}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.formLabel}>Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={data.subject}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Enter your subject"
                  required
                />
                {errors.subject && <p className={styles.errorText}>{errors.subject}</p>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>Message *</label>
              <textarea
                id="message"
                name="message"
                value={data.message}
                onChange={handleInputChange}
                className={styles.formTextarea}
                placeholder="Tell us about your project, timeline, budget, and any specific requirements..."
                rows={6}
                required
              ></textarea>
              {errors.message && <p className={styles.errorText}>{errors.message}</p>}
            </div>

            {recentlySuccessful && (
              <div className={styles.successMessage}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
                Thank you! Your message has been sent successfully. We'll get back to you soon.
              </div>
            )}

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={processing}
            >
              {processing ? (
                <>
                  <div className={styles.spinner}></div>
                  Sending...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                  </svg>
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
