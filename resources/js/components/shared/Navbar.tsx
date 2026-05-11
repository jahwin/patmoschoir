import { motion } from "motion/react";
import Styles from "./Navbar.module.scss";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

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

  // const currentPath = location.pathname + location.search + location.hash;

  const TOP_LINKS = [
    { label: "HOME", to: "/", active: currentPath === "/" },
    { label: "ABOUT", to: "/about", active: currentPath === "/about" },
  ];

  const BOTTOM_LINKS = [
    { label: "GALLERY", to: "/gallery", active: currentPath === "/gallery" },
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