// import Logo from "~/assets/images/logo.png";
import AudioPlayer from "@/components/shared/AudioPlayer";
import CountdownTimer from "@/components/shared/CountdownTimer";
import AlbumCarousel from "@/pages/gallery/components/AlbumCarousel";
import EventDetails from "@/pages/events/components/EventDetails";
import TicketSection from "@/pages/events/components/TicketSection";
import Button from "@/components/shared/Button";
import type { PricingItem } from "@/types/shared/ICommon";
import styles from "./HeroSection.module.scss";

interface HeroSectionProps {
    eventDate: Date;
    pricingData: PricingItem[];
    pricingLoading: boolean;
    pricingError: string | null;
    onBuyNow: (pricingId: number) => void;
    onRetryPricing: () => void;
    backgroundImage?: string;
    className?: string;
}

export default function HeroSection({
    eventDate,
    pricingData,
    pricingLoading,
    pricingError,
    onBuyNow,
    onRetryPricing,
    backgroundImage = "https://www.newtimes.co.rw/thenewtimes/uploads/images/2024/12/26/thumbs/1200x700/67267.jpg",
    className = ""
}: HeroSectionProps) {
    return (
        <section className={`${styles.heroSection} ${className}`}>
            {/* Background Image */}
            <div
                className={styles.backgroundImage}
                style={{ backgroundImage: `url('${backgroundImage}')` }}
            >
                <div className={styles.backgroundOverlay}></div>
            </div>

            <div className={styles.container}>
                {/* Logo */}
                <div className={styles.logo}>
                    {/* <img
                        src={Logo}
                        alt="Logo"
                        className={styles.logoImage}
                    /> */}
                </div>

                {/* Audio Controls */}
                <div className={styles.audioControls}>
                    <AudioPlayer />
                </div>

                <div className={styles.mainLayout}>
                    {/* Left Section - Event Information */}
                    <div className={styles.leftSection}>
                        {/* Large Album Cover Carousel at Top */}
                        <div className={styles.albumCarouselWrapper}>
                            <AlbumCarousel />
                        </div>

                        <div className={styles.mobileTicketButtonWrapper}>
                            <Button
                                href="#get-tickets"
                                variant="primary"
                                size="lg"
                                shape="rounded"
                                className={styles.mobileTicketButton}
                            >
                                Get Your Ticket
                            </Button>

                        </div>

                        {/* Countdown Timer - Absolute positioned */}
                        <div className={styles.countdownTimer}>
                            <CountdownTimer eventDate={eventDate} />
                        </div>

                        <div>
                            <h1 className={styles.mainHeading}>
                                <span className={styles.highlight}>Album</span> Launch
                            </h1>
                            <p className={styles.description}>
                                Welcome to the Israel Mbonyi Album Launch! Join us on 05th October 2025 at Intare Arena for a night of Worship, Music and Celebration. <br /> We are honored to have you with us.
                            </p>
                        </div>

                        {/* Event Details */}
                        <EventDetails className={styles.eventDetails} />
                    </div>

                    {/* Right Section - Ticket Information */}
                    <TicketSection
                        pricingData={pricingData}
                        pricingLoading={pricingLoading}
                        pricingError={pricingError}
                        onBuyNow={onBuyNow}
                        onRetry={onRetryPricing}
                    />
                </div>
            </div>
        </section>
    );
}
