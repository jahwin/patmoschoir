import { motion } from "motion/react";
import Styles from "./Navbar.module.scss";
import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

const LANGS = ["EN", "FR", "KN"] as const;
type Lang = (typeof LANGS)[number];

function LangSwitcher({ className }: { className?: string }) {
  const [active, setActive] = useState<Lang>("EN");
  return (
    <div className={`${Styles["lang-switcher"]} ${className ?? ""}`} role="group" aria-label="Language">
      {LANGS.map((lang) => (
        <button
          key={lang}
          type="button"
          className={`${Styles["lang-btn"]} ${active === lang ? Styles["lang-btn-active"] : ""}`}
          onClick={() => setActive(lang)}
          aria-pressed={active === lang}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
// import { useLocation } from "react-router";

interface NavbarProps {
  setJoinMinistryOpen: (open: boolean) => void;
}

export default function Navbar({ setJoinMinistryOpen }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const location = usePage();
  const currentPath = location.url === "/" ? "/" : location.url.split("?")[0];
  const isHome = currentPath === "/";

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const ratiosRef = useRef<Record<string, number>>({});

  useEffect(() => {
    if (!isHome) {
      setActiveSection(null);
      return;
    }

    const SECTION_IDS = ["events", "gallery"];
    ratiosRef.current = {};

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratiosRef.current[e.target.id] = e.intersectionRatio;
        });
        const best = Object.entries(ratiosRef.current).reduce<{ id: string | null; ratio: number }>(
          (acc, [id, ratio]) => (ratio > acc.ratio ? { id, ratio } : acc),
          { id: null, ratio: 0 }
        );
        setActiveSection(best.ratio > 0.1 ? best.id : null);
      },
      { threshold: [0, 0.1, 0.3, 0.5] }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [isHome]);

  const scrollToSection = (id: string) => {
    closeMobileMenu();
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.visit("/", {
        onSuccess: () => {
          setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        },
      });
    }
  };

  const TOP_LINKS = [
    { label: "HOME", to: "/", active: currentPath === "/" && activeSection === null },
    { label: "OUR STORY", to: "/about", active: currentPath === "/about" },
  ];

  const BOTTOM_LINKS = [
    { label: "CONTACT", to: "/contact", active: currentPath === "/contact" },
  ];

  return (
    <motion.div
      className={Styles['nav-main-container']}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <header className={Styles['nav-main']}>
        <Link href="/" className={Styles['nav-logo']} onClick={closeMobileMenu}>Patmos Choir</Link>

        <nav className={Styles['nav-links']} aria-label="Main navigation">
          {TOP_LINKS.map((link, index) => (
            <Link
              href={link.to}
              className={`${link.active ? Styles['nav-link-active'] : ""}`}
              onClick={closeMobileMenu}
              key={index}
            >
              {link.label}
            </Link>
          ))}
          <button type="button" className={activeSection === "events" ? Styles["nav-link-active"] : ""} onClick={() => scrollToSection("events")}>EVENTS</button>
          <button type="button" className={activeSection === "gallery" ? Styles["nav-link-active"] : ""} onClick={() => scrollToSection("gallery")}>GALLERY</button>
          {BOTTOM_LINKS.map((link, index) => (
            <Link
              href={link.to}
              className={`${link.active ? Styles['nav-link-active'] : ""}`}
              onClick={closeMobileMenu}
              key={index}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={Styles['nav-right']}>
          <LangSwitcher />
          <a href="#" className={`${Styles['nav-cta']} btn`} onClick={(e) => { e.preventDefault(); closeMobileMenu(); setJoinMinistryOpen(true); }}>Join Us</a>
        </div>

        <button
          type="button"
          className={Styles['nav-toggle']}
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className={Styles['nav-toggle-bar']} />
          <span className={Styles['nav-toggle-bar']} />
          <span className={Styles['nav-toggle-bar']} />
        </button>
      </header>

      <motion.div
        id="mobile-menu"
        className={`${Styles['nav-mobile']} ${mobileMenuOpen ? Styles['nav-mobile-open'] : ""}`}
        aria-hidden={!mobileMenuOpen}
        initial={false}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          visibility: mobileMenuOpen ? "visible" : "hidden",
        }}
        transition={{ duration: 0.25 }}
      >
        <nav className={Styles['nav-mobile-links']} aria-label="Mobile navigation">
          {TOP_LINKS.map((link, index) => (
            <Link
              href={link.to}
              className={`${link.active ? Styles['nav-link-active'] : ""}`}
              onClick={closeMobileMenu}
              key={index}
            >
              {link.label}
            </Link>
          ))}
          <button type="button" className={activeSection === "events" ? Styles["nav-link-active"] : ""} onClick={() => scrollToSection("events")}>EVENTS</button>
          <button type="button" className={activeSection === "gallery" ? Styles["nav-link-active"] : ""} onClick={() => scrollToSection("gallery")}>GALLERY</button>
          {BOTTOM_LINKS.map((link, index) => (
            <Link
              href={link.to}
              className={`${link.active ? Styles['nav-link-active'] : ""}`}
              onClick={closeMobileMenu}
              key={index}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <LangSwitcher className={Styles['lang-switcher-mobile']} />
        <a href="#" className={`${Styles['nav-cta']} btn ${Styles['nav-mobile-cta']}`} onClick={(e) => { e.preventDefault(); closeMobileMenu(); setJoinMinistryOpen(true); }}>Join Us</a>
      </motion.div>
    </motion.div>
  );
}