import { motion } from "motion/react";
import { Link } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import styles from "./HomeHeroSection.module.scss";
import heroVideo from "../../../../assets/hero-video.mp4";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function HomeHeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    // Keep UI in sync even if playback changes for any reason.
    const syncState = () => setIsPlaying(!videoEl.paused);
    syncState();

    videoEl.addEventListener("play", syncState);
    videoEl.addEventListener("pause", syncState);

    return () => {
      videoEl.removeEventListener("play", syncState);
      videoEl.removeEventListener("pause", syncState);
    };
  }, []);

  const togglePlayback = async () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (videoEl.paused) {
      try {
        await videoEl.play();
      } catch {
        // Autoplay restrictions or other issues may prevent play(). Keep UI accurate.
        setIsPlaying(false);
      }
    } else {
      videoEl.pause();
    }
  };

  return (
    <section className={styles.hero}>
      <video
        ref={videoRef}
        className={styles.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      

      <motion.div
        className={styles.heroContent}
        initial="initial"
        animate="animate"
        variants={{ animate: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
      >
        <motion.h1 variants={fadeInUp} transition={{ duration: 0.6 }}>
          Israel Mbonyi
        </motion.h1>

        <motion.p className={styles.heroTagline} variants={fadeInUp} transition={{ duration: 0.6 }}>
          Then I heard the voice of the Lord saying, &ldquo;Whom shall I send? And who will go for us?&rdquo; And
          I said, &ldquo;Here I am. Send me!&rdquo;
        </motion.p>

        <motion.div className={styles.playControl} variants={staggerItem}>
          <Link href="/about" className="tickets-notify-btn">
            Meet Israel Mbonyi
          </Link>
          <button
            type="button"
            className={styles.playPauseButton}
            onClick={togglePlayback}
            aria-label={isPlaying ? "Pause background video" : "Play background video"}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

