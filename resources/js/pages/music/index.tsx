import { Head } from "@inertiajs/react";
import { useLayoutEffect, useState } from "react";
import PublicLayout from "@/components/layouts/public-layout";
import styles from "./style.module.scss";
import MusicAudioSection from "./components/MusicAudioSection";
import MusicVideosSection from "./components/MusicVideosSection";
import { MusicPageProps } from "./types";

type HashSection = "all" | "audio" | "video";

function sectionFromHash(): HashSection {
  const raw = window.location.hash.slice(1).toLowerCase();
  if (raw === "audio") return "audio";
  if (raw === "video") return "video";
  return "all";
}

export default function Music({ music = [], videos = [] }: MusicPageProps) {
  const [hashSection, setHashSection] = useState<HashSection>("all");

  useLayoutEffect(() => {
    const sync = () => setHashSection(sectionFromHash());
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const showMusic = hashSection === "all" || hashSection === "audio";
  const showVideo = hashSection === "all" || hashSection === "video";
  const singleSection = hashSection !== "all";

  return (
    <>
      <Head title="Music" />
      <PublicLayout>
        <section className={styles.page}>
          <div className={styles.container}>
            <div className={styles.catalogueIntro}>
              <p className="main-section-subtitle">Discover Israel Mbonyi&apos;s</p>
              <h2 className="main-section-title">Music Catalogue</h2>
            </div>
            <div className={styles.catalogueCta}>
              <a
                href="https://linktr.ee/israelmbonyi"
                target="_blank"
                rel="noopener noreferrer"
                className="tickets-notify-btn"
              >
                Go to the catalogue
              </a>
            </div>
            <div
              className={`${styles.columns}${singleSection ? ` ${styles.columnsSingle}` : ""}`}
            >
              {showMusic && <MusicAudioSection music={music} />}
              {showVideo && <MusicVideosSection videos={videos} />}
            </div>
          </div>
        </section>
      </PublicLayout>
    </>
  );
}
