import { motion } from "motion/react";
import { Head, usePage } from "@inertiajs/react";
import PublicLayout from "@/components/layouts/public-layout";
import BlogContent from "../blog.$slug/components/BlogContent";
import { SharedData } from "@/types/shared";
import styles from "./style.module.scss";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const SECTIONS = [
  {
    id: "purpose",
    number: "01",
    title: "Website Purpose",
    content: (
      <>
        <p className={styles.para}>
          This website exists to serve the ministry and community of Patmos Choir Rwanda.
        </p>
        <ul className={styles.list}>
          {[
            "Share the ministry and music of Patmos Choir Rwanda",
            "Provide information about choir activities and events",
            "Promote gospel music and Christian fellowship",
            "Connect with supporters, worshippers, and partners",
          ].map((item) => (
            <li key={item} className={styles.listItem}>{item}</li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "ip",
    number: "02",
    title: "Intellectual Property",
    content: (
      <>
        <p className={styles.para}>
          Unless otherwise stated, all content on this website belongs to Patmos Choir Rwanda,
          including:
        </p>
        <ul className={styles.list}>
          {[
            "Music recordings",
            "Videos",
            "Images",
            "Logos",
            "Text content",
            "Designs and ministry materials",
          ].map((item) => (
            <li key={item} className={styles.listItem}>{item}</li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "conduct",
    number: "03",
    title: "Use of Website",
    content: (
      <>
        <p className={styles.para}>Users agree not to:</p>
        <ul className={styles.list}>
          {[
            "Misuse the website",
            "Attempt unauthorized access",
            "Upload harmful or malicious content",
            "Use website materials for unlawful purposes",
          ].map((item) => (
            <li key={item} className={styles.listItem}>{item}</li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "links",
    number: "04",
    title: "External Links",
    content: (
      <p className={styles.para}>
        Our website may contain links to external platforms such as YouTube, Spotify, and social
        media platforms. These links are provided for convenience and ministry connection.
        Patmos Choir Rwanda is not responsible for the content or policies of those external sites.
      </p>
    ),
  },
  {
    id: "events",
    number: "05",
    title: "Event Information",
    content: (
      <p className={styles.para}>
        Event schedules, announcements, and ministry activities may change without prior notice.
        We encourage visitors to check our website regularly or subscribe for updates to stay
        informed about the latest events.
      </p>
    ),
  },
  {
    id: "liability",
    number: "06",
    title: "Limitation of Liability",
    content: (
      <>
        <p className={styles.para}>
          While we strive to provide accurate and updated information, Patmos Choir Rwanda does
          not guarantee that all website content will always be complete, accurate, or
          uninterrupted.
        </p>
        <div className={styles.highlight}>
          <p>
            Patmos Choir Rwanda shall not be held liable for any loss or damage arising from
            reliance on information published on this website.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "changes",
    number: "07",
    title: "Changes to Terms",
    content: (
      <p className={styles.para}>
        We may revise these Terms and Conditions at any time without prior notice. Continued use
        of the website following any changes constitutes acceptance of the updated terms.
        We encourage users to review this page periodically.
      </p>
    ),
  },
];

const NAV_ITEMS = [
  { href: "#purpose", label: "Website Purpose" },
  { href: "#ip", label: "Intellectual Property" },
  { href: "#conduct", label: "Use of Website" },
  { href: "#links", label: "External Links" },
  { href: "#events", label: "Event Information" },
  { href: "#liability", label: "Limitation of Liability" },
  { href: "#changes", label: "Changes to Terms" },
  { href: "#contact", label: "Contact Us" },
];

function TermsPageDesign() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <motion.div
          className={styles.heroInner}
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
        >
          <motion.span className={styles.heroEyebrow} variants={fadeUp} transition={{ duration: 0.5 }}>
            Legal &nbsp;·&nbsp; Agreement
          </motion.span>
          <motion.h1 className={styles.heroTitle} variants={fadeUp} transition={{ duration: 0.55 }}>
            Terms &amp; Conditions
          </motion.h1>
          <motion.p className={styles.heroDesc} variants={fadeUp} transition={{ duration: 0.5 }}>
            By using this website, you agree to the following terms governing your access to
            Patmos Choir Rwanda's digital ministry.
          </motion.p>
          <motion.div className={styles.heroDivider} variants={fadeUp} transition={{ duration: 0.45 }} />
        </motion.div>
      </section>

      {/* Body */}
      <div className={styles.layout}>
        {/* Sidebar nav */}
        <nav className={styles.sidebar} aria-label="Terms sections">
          <span className={styles.sidebarLabel}>Contents</span>
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className={styles.sidebarLink}>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Sections */}
        <div className={styles.content}>
          {SECTIONS.map((sec, i) => (
            <motion.section
              key={sec.id}
              id={sec.id}
              className={styles.section}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.04 }}
            >
              <div className={styles.sectionNumber}>{sec.number}</div>
              <h2 className={styles.sectionTitle}>{sec.title}</h2>
              <div className={styles.sectionBody}>{sec.content}</div>
            </motion.section>
          ))}

          {/* Contact card */}
          <motion.div
            id="contact"
            className={styles.contactCard}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.contactInfo}>
              <span className={styles.contactLabel}>Questions or Concerns</span>
              <span className={styles.contactName}>Patmos Choir Rwanda</span>
              <div className={styles.contactLinks}>
                <a href="mailto:info@patmoschoir.com" className={styles.contactLink}>
                  info@patmoschoir.com
                </a>
                <a
                  href="https://patmoschoir.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  patmoschoir.com
                </a>
              </div>
            </div>
            <a href="/contact" className={styles.contactCta}>
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function TermsConditions() {
  const { siteContent } = usePage<SharedData>().props;

  return (
    <>
      <Head title="Terms and Conditions" />
      {siteContent?.terms_and_conditions && siteContent.terms_and_conditions.length > 10 ? (
        <PublicLayout title="Terms and Conditions">
          <BlogContent content={siteContent.terms_and_conditions} />
        </PublicLayout>
      ) : (
        <PublicLayout>
          <TermsPageDesign />
        </PublicLayout>
      )}
    </>
  );
}
