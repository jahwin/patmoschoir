import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./HomePlaylistStreamingSection.module.scss";
import type { AlbumData, StreamData } from "../index";

const parseDate = (d: string): Date => {
  const datePart = d.slice(0, 10);
  const [y, mo, day] = datePart.split("-").map(Number);
  return new Date(y, mo - 1, day);
};

const fmtStreamDate = (d: string) =>
  parseDate(d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const fmtTime = (t: string | null | undefined): string | null => {
  if (!t) return null;
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hr = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hr}:${String(m).padStart(2, "0")} ${ampm}`;
};

function StreamCameraIcon() {
  return (
    <svg
      className={styles.streamUpcomingIcon}
      width="44"
      height="44"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M23 7l-7 5 7 5V7z" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

function StreamUpcomingOverlay({
  date,
  time,
}: {
  date: string;
  time: string | null;
}) {
  return (
    <div className={styles.streamUpcomingOverlay}>
      <div className={styles.streamUpcomingPulse} aria-hidden="true">
        <span />
      </div>
      <StreamCameraIcon />
      <p className={styles.streamUpcomingLabel}>Stream starts on</p>
      <p className={styles.streamUpcomingDate}>{fmtStreamDate(date).toUpperCase()}</p>
      {time && <p className={styles.streamUpcomingTime}>{time}</p>}
    </div>
  );
}

interface HomePlaylistStreamingSectionProps {
  stream?: StreamData | null;
  albums?: AlbumData[];
}

/* ── Platform icons ── */
function SpotifyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function AppleMusicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 0 0-1.762-.697c-.539-.097-1.08-.14-1.656-.188-.164-.013-1.655-.023-1.656-.023h-9c-.001 0-1.492.01-1.656.023-.576.048-1.117.091-1.656.188A5.022 5.022 0 0 0 2.426.912C1.308 1.645.563 2.645.246 3.955A9.23 9.23 0 0 0 .006 6.145C0 6.304 0 6.47 0 6.636v10.728c0 .166 0 .332.006.498a9.23 9.23 0 0 0 .24 2.19c.317 1.31 1.062 2.31 2.18 3.043a5.022 5.022 0 0 0 1.762.697c.539.097 1.117.14 1.656.188.164.013 1.655.023 1.656.023h9c.001 0 1.492-.01 1.656-.023.539-.048 1.117-.091 1.656-.188a5.022 5.022 0 0 0 1.762-.697c1.118-.733 1.863-1.733 2.18-3.043a9.23 9.23 0 0 0 .24-2.19c.006-.166.006-.332.006-.498V6.636c0-.166 0-.332-.006-.498zm-7.066 3.198L12 11.97l-4.928-2.648V6.97L12 9.618l4.928-2.648v2.352zM12 14.38l-7-3.763V7.384l7 3.763 7-3.763v3.233L12 14.38z"/>
    </svg>
  );
}

function SoundCloudIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M1.175 12.225c-.017 0-.034.001-.05.002A1.155 1.155 0 0 0 0 13.38v.244a1.155 1.155 0 0 0 1.175 1.154c.016 0 .033-.001.05-.002l.246.002c.64 0 1.175-.496 1.175-1.154V13.38c0-.658-.535-1.154-1.175-1.154l-.296-.001zm4.102 3.357c-.646 0-1.175.496-1.175 1.154v.244c0 .658.529 1.154 1.175 1.154s1.175-.496 1.175-1.154v-.244c0-.658-.529-1.154-1.175-1.154zm4.099-7.028c-.084-.004-.17-.006-.256-.006a4.85 4.85 0 0 0-4.85 4.85c0 .01.001.02.001.03v3.316a1.155 1.155 0 0 0 1.175 1.154c.64 0 1.175-.496 1.175-1.154V13.41a2.5 2.5 0 0 1 2.5-2.5c.088 0 .175.005.261.013V8.558a5.074 5.074 0 0 0-.006-.004zm7.773 1.226a5.35 5.35 0 0 0-3.538 1.337 4.85 4.85 0 0 0-1.88-1.18V16.8c0 .658.528 1.154 1.175 1.154.64 0 1.175-.496 1.175-1.154v-5.5a3 3 0 0 1 3.068-2.995 3 3 0 0 1 2.93 3v5.495c0 .658.528 1.154 1.175 1.154.64 0 1.175-.496 1.175-1.154v-5.495a5.35 5.35 0 0 0-5.28-5.351z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

const PLATFORM_META: Record<string, { label: string; icon: () => JSX.Element; color: string }> = {
  spotify:    { label: "Spotify",     icon: SpotifyIcon,    color: "#1DB954" },
  youtube:    { label: "YouTube",     icon: YouTubeIcon,    color: "#FF0000" },
  appleMusic: { label: "Apple Music", icon: AppleMusicIcon, color: "#FA233B" },
  soundcloud: { label: "SoundCloud",  icon: SoundCloudIcon, color: "#FF5500" },
};

/* ══════════════════════════════════════
   COMPONENT
══════════════════════════════════════ */
export default function HomePlaylistStreamingSection({
  stream = null,
  albums = [],
}: HomePlaylistStreamingSectionProps) {
  const albumList = albums ?? [];
  const years = useMemo(
    () => [...new Set(albumList.map((a) => a.year))].filter(Boolean).sort((a, b) => b - a),
    [albumList],
  );

  const [selectedYear, setSelectedYear] = useState<number>(() => years[0] ?? 0);

  const selectedAlbum = albumList.find((a) => a.year === selectedYear);

  const youtubeLink =
    stream?.stream_url?.includes("youtube") || stream?.stream_url?.includes("youtu.be")
      ? stream.stream_url
      : stream?.link?.includes("youtube") || stream?.link?.includes("youtu.be")
        ? stream.link
        : null;
  const facebookLink =
    stream?.link?.includes("facebook") ? stream.link
    : stream?.stream_url?.includes("facebook") ? stream.stream_url
    : null;

  const streamTime = stream
    ? [fmtTime(stream.start_time), fmtTime(stream.end_time)].filter(Boolean).join(" – ")
    : null;

  const streamOverlayTime = stream
    ? (() => {
        const start = fmtTime(stream.start_time);
        if (!start) return null;
        return stream.end_time
          ? `${start} – ${fmtTime(stream.end_time)} EAT`
          : `${start} EAT`;
      })()
    : null;

  if (!stream && albumList.length === 0) {
    return null;
  }

  return (
    <section id="music" className={styles.section}>
      <div className={styles.inner}>

        {stream && (
        <motion.div
          className={styles.streamBlock}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Left — player */}
          <div className={styles.streamPlayer}>
            <div
              className={`${styles.streamOffline} ${stream.cover ? styles.streamOfflineHasCover : ""}`}
              style={
                stream.cover
                  ? {
                      backgroundImage: `url(${stream.cover})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : undefined
              }
            >
              {stream.cover && (
                <div className={styles.streamOfflineDim} aria-hidden="true" />
              )}
              <StreamUpcomingOverlay date={stream.date} time={streamOverlayTime} />
            </div>
          </div>

          {/* Right — info */}
          <div className={styles.streamInfo}>
            <div className={styles.streamBadgeRow}>
              <span className={styles.upcomingBadge}>UPCOMING</span>
            </div>

            <h3 className={styles.streamTitle}>{stream.title}</h3>

            <div className={styles.streamMeta}>
              <span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {fmtStreamDate(stream.date)}
              </span>
              {streamTime && (
                <span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {streamTime}
                </span>
              )}
              {stream.location && (
                <span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {stream.location}
                </span>
              )}
            </div>

            {stream.description && (
              <p className={styles.streamDesc}>{stream.description}</p>
            )}

            {(youtubeLink || facebookLink) && (
              <div className={styles.streamChannels}>
                <span className={styles.streamChannelsLabel}>Watch on</span>
                <div className={styles.streamChannelBtns}>
                  {youtubeLink && (
                    <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className={`${styles.channelBtn} ${styles.channelBtnYt}`}>
                      <YouTubeIcon /> YouTube
                    </a>
                  )}
                  {facebookLink && (
                    <a href={facebookLink} target="_blank" rel="noopener noreferrer" className={`${styles.channelBtn} ${styles.channelBtnFb}`}>
                      <FacebookIcon /> Facebook
                    </a>
                  )}
                </div>
              </div>
            )}

            {youtubeLink && (
              <div className={styles.reminderRow}>
                <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className={styles.reminderBtn}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                  Set Reminder on YouTube
                </a>
              </div>
            )}
          </div>
        </motion.div>
        )}

        {albumList.length > 0 && selectedAlbum && (
        <div className={styles.discography}>
          <motion.div
            className={styles.discographyHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.discographyTitle}>
              <span className={styles.eyebrow}>Our Music</span>
              <h2 className={styles.title}>Discography</h2>
            </div>
            {/* Year tabs */}
            <div className={styles.yearTabs} role="tablist" aria-label="Album year">
              {years.map((year) => (
                <button
                  key={year}
                  type="button"
                  role="tab"
                  aria-selected={selectedYear === year}
                  className={`${styles.yearTab} ${selectedYear === year ? styles.yearTabActive : ""}`}
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Album panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedYear}
              className={styles.albumPanel}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Cover */}
              <div className={styles.albumCoverWrap}>
                <div className={styles.albumCoverShadow} aria-hidden="true" />
                <img
                  className={styles.albumCover}
                  src={selectedAlbum.cover}
                  alt={`${selectedAlbum.title} album cover`}
                  loading="lazy"
                />
                <div className={styles.albumCoverOverlay}>
                  <span className={styles.albumYear}>{selectedAlbum.year}</span>
                </div>
              </div>

              {/* Info */}
              <div className={styles.albumInfo}>
                <span className={styles.albumLabel}>Album · {selectedAlbum.year}</span>
                <h3 className={styles.albumTitle}>{selectedAlbum.title}</h3>
                <p className={styles.albumMeta}>
                  Patmos Choir
                  {selectedAlbum.trackCount > 0 && (
                    <> &nbsp;·&nbsp; {selectedAlbum.trackCount} {selectedAlbum.trackCount === 1 ? "song" : "songs"}</>
                  )}
                </p>

                {selectedAlbum.description && (
                  <p className={styles.streamDesc}>{selectedAlbum.description}</p>
                )}

                <div className={styles.albumDivider} aria-hidden="true" />

                <p className={styles.albumStreamLabel}>Listen on</p>
                <div className={styles.platformLinks}>
                  {(Object.entries(selectedAlbum.links) as [string, string][]).map(([platform, url]) => {
                    const meta = PLATFORM_META[platform];
                    if (!meta) return null;
                    const Icon = meta.icon;
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.platformBtn}
                        style={{ "--platform-color": meta.color } as React.CSSProperties}
                        aria-label={`Listen on ${meta.label}`}
                        title={`Listen on ${meta.label}`}
                      >
                        <Icon />
                        <span>{meta.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        )}

      </div>
    </section>
  );
}
