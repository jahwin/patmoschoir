import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import Cover1 from "~/assets/images/cover-1.jpg";
// import Cover2 from "~/assets/images/cover-2.jpg";
// import Cover3 from "~/assets/images/cover-3.jpg";
// import Cover4 from "~/assets/images/cover-4.jpg";
import Button from "@/components/shared/Button";
import styles from "./AlbumCarousel.module.scss";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface AlbumImage {
    src: string;
    alt: string;
}

interface AlbumCarouselProps {
    images?: AlbumImage[];
    className?: string;
}

const DEFAULT_IMAGES: AlbumImage[] = [
    {
        src: 'Cover1',
        alt: "Album Cover 1"
    },
    {
        src: 'Cover2',
        alt: "Album Cover 2"
    },
    {
        src: 'Cover3',
        alt: "Album Cover 3"
    },
    {
        src: 'Cover4',
        alt: "Album Cover 4"
    }
];

export default function AlbumCarousel({
    images = DEFAULT_IMAGES,
    className = ""
}: AlbumCarouselProps) {
    return (
        <div className={`${styles.carousel} ${className}`}>
            <div className={styles.carouselContainer}>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    pagination={{
                        clickable: true,
                        bulletClass: 'swiper-pagination-bullet !bg-yellow-400/50',
                        bulletActiveClass: 'swiper-pagination-bullet-active !bg-yellow-400'
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    className="w-full h-full rounded-xl"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <Button
                    variant="navigation"
                    size="md"
                    shape="circle"
                    className={`${styles.prevButton} swiper-button-prev-custom`}
                >
                    <ChevronLeft />
                </Button>
                <Button
                    variant="navigation"
                    size="md"
                    shape="circle"
                    className={`${styles.nextButton} swiper-button-next-custom`}
                >
                    <ChevronRight />
                </Button>
            </div>
            {/* Album cover glow */}
            <div className={styles.glowEffect}></div>
        </div>
    );
}
