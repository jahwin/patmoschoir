import React from 'react';
import styles from './FAQContact.module.scss';
import { usePage } from '@inertiajs/react';
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { SharedData } from '@/types/shared';

interface FAQContactProps {
  className?: string;
}

export default function FAQContact({ className = "" }: FAQContactProps) {
  const { siteContent } = usePage<SharedData>().props;
  const emails: string[] = siteContent?.emails ? siteContent.emails : [];
  const phones: string[] = siteContent?.phones ? siteContent.phones : [];
  const address: string | undefined = siteContent?.address || undefined;
  const address2: string | undefined = undefined;
  return (
    <section className={`${styles.faqContact} ${className}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textSection}>
            <h2 className={styles.title}>Still Have Questions?</h2>
            <p className={styles.description}>
              Can't find the answer you're looking for? Our team of architectural experts 
              is here to help. Contact us directly and we'll get back to you within 24 hours.
            </p>
            
            <div className={styles.contactMethods}>
              <div className={styles.contactMethod}>
                <div className={styles.contactIcon}>
                  <MailIcon />
                </div>
                <div className={styles.contactInfo}>
                  <h3 className={styles.contactTitle}>Email Us</h3>
                  {
                    emails.length > 0 ? (
                      emails.map((email) => (
                        <p key={email} className={styles.contactText}>{email}</p>
                      ))
                    ) : (
                      <p className={styles.contactText}>info@example.com</p>
                    )
                  }
                  <p className={styles.contactSubtext}>We'll respond within 24 hours</p>
                </div>
              </div>

              <div className={styles.contactMethod}>
                <div className={styles.contactIcon}>
                  <PhoneIcon />
                </div>
                <div className={styles.contactInfo}>
                  <h3 className={styles.contactTitle}>Call Us</h3>
                  {
                    phones.length > 0 ? (
                      phones.map((phone) => (
                        <p key={phone} className={styles.contactText}>{phone}</p>
                      ))
                    ) : (
                      <p className={styles.contactText}>+1 (000) 000-0000</p>
                    )
                  }
                </div>
              </div>

              <div className={styles.contactMethod}>
                <div className={styles.contactIcon}>
                  <MapPinIcon />
                </div>
                <div className={styles.contactInfo}>
                  <h3 className={styles.contactTitle}>Visit Us</h3>
                  <p className={styles.contactText}>{address || 'Your office address'}</p>
                  {address2 && <p className={styles.contactSubtext}>{address2}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Send Us a Message</h3>
              <form className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={styles.formInput}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.formInput}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={styles.formInput}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.formLabel}>Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className={styles.formInput}
                    placeholder="Enter your subject"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className={styles.formTextarea}
                    placeholder="Tell us about your project or question..."
                    rows={5}
                    required
                  ></textarea>
                </div>

                <button type="submit" className={styles.submitButton}>
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
