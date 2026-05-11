import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import styles from './HeroSectionBauen.module.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Slide {
  id: number;
  image: string | null;
  media_type: 'image' | 'video';
  video_url: string | null;
  created_at: string;
  updated_at: string;
}

interface HeroSectionBauenProps {
  className?: string;
  slides?: Slide[];
}

export default function HeroSectionBauen({ className = "", slides = [] }: HeroSectionBauenProps) {
  const fallbackSlides = [
    {
      id: 1,
      image: null,
      media_type: 'image',
      video_url: null,
      created_at: "",
      updated_at: ""
    },
  ];

  // Use database slides if available, otherwise use fallback
  const heroSlides = slides && slides.length > 0 ? slides : fallbackSlides;

  const hasMultipleSlides = heroSlides.length > 1;

  return (
    <section className={`${styles.heroSection} ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={
          hasMultipleSlides
            ? {
                nextEl: `.${styles.swiperButtonNext}`,
                prevEl: `.${styles.swiperButtonPrev}`,
              }
            : false
        }
        pagination={
          hasMultipleSlides
            ? {
                el: `.${styles.swiperPagination}`,
                clickable: true,
              }
            : false
        }
        autoplay={
          hasMultipleSlides
            ? {
                delay: 5000,
                disableOnInteraction: false,
              }
            : false
        }
        loop={hasMultipleSlides}
        speed={800}
        className={styles.swiperContainer}
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id} className={styles.swiperSlide}>
            <div className={styles.mediaLayer}>
              {slide.media_type === 'video' && slide.video_url ? (
                <SlideVideo src={slide.video_url} />
              ) : slide.image ? (
                <img className={styles.mediaImage} src={slide.image} alt="" />
              ) : (
                <div className={styles.mediaPlaceholder} aria-hidden="true" />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Controls */}
      {hasMultipleSlides ? (
        <>
          <div className={styles.carouselControls}>
            <button className={`${styles.carouselButton} ${styles.swiperButtonPrev}`} aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <button className={`${styles.carouselButton} ${styles.swiperButtonNext}`} aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </div>

          {/* Custom Pagination */}
          <div className={`${styles.swiperPagination} ${styles.customPagination}`}></div>
        </>
      ) : null}
    </section>
  );
}

function SlideVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [aspectRatio, setAspectRatio] = useState('16 / 9');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: { destroy: () => void } | null = null;
    const canPlayNative = video.canPlayType('application/vnd.apple.mpegurl');

    if (canPlayNative) {
      video.src = src;
      return;
    }

    let isMounted = true;

    import('hls.js')
      .then(({ default: Hls }) => {
        if (!isMounted || !video || !Hls.isSupported()) return;
        const instance = new Hls();
        instance.loadSource(src);
        instance.attachMedia(video);
        hls = instance;
      })
      .catch(() => {
        if (video) {
          video.src = src;
        }
      });

    return () => {
      isMounted = false;
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleLoadedMetadata = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const { videoWidth, videoHeight } = event.currentTarget;
    if (videoWidth > 0 && videoHeight > 0) {
      setAspectRatio(`${videoWidth} / ${videoHeight}`);
    }
  };

  return (
    <div className={styles.videoWrap} style={{ ['--media-aspect' as any]: aspectRatio }}>
      <video
        ref={videoRef}
        className={styles.mediaVideo}
        muted={isMuted}
        autoPlay
        loop
        playsInline
        onLoadedMetadata={handleLoadedMetadata}
      />
      <button
        type="button"
        className={styles.muteButton}
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
    </div>
  );
}
