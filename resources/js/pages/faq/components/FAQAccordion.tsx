import React, { useState } from 'react';
import styles from './FAQAccordion.module.scss';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  className?: string;
}

export default function FAQAccordion({ faqs, className = "" }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const openAll = () => {
    setOpenItems(faqs.map((faq, index) => index));
  };

  const closeAll = () => {
    setOpenItems([]);
  };

  return (
    <section className={`${styles.faqAccordion} ${className}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>Common Questions</h2>
          <div className={styles.controls}>
            <button 
              className={styles.controlButton}
              onClick={openAll}
            >
              Open All
            </button>
            <button 
              className={styles.controlButton}
              onClick={closeAll}
            >
              Close All
            </button>
          </div>
        </div>

        <div className={styles.accordion}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.accordionItem}>
              <button
                className={`${styles.accordionHeader} ${
                  openItems.includes(index) ? styles.active : ''
                }`}
                onClick={() => toggleItem(index)}
                aria-expanded={openItems.includes(index)}
              >
                <h3 className={styles.question}>{faq.question}</h3>
                <div className={styles.icon}>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    className={`${styles.chevron} ${
                      openItems.includes(index) ? styles.rotated : ''
                    }`}
                  >
                    <polyline points="6,9 12,15 18,9"/>
                  </svg>
                </div>
              </button>
              
              <div 
                className={`${styles.accordionContent} ${
                  openItems.includes(index) ? styles.open : ''
                }`}
              >
                <div className={styles.answer}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
