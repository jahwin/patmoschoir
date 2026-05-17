import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, usePage } from "@inertiajs/react";
import styles from "./HomeGallerySection.module.scss";
import GalleryModal from "@/pages/gallery/components/GalleryModal";

// ── local image imports (used by mock data only) ──
import p1  from "../../../../assets/patmos/1.JPG";
import p2  from "../../../../assets/patmos/2.JPG";
import p3  from "../../../../assets/patmos/3.JPG";
import p4  from "../../../../assets/patmos/4.JPG";
import p5  from "../../../../assets/patmos/5.JPG";
import p6  from "../../../../assets/patmos/6.JPG";
import p7  from "../../../../assets/patmos/7.JPG";
import p8  from "../../../../assets/patmos/8.jpeg";
import p9  from "../../../../assets/patmos/9.jpeg";
import p10 from "../../../../assets/patmos/10.jpeg";
import p11 from "../../../../assets/patmos/11.jpeg";
import p12 from "../../../../assets/patmos/IMG_2078.JPEG";

const MOCK_ITEMS: HomeGalleryItem[] = [
  // 2024
  {
    id: 101,
    title: "Songs of Worship Concert 2024",
    image: p1,
    description: "A powerful night of worship at the Kigali Convention Center. The choir lifted voices in praise before a packed audience.",
    images: [p2, p3, p4, p5],
    created_at: "2024-11-15T18:00:00Z",
    updated_at: "2024-11-15T18:00:00Z",
  },
  {
    id: 102,
    title: "Praise & Prayer Night — Remera",
    image: p6,
    description: "An evening dedicated to prayer and worship at SDA Remera. Hearts were moved and lives were touched.",
    images: [p7, p8, p9],
    created_at: "2024-06-22T19:00:00Z",
    updated_at: "2024-06-22T19:00:00Z",
  },
  {
    id: 103,
    title: "Hospital Outreach — CHUK",
    image: p10,
    description: "Bringing songs of hope to patients and staff at CHUK Hospital, Kigali. A ministry of presence and compassion.",
    images: [p11, p12],
    created_at: "2024-03-08T10:00:00Z",
    updated_at: "2024-03-08T10:00:00Z",
  },
  {
    id: 104,
    title: "Easter Sunday Concert",
    image: p3,
    description: "Celebrating the resurrection with songs of victory and joy. A glorious Easter morning service.",
    images: [p4, p5, p6],
    created_at: "2024-03-31T08:00:00Z",
    updated_at: "2024-03-31T08:00:00Z",
  },
  // 2023
  {
    id: 105,
    title: "Christmas Cantata 2023",
    image: p7,
    description: "The annual Christmas cantata brought joy and wonder as Patmos Choir sang the story of Christ's birth.",
    images: [p8, p9, p1],
    created_at: "2023-12-24T17:00:00Z",
    updated_at: "2023-12-24T17:00:00Z",
  },
  {
    id: 106,
    title: "Youth Revival Weekend",
    image: p10,
    description: "Three nights of revival music geared towards the youth of Kigali. Powerful encounters with God's presence.",
    images: [p11, p12],
    created_at: "2023-08-18T18:30:00Z",
    updated_at: "2023-08-18T18:30:00Z",
  },
  {
    id: 107,
    title: "Prison Ministry — Nyanza",
    image: p2,
    description: "Sharing the message of grace and redemption through music with young people in rehabilitation.",
    images: [p3, p4],
    created_at: "2023-04-05T09:00:00Z",
    updated_at: "2023-04-05T09:00:00Z",
  },
  {
    id: 108,
    title: "Women's Day Celebration",
    image: p5,
    description: "A special musical tribute in honor of the women of the church — mothers, sisters, and daughters.",
    images: [p6, p7, p8],
    created_at: "2023-03-11T10:00:00Z",
    updated_at: "2023-03-11T10:00:00Z",
  },
  // 2022
  {
    id: 109,
    title: "Annual Choir Anniversary",
    image: p9,
    description: "Celebrating 26 years of Patmos Choir — a night of testimonies, memories, and worship.",
    images: [p10, p11, p12, p1],
    created_at: "2022-09-17T18:00:00Z",
    updated_at: "2022-09-17T18:00:00Z",
  },
  {
    id: 110,
    title: "Elderly Home Visit — Nyamirambo",
    image: p2,
    description: "A Sunday afternoon with the elderly residents of Maison des Aînés, bringing worship and fellowship.",
    images: [p3, p4],
    created_at: "2022-05-22T14:00:00Z",
    updated_at: "2022-05-22T14:00:00Z",
  },
  {
    id: 111,
    title: "New Year's Eve Worship Night",
    image: p5,
    description: "Ringing in 2022 with songs of thanksgiving and hope. The whole congregation prayed and worshipped into the new year.",
    images: [p6, p7, p8],
    created_at: "2022-01-01T00:00:00Z",
    updated_at: "2022-01-01T00:00:00Z",
  },
  // 2021
  {
    id: 112,
    title: "Outdoor Crusade — Kimisagara",
    image: p9,
    description: "An open-air crusade in Kimisagara drew hundreds of community members. Lives were surrendered to Christ.",
    images: [p10, p11, p12, p1],
    created_at: "2021-10-12T16:00:00Z",
    updated_at: "2021-10-12T16:00:00Z",
  },
  {
    id: 113,
    title: "Wedding Ministry — Gasabo",
    image: p2,
    description: "Blessed to minister at the wedding of a beloved community member. Songs of joy and covenant.",
    images: [p3, p4],
    created_at: "2021-07-03T11:00:00Z",
    updated_at: "2021-07-03T11:00:00Z",
  },
];

