import { useForm } from '@inertiajs/react';
import styles from './ContactForm.module.scss';

const SUBJECTS = [
  { value: '', label: 'Select a subject…' },
  { value: 'booking', label: 'Choir Booking / Performance' },
  { value: 'outreach', label: 'Outreach Collaboration' },
  { value: 'media', label: 'Media & Press Enquiry' },
  { value: 'donation', label: 'Donation / Financial Support' },
  { value: 'prayer', label: 'Prayer Request' },
  { value: 'other', label: 'Other' },
];

export default function ContactForm() {
  const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const set = (field: keyof typeof data) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setData(field, e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/contact', { onSuccess: () => reset() });
  };

  return (
    <div className={styles.wrap}>

        {recentlySuccessful && (
          <div className={styles.successBanner} role="status">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>Message sent! Thank you — we'll be in touch soon.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form} noValidate>

          {/* Row 1: Name + Email */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>Full Name <span aria-hidden="true">*</span></label>
              <input
                id="name" name="name" type="text"
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                value={data.name}
                onChange={set('name')}
                placeholder="Your full name"
                required
              />
              {errors.name && <p className={styles.fieldError}>{errors.name}</p>}
            </div>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>Email Address <span aria-hidden="true">*</span></label>
              <input
                id="email" name="email" type="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                value={data.email}
                onChange={set('email')}
                placeholder="your@email.com"
                required
              />
              {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
            </div>
          </div>
          
          <div className={styles.field}>
            <label htmlFor="phone" className={styles.label}>Phone <span className={styles.optional}>(optional)</span></label>
            <input
              id="phone" name="phone" type="tel"
              className={styles.input}
              value={data.phone}
              onChange={set('phone')}
              placeholder="+250 700 000 000"
            />
          </div>

          {/* Message */}
          <div className={styles.field}>
            <label htmlFor="message" className={styles.label}>Message <span aria-hidden="true">*</span></label>
            <textarea
              id="message" name="message"
              className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
              value={data.message}
              onChange={set('message')}
              placeholder="Tell us how we can help, or what's on your heart…"
              rows={6}
              required
            />
            {errors.message && <p className={styles.fieldError}>{errors.message}</p>}
            <span className={styles.charCount}>{data.message.length} characters</span>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={processing}>
            {processing ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                </svg>
                Send Message
              </>
            )}
          </button>

          <p className={styles.formNote}>
            By sending this message you agree to our{' '}
            <a href="/privacy-policy" className={styles.formNoteLink}>Privacy Policy</a>.
          </p>

        </form>
    </div>
  );
}
