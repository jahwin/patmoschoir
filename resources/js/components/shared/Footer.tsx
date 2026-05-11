import { motion } from "motion/react";
import Styles from "./Footer.module.scss";

const SOCIALS = [
  {
    name: "YouTube",
    link: "https://www.youtube.com/@Mbonyi",
  },
  {
    name: "Spotify",
    link: "https://open.spotify.com/artist/6E6bGyrGJM33jnVivvn3kH",
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/israelmbonyi",
  },
  {
    name: "Facebook",
    link: "https://www.facebook.com/imbonyi",
  },
  {
    name: "X (Twitter)",
    link: "https://x.com/IsraeMbonyi",
  },
  {
    name: "TikTok",
    link: "https://www.tiktok.com/@israelmbonyi",
  },
]

export default function Footer() {
  return (
    <motion.footer
      className={Styles['footer']}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={Styles['footer-content']}>
        <h2 className={Styles['section-title']}>Follow On Socials</h2>
        <nav className={Styles['socials']} aria-label="Social links">
          {SOCIALS.map((social) => (
            <a href={social.link} key={social.name} target="_blank" rel="noopener noreferrer">
              {social.name}
            </a>
          ))}
        </nav>
        <p className={Styles['copyright']}>© {new Date().getFullYear()} Israel Mbonyi</p>
      </div>
    </motion.footer>
  );
}