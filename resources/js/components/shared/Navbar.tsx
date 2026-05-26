import { motion } from "motion/react";
import Styles from "./Navbar.module.scss";
import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

/** Set to true when translations are ready */
const SHOW_TRANSLATIONS = false;

const LANGS = ["EN", "FR", "KN"] as const;
type Lang = (typeof LANGS)[number];

function LangSwitcher({ className }: { className?: string }) {
  const [active, setActive] = useState<Lang>("EN");
  return (
    <div
      className={`${Styles["lang-switcher"]} ${className ?? ""} ${!SHOW_TRANSLATIONS ? Styles["lang-switcher-hidden"] : ""}`}
      role="group"
      aria-label="Language"
      aria-hidden={!SHOW_TRANSLATIONS}
      hidden={!SHOW_TRANSLATIONS}
    >
      {LANGS.map((lang) => (
        <button
          key={lang}
          type="button"
          className={`${Styles["lang-btn"]} ${active === lang ? Styles["lang-btn-active"] : ""}`}
          onClick={() => setActive(lang)}
          aria-pressed={active === lang}
          tabIndex={SHOW_TRANSLATIONS ? 0 : -1}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}

interface NavbarProps {
  setJoinMinistryOpen: (open: boolean) => void;
}

function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      className={`${Styles['theme-toggle']} ${className ?? ''}`}
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}

export default function Navbar({ setJoinMinistryOpen }: NavbarProps) {
  const { theme } = useTheme();
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
        <Link href="/" className={Styles['nav-logo']} onClick={closeMobileMenu}>
          <img
            src={theme === 'light' ? '/logo-b.png' : '/logo-w.png'}
            alt="Patmos Choir"
            className={Styles['nav-logo-img']}
          />
        </Link>

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
          <ThemeToggle />
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
        <ThemeToggle className={Styles['theme-toggle-mobile']} />
        <a href="#" className={`${Styles['nav-cta']} btn ${Styles['nav-mobile-cta']}`} onClick={(e) => { e.preventDefault(); closeMobileMenu(); setJoinMinistryOpen(true); }}>Join Us</a>
      </motion.div>
    </motion.div>
  );
}