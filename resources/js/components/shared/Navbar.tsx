import { motion } from "motion/react";
import Styles from "./Navbar.module.scss";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
// import { useLocation } from "react-router";

interface NavbarProps {
  setJoinMinistryOpen: (open: boolean) => void;
}

export default function Navbar({ setJoinMinistryOpen }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMediaOpen, setMobileMediaOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileMediaOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileMediaOpen(false);
    }
  }, [mobileMenuOpen]);

  const location = usePage();

  const currentPath = location.url === "/" ? "/" : location.url.split("?")[0];

  // const currentPath = location.pathname + location.search + location.hash;

  const TOP_LINKS = [
    { label: "HOME", to: "/", active: currentPath === "/" },
    { label: "ABOUT", to: "/about", active: currentPath === "/about" },
    { label: "TOUR", to: "/#tickets", active: currentPath.includes("/#tickets") },
  ];

  const MUSIC_DROPDOWN_LINKS = [
    { label: "Audio", to: "/music#audio" },
    { label: "Video", to: "/music#video" },
  ];

  const musicDropdownActive = currentPath.startsWith("/music");

  const BOTTOM_LINKS = [{ label: "GALLERY", to: "/gallery", active: currentPath === "/gallery" }];

  const SOCIALS = {
    instagram: "https://www.instagram.com/israelmbonyi",
    facebook: "https://www.facebook.com/imbonyi",
    twitter: "https://x.com/IsraeMbonyi",
    tiktok: "https://www.tiktok.com/@israelmbonyi",
    youtube: "https://www.youtube.com/israelmbonyi",
  }

  return (
    <motion.div
      className={Styles['nav-main-container']}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <header className={Styles['nav-main']}>
        <div className={Styles['nav-left']}>
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
            <div className={Styles['nav-dropdown']} tabIndex={0}>
              <span
                className={`${Styles['nav-has-dropdown']} ${musicDropdownActive ? Styles['nav-link-active'] : ""}`}
              >
                Music <span className={Styles['nav-chevron']} aria-hidden>▾</span>
              </span>
              <ul role="list" className={Styles['nav-dropdown-menu']}>
                {MUSIC_DROPDOWN_LINKS.map((item) => (
                  <li key={item.to}>
                    <Link href={item.to} onClick={closeMobileMenu}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
        <Link href="/" className={Styles['nav-logo']} onClick={closeMobileMenu}>Israel Mbonyi</Link>
        <div className={Styles['nav-right']}>
          <div className={Styles['nav-socials']}>
            <a href={SOCIALS.instagram} target="_blank" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
            <a href={SOCIALS.facebook} target="_blank" aria-label="Facebook"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
            <a href={SOCIALS.twitter} target="_blank" aria-label="X (Twitter)"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            {/* <a href="#" aria-label="YouTube"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a> */}
            <a href={SOCIALS.tiktok} target="_blank" aria-label="TikTok"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg></a>
          </div>
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
          <div
            className={`${Styles['nav-dropdown']} ${mobileMediaOpen ? Styles['nav-dropdown-open'] : ""}`}
          >
            <button
              type="button"
              className={`${Styles['nav-has-dropdown']} ${musicDropdownActive ? Styles['nav-link-active'] : ""}`}
              aria-expanded={mobileMediaOpen}
              aria-haspopup="true"
              aria-controls="nav-music-submenu"
              id="nav-music-trigger"
              onClick={() => setMobileMediaOpen((o) => !o)}
            >
              Music <span className={Styles['nav-chevron']} aria-hidden>▾</span>
            </button>
            <ul
              role="list"
              id="nav-music-submenu"
              className={Styles['nav-dropdown-menu']}
              aria-labelledby="nav-music-trigger"
            >
              {MUSIC_DROPDOWN_LINKS.map((item) => (
                <li key={item.to}>
                  <Link href={item.to} onClick={closeMobileMenu}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

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
        <div className={Styles['nav-mobile-socials']}>
          <a href={SOCIALS.facebook} target="_blank" aria-label="Facebook"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
          <a href={SOCIALS.instagram} target="_blank" aria-label="Instagram"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
          {/* <a href={SOCIALS.} aria-label="YouTube"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a> */}
          <a href={SOCIALS.tiktok} target="_blank" aria-label="TikTok"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg></a>
          <a href={SOCIALS.twitter} target="_blank" aria-label="X (Twitter)"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
        </div>
        <a href="#" className={`${Styles['nav-cta']} btn ${Styles['nav-mobile-cta']}`} onClick={(e) => { e.preventDefault(); closeMobileMenu(); setJoinMinistryOpen(true); }}>Join Us</a>
      </motion.div>
    </motion.div>
  );
}