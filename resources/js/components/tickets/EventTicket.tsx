import { ASSETS_BASE_URL } from "@/types/shared/urls";
import QrCodePreview from "./QrCodePreview";
import styles from "./EventTicket.module.scss";

export interface TicketItem {
    seatType: string;
    ticketToken: string;
    eventTitle: string;
    eventVenue: string;
    eventCoverImage: string;
    eventStartTime: string;
    eventEndTime: string;
    ticketTemplate?: string | null;
}

interface EventTicketProps {
    ticket: TicketItem;
    brandLabel?: string;
    onViewTicket: (ticketToken: string) => void;
}

function formatDateTime(dateString: string, format: "date" | "time"): string {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "—";

    if (format === "date") {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }

    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

function ticketCode(token: string): string {
    const part = token.split("_")[1];
    return part ? `#TK_${part}` : token;
}

function coverUrl(filename: string): string {
    if (!filename) return "";
    if (filename.startsWith("http")) return filename;
    return `${ASSETS_BASE_URL}assets/uploaded/${filename}`;
}

export default function EventTicket({ ticket, brandLabel = "PATMOS", onViewTicket }: EventTicketProps) {
    const handleShare = async () => {
        const link = `${window.location.origin}/tk?q=${encodeURIComponent(ticket.ticketToken)}`;
        const message = `Your ticket for ${ticket.eventTitle}\nToken: ${ticket.ticketToken}\nLink: ${link}`;

        if (navigator.share) {
            try {
                await navigator.share({ title: ticket.eventTitle, text: message, url: link });
                return;
            } catch {
                /* fall through to clipboard */
            }
        }

        try {
            await navigator.clipboard.writeText(message);
            alert("Ticket link copied to clipboard!");
        } catch {
            alert(message);
        }
    };

    return (
        <article className={styles.ticketItem}>
            <div
                className={styles.ticketBrand}
                onClick={() => onViewTicket(ticket.ticketToken)}
                onKeyDown={(e) => e.key === "Enter" && onViewTicket(ticket.ticketToken)}
                role="button"
                tabIndex={0}
                title="View ticket"
            >
                <div className={styles.mobileQr}>
                    <QrCodePreview value={ticket.ticketToken} size={72} />
                </div>
                {ticket.eventCoverImage ? (
                    <img src={coverUrl(ticket.eventCoverImage)} alt="" draggable={false} />
                ) : (
                    <div className={styles.coverFallback}>{brandLabel}</div>
                )}
            </div>

            <div className={styles.ticketContent}>
                <div className={styles.ticketType}>
                    {ticket.eventVenue} <span>({ticket.seatType})</span>
                </div>
                <div className={styles.ticketEventTitle}>{ticket.eventTitle}</div>
                <div className={styles.ticketDetails}>
                    <div className={styles.ticketDetailsItem}>
                        <div className={styles.ticketDetailsItemHeader}>DATE</div>
                        <div className={styles.ticketDetailsItemBody}>
                            {formatDateTime(ticket.eventStartTime, "date")}
                        </div>
                    </div>
                    <div className={styles.ticketDetailsItem}>
                        <div className={styles.ticketDetailsItemHeader}>TIME</div>
                        <div className={styles.ticketDetailsItemBody}>
                            {formatDateTime(ticket.eventStartTime, "time")}
                        </div>
                    </div>
                </div>
                <div className={styles.ticketOption}>
                    <button type="button" className={styles.share} onClick={handleShare}>
                        SHARE
                    </button>
                    <button
                        type="button"
                        className={styles.view}
                        onClick={() => onViewTicket(ticket.ticketToken)}
                    >
                        VIEW TICKET
                    </button>
                </div>
            </div>

            <div className={styles.ticketDivider} aria-hidden>
                <div className={styles.firstCircle} />
                <div className={styles.dotedLine} />
                <div className={styles.secondCircle} />
            </div>

            <div className={styles.ticketOptions}>
                <div className={styles.ticketOptionsContainer}>
                    <span className={styles.ticketNumber}>{ticketCode(ticket.ticketToken)}</span>
                    <QrCodePreview value={ticket.ticketToken} size={130} />
                </div>
            </div>
        </article>
    );
}
