import styles from "./MediaSection.module.scss";
import { MusicItem } from "../types";

interface MusicAudioSectionProps {
  music: MusicItem[];
}

export default function MusicAudioSection({ music }: MusicAudioSectionProps) {
  return (
    <section id="audio" className={styles.column}>
      <p className="main-section-subtitle">Listen</p>
      <h2 className="main-section-title">Musics (Audios)</h2>

      {music.length > 0 ? (
        <div className={styles.mediaGrid}>
          {music.map((item) => (
            <>
              <a
                key={item.id}
                href={item.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                {item.image ? (
                  <img src={item.image} alt={`Audio ${item.id}`} loading="lazy" />
                ) : (
                  <div className={styles.fallback}>No cover</div>
                )}
              </a>
            </>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>No audio available yet.</p>
      )}

      <div className="tickets-notify">
        <a
          href="https://open.spotify.com/artist/6E6bGyrGJM33jnVivvn3kH"
          target="_blank"
          rel="noopener noreferrer"
          className="tickets-notify-btn"
        >
          Open Spotify
        </a>
      </div>
    </section>
  );
}