export interface HomeGalleryItem {
  id: number;
  title: string;
  image: string;
  description: string;
  images: string[];
  created_at: string;
  updated_at: string;
}

const INITIAL_LIMIT = 8;
const LOAD_MORE_STEP = 8;

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function getYear(dateStr: string): number {
  return new Date(dateStr).getFullYear();
}

function groupByYear(items: HomeGalleryItem[]): Record<number, HomeGalleryItem[]> {
  return items.reduce<Record<number, HomeGalleryItem[]>>((acc, item) => {
    const year = getYear(item.created_at);
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {});
}

export default function HomeGallerySection({ items }: { items?: HomeGalleryItem[] }) {
  const [limit, setLimit] = useState(INITIAL_LIMIT);
  const [selectedItem, setSelectedItem] = useState<HomeGalleryItem | null>(null);
  const [modalIndex, setModalIndex] = useState(0);
  const isHomePage = usePage().url.split("?")[0] === "/";

  // Use real data when available, otherwise fall back to mock
  const source = items && items.length > 0 ? items : MOCK_ITEMS;

  // Sort all items newest-first by created_at
  const sorted = useMemo(
    () => [...source].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [source]
  );

  const visible = sorted.slice(0, limit);
  const hasMore = limit < sorted.length;

  // Group visible items by year (order: newest year first)
  const grouped = useMemo(() => groupByYear(visible), [visible]);
  const years = useMemo(
    () => Object.keys(grouped).map(Number).sort((a, b) => b - a),
    [grouped]
  );

  const openModal = (item: HomeGalleryItem) => {
    const idx = sorted.findIndex((i) => i.id === item.id);
    setModalIndex(idx);
    setSelectedItem(item);
  };

  const handlePrev = () => {
    const next = modalIndex - 1;
    if (next >= 0) { setModalIndex(next); setSelectedItem(sorted[next]); }
  };

  const handleNext = () => {
    const next = modalIndex + 1;
    if (next < sorted.length) { setModalIndex(next); setSelectedItem(sorted[next]); }
  };

  return (
    <>
      <section id="gallery" className={styles.section}>
        <div className={styles.inner}>

          {/* Header (home page only) */}
          {isHomePage && (
            <motion.div
              className={styles.header}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <span className={styles.eyebrow}>Captured Moments</span>
              <h2 className={styles.title}>Gallery</h2>
              <p className={styles.subtitle}>
                Memories from worship nights, outreaches, concerts, and community.
              </p>
            </motion.div>
          )}

          {/* Year groups */}
          {years.map((year) => (
            <div key={year} className={styles.yearGroup}>
              {/* Year label */}
              <motion.div
                className={styles.yearLabel}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <span className={styles.yearNum}>{year}</span>
                <span className={styles.yearLine} aria-hidden="true" />
                <span className={styles.yearCount}>
                  {grouped[year].length} {grouped[year].length === 1 ? "album" : "albums"}
                </span>
              </motion.div>

              {/* Album grid */}
              <div className={styles.albumGrid}>
                {grouped[year].map((item, i) => (
                  <motion.div
                    key={item.id}
                    className={styles.albumCard}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.45, delay: (i % 4) * 0.07 }}
                    onClick={() => openModal(item)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${item.title} — ${formatDate(item.created_at)}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openModal(item);
                      }
                    }}
                  >
                    {/* Cover image */}
                    <div className={styles.albumCoverWrap}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className={styles.albumImg}
                        loading="lazy"
                      />
                      {/* Hover overlay */}
                      <div className={styles.albumOverlay}>
                        <div className={styles.overlayTop}>
                          <span className={styles.overlayPhotoCount}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/>
                            </svg>
                            {1 + (item.images?.length ?? 0)} photo{1 + (item.images?.length ?? 0) !== 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className={styles.overlayBottom}>
                          <p className={styles.overlayTitle}>{item.title}</p>
                          <p className={styles.overlayDate}>{formatDate(item.created_at)}</p>
                          <span className={styles.overlayViewBtn} aria-hidden="true">
                            View Album
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                          </span>
                        </div>
                      </div>

                      {/* Image count badge (always visible on mobile) */}
                      {item.images?.length > 0 && (
                        <span className={styles.countBadge} aria-hidden="true">
                          +{item.images.length}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          {/* Load More / footer */}
          <motion.div
            className={styles.footer}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {hasMore && (
              <button
                type="button"
                className={styles.loadMoreBtn}
                onClick={() => setLimit((prev) => prev + LOAD_MORE_STEP)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
                Load More Albums
                <span className={styles.loadMoreCount}>
                  {sorted.length - limit} remaining
                </span>
              </button>
            )}
            <Link href="/gallery" className={styles.viewAllBtn}>
              View Full Gallery
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* Lightbox / Slider */}
      <GalleryModal
        isOpen={!!selectedItem}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onPrevious={handlePrev}
        onNext={handleNext}
        hasPrevious={modalIndex > 0}
        hasNext={modalIndex < sorted.length - 1}
      />
    </>
  );
}
