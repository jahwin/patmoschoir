import { motion } from "motion/react";
import { Head } from "@inertiajs/react";
import PublicLayout from "@/components/layouts/public-layout";
import styles from "./style.module.scss";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const SECTIONS = [
  {
    id: "collection",
    number: "01",
    title: "Information We Collect",
    content: (
      <>
        <ul className={styles.list}>
          {[
            "Full name",
            "Email address",
            "Phone number",
            "Messages submitted through contact forms",
            "Event registration information",
            "Prayer requests or ministry inquiries",
            "Media submissions",
            "Donation-related information (if applicable)",
          ].map((item) => (
            <li key={item} className={styles.listItem}>{item}</li>
          ))}
        </ul>
        <p className={styles.subheading}>We may also automatically collect</p>
        <ul className={styles.list}>
          {["Browser type", "Device information", "IP address", "Pages visited on our website"].map(
            (item) => (
              <li key={item} className={styles.listItem}>{item}</li>
            )
          )}
        </ul>
      </>
    ),
  },
  {
    id: "usage",
    number: "02",
    title: "How We Use Your Information",
    content: (
      <ul className={styles.list}>
        {[
          "Respond to inquiries and messages",
          "Share choir updates, ministry news, and event announcements",
          "Coordinate choir activities and registrations",
          "Improve the functionality and content of our website",
          "Process donations or support requests",
          "Promote our music ministry and outreach activities",
        ].map((item) => (
          <li key={item} className={styles.listItem}>{item}</li>
        ))}
      </ul>
    ),
  },
  {
    id: "media",
    number: "03",
    title: "Media & Photography",
    content: (
      <>
        <p className={styles.para}>
          Patmos Choir Rwanda regularly shares photos, audio recordings, and videos from
          rehearsals, concerts, worship services, and ministry events.
        </p>
        <p className={styles.para}>
          By participating in choir activities or public events, you acknowledge that media
          content may be used on our website, social media platforms, streaming platforms,
          and promotional materials.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    number: "04",
    title: "Cookies & Analytics",
    content: (
      <p className={styles.para}>
        Our website may use cookies and analytics tools to improve user experience and website
        performance. These tools help us understand how visitors interact with our content so
        we can continue improving our ministry's digital presence.
      </p>
    ),
  },
  {
    id: "sharing",
    number: "05",
    title: "Sharing of Information",
    content: (
      <p className={styles.para}>
        Patmos Choir Rwanda does not sell, trade, or rent personal information to third parties.
        Your data is used solely in service of our ministry and to keep you connected with
        our community.
      </p>
    ),
  },
  {
    id: "security",
    number: "06",
    title: "Data Security",
    content: (
      <p className={styles.para}>
        We implement reasonable administrative and technical measures to protect personal
        information against unauthorized access, disclosure, or misuse.
      </p>
    ),
  },
  {
    id: "children",
    number: "07",
    title: "Children's Privacy",
    content: (
      <p className={styles.para}>
        We do not knowingly collect personal information from minors without appropriate
        parental or guardian consent where required.
      </p>
    ),
  },
  {
    id: "rights",
    number: "08",
    title: "Your Rights",
    content: (
      <>
        <p className={styles.para}>You may request to:</p>
        <ul className={styles.list}>
          {[
            "Access your personal information",
            "Correct inaccurate information",
            "Remove your information from our records",
            "Unsubscribe from communications",
          ].map((item) => (
            <li key={item} className={styles.listItem}>{item}</li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "consent",
    number: "09",
    title: "Media Consent",
    content: (
      <>
        <p className={styles.para}>
          Patmos Choir Rwanda may capture and publish photographs, audio recordings, and videos
          during worship services, choir rehearsals, concerts, conferences, outreach activities,
          and ministry events.
        </p>
        <div className={styles.callout}>
          <p>
            By participating in Patmos Choir Rwanda activities or events, participants consent
            to the use of their image, voice, or appearance in ministry-related media content.
            For minors, consent is considered to be provided by a parent or legal guardian
            through participation approval.
          </p>
        </div>
        <p className={styles.para} style={{ marginTop: "1rem" }}>
          These materials will never intentionally be used in a misleading, harmful, or
          inappropriate manner.
        </p>
      </>
    ),
  },
];

const NAV_ITEMS = [
  { href: "#collection", label: "Information Collected" },
  { href: "#usage", label: "How We Use It" },
  { href: "#media", label: "Media & Photography" },
  { href: "#cookies", label: "Cookies & Analytics" },
  { href: "#sharing", label: "Data Sharing" },
  { href: "#security", label: "Security" },
  { href: "#children", label: "Children's Privacy" },
  { href: "#rights", label: "Your Rights" },
  { href: "#consent", label: "Media Consent" },
  { href: "#contact", label: "Contact Us" },
];

function PrivacyPageDesign() {
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
            Legal &nbsp;·&nbsp; Policy
          </motion.span>
          <motion.h1 className={styles.heroTitle} variants={fadeUp} transition={{ duration: 0.55 }}>
            Privacy Policy
          </motion.h1>
          <motion.p className={styles.heroDesc} variants={fadeUp} transition={{ duration: 0.5 }}>
            How Patmos Choir Rwanda collects, uses, and protects your personal information.
          </motion.p>
          <motion.div className={styles.heroDivider} variants={fadeUp} transition={{ duration: 0.45 }} />
        </motion.div>
      </section>

      {/* Body */}
      <div className={styles.layout}>
        {/* Sidebar nav */}
        <nav className={styles.sidebar} aria-label="Policy sections">
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
              <span className={styles.contactLabel}>Questions or Requests</span>
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

export default function PrivacyPolicy() {
  return (
    <>
      <Head title="Privacy Policy" />
      <PublicLayout>
        <PrivacyPageDesign />
      </PublicLayout>
    </>
  );
}
