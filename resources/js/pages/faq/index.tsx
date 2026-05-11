import React from 'react';
import FAQAccordion from "./components/FAQAccordion";
import FAQContact from "./components/FAQContact";
import styles from "./style.module.scss";
import PublicLayout from '@/components/layouts/public-layout';
import { Head, usePage } from '@inertiajs/react';
import { MapPinIcon, PhoneIcon, MailIcon } from 'lucide-react';
import NotFound from '../404';
import { SharedData } from '@/types/shared';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {

  const { siteContent } = usePage<SharedData>().props;
  const faqs: FAQItem[] = siteContent?.faqs && Array.isArray(siteContent.faqs) 
    ? siteContent.faqs.map((faq: unknown) => {
        if (typeof faq === 'object' && faq !== null && 'question' in faq && 'answer' in faq) {
          return faq as FAQItem;
        }
        return { question: String(faq), answer: '' };
      })
    : [];
  return (
    <>
      <Head title="Frequently Asked Questions" />
      {
        faqs && faqs.length > 0 ? (
          <PublicLayout title="Frequently Asked Questions" subtitle="Answers to Common Questions" description="Find answers to the most commonly asked questions about our architectural services, design process, and project timelines. Can't find what you're looking for? Contact us directly.">
            <div className={styles.faqPage}>
              <FAQAccordion faqs={faqs} />
              <FAQContact />
              {/* Contact Info (mirrors Footer.tsx logic) */}
              {
                siteContent && (
                  <div style={{ marginTop: '2rem' }}>
                    {
                      siteContent.address && siteContent.address.length > 0 && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                          <div><MapPinIcon /></div>
                          <div>
                            <p>{siteContent.address}</p>
                          </div>
                        </div>
                      )
                    }
                    {
                      siteContent.phones && siteContent.phones.length > 0 && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                          <div><PhoneIcon /></div>
                          <div>
                            {
                              (siteContent.phones || []).map((phone: string) => (
                                <p key={phone.trim()}>{phone.trim()}</p>
                              ))
                            }
                          </div>
                        </div>
                      )
                    }
                    {
                      siteContent.emails && siteContent.emails.length > 0 && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                          <div><MailIcon /></div>
                          <div>
                            {
                              (siteContent.emails || []).map((email: string) => (
                                <p key={email.trim()}>{email.trim()}</p>
                              ))
                            }
                          </div>
                        </div>
                      )
                    }
                  </div>
                )
              }
            </div>
          </PublicLayout>
        ) : (
          <NotFound />
        )
      }
    </>
  );
}
