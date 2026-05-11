import { PhoneCall } from "lucide-react";
import SocialLinks from "@/components/shared/SocialLinks";
import ContactInfo from "@/components/shared/ContactInfo";
import Button from "@/components/shared/Button";
import styles from "./TicketSection.module.scss";
import { PricingItem } from "@/types/shared/ICommon";



interface TicketSectionProps {
    pricingData: PricingItem[];
    pricingLoading: boolean;
    pricingError: string | null;
    onBuyNow: (pricingId: number) => void;
    onRetry: () => void;
    className?: string;
}

export default function TicketSection({
    pricingData,
    pricingLoading,
    pricingError,
    onBuyNow,
    onRetry,
    className = ""
}: TicketSectionProps) {
    return (
        <div className={`${styles.ticketSection} ${className}`} id="get-tickets">
            <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>
                    Get Your <span className={styles.highlight}>Tickets</span>
                </h3>
                <p className={styles.sectionDescription}>
                    Limited tickets available. Secure your spot for an unforgettable night of music and celebration.
                </p>
            </div>

            <Button
                href="tel:*797*50*2*79#"
                variant="primary"
                size="md"
                shape="rounded"
                leftIcon={<PhoneCall />}
                className={styles.phoneCallButton}
            >
                Kanda *797*50*2*79#
            </Button>

            {/* Quick Ticket Options */}
            <div className={styles.pricingContainer}>
                {pricingLoading ? (
                    <div className={styles.loadingContainer}>
                        <div className={styles.loadingContent}>
                            {/* Spinning loader */}
                            <div className={styles.spinner}></div>
                            <div className={styles.loadingText}>Loading ticket prices...</div>
                            <div className={styles.loadingSubtext}>Please wait while we fetch the latest pricing</div>
                        </div>
                    </div>
                ) : pricingError ? (
                    <div className={styles.errorContainer}>
                        <div className={styles.errorText}>
                            Error loading pricing: {pricingError}
                        </div>
                        <Button
                            onClick={onRetry}
                            variant="primary"
                            size="sm"
                            shape="rounded"
                            className={styles.retryButton}
                        >
                            Retry
                        </Button>
                    </div>
                ) : pricingData.length > 0 ? (
                    pricingData.map((ticket, index) => (
                        <div
                            key={index}
                            className={styles.pricingCard}
                        >
                            <div className={styles.pricingCardContent}>
                                <div className={styles.ticketInfo}>
                                    <h4 className={styles.ticketName}>{ticket.name}</h4>
                                    <p className={styles.ticketType}>Seat Ticket</p>
                                </div>
                                <div className={styles.priceSection}>
                                    <div className={styles.ticketPrice}>
                                        {Number(ticket.amount).toLocaleString()} {ticket.currency}
                                    </div>
                                    <Button
                                        onClick={() => onBuyNow(ticket.pricing_id)}
                                        variant="primary"
                                        size="sm"
                                        shape="rounded"
                                        className={styles.buyButton}
                                    >
                                        Buy Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.emptyState}>
                        No pricing data available
                    </div>
                )}
            </div>

            <div className={styles.socialLinksContainer}>
                <SocialLinks />
            </div>

            {/* Contact Info */}
            <ContactInfo />
        </div>
    );
}
