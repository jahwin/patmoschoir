import styles from "./MediaSection.module.scss";
import { VideoItem } from "../types";

interface MusicVideosSectionProps {
  videos: VideoItem[];
}

const getYouTubeThumbnail = (video: VideoItem) => {
  if (video.image) {
    return video.image;
  }

  if (!video.youtube_link) {
    return "";
  }

  const shortUrl = video.youtube_link.match(/youtu\.be\/([^?&]+)/);
  if (shortUrl?.[1]) {
    return `https://img.youtube.com/vi/${shortUrl[1]}/hqdefault.jpg`;
  }

  const watchUrl = video.youtube_link.match(/[?&]v=([^?&]+)/);
  if (watchUrl?.[1]) {
    return `https://img.youtube.com/vi/${watchUrl[1]}/hqdefault.jpg`;
  }

  return "";
};

export default function MusicVideosSection({ videos }: MusicVideosSectionProps) {
  return (
    <section id="video" className={styles.column}>
      <p className="main-section-subtitle">Watch</p>
      <h2 className="main-section-title">Videos</h2>

      {videos.length > 0 ? (
        <div className={styles.mediaGrid}>
          {videos.map((video) => {
            const thumbnail = getYouTubeThumbnail(video);
            return (
              <>
                <a
                  key={video.id}
                  href={video.youtube_link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                >
                  {thumbnail ? (
                    <img src={thumbnail} alt={`Video ${video.id}`} loading="lazy" />
                  ) : (
                    <div className={styles.fallback}>No thumbnail</div>
                  )}
                </a>
              </>
            );
          })}
        </div>
      ) : (
        <p className={styles.empty}>No videos available yet.</p>
      )}

      <div className="tickets-notify">
        <a
          href="https://www.youtube.com/@Mbonyi"
          target="_blank"
          rel="noopener noreferrer"
          className="tickets-notify-btn"
        >
          Open YouTube
        </a>
      </div>
    </section>
  );
}
