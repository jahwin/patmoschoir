import { MapPinIcon, Share2Icon, ShareIcon } from 'lucide-react';
import styles from './TicketCard.module.scss';
import QrCode from './QrCode';

interface TicketCardProps {
    eventTitle: string;
    eventSubtitle: string;
    eventDate: string;
    eventTime: string;
    venue: string;
    seatInfo: string;
    coverImage: string;
    onShare: () => void;
    onViewTicket: () => void;
    ticketToken: string;
}

function TicketCard({ eventTitle, eventSubtitle, eventDate, eventTime, venue, seatInfo, coverImage, onShare, onViewTicket, ticketToken }: TicketCardProps) {
    return (
        <div className={styles.ticketCard}>
            <div className={styles.ticketCover}>
                <img src="https://cagura-assets.b-cdn.net/assets/uploaded/r98xg25h42jfov0gwzvtq3pds8eivrir3jcw2ixjjful1z92sip8o.jpg" alt="Ticket Cover" />
                <div className={styles.ticketSlugs}>
                    <span>ICYAMBU</span>
                    <span>ICYAMBU</span>
                    <span>ICYAMBU</span>
                </div>
                <span className={styles.ticketCode}>#TK_{ticketToken.split('_')[1]}</span>
            </div>
            <div className={styles.ticketDetails}>
                <div className={styles.ticketDetailsDate}>
                    <span>SUNDAY</span>
                    <span>October 5th</span>
                    <span>2025</span>
                </div>
                <h1 className={styles.ticketDetailsTitle}>Album Launch</h1>
                <p className={styles.ticketDetailsDescription}>We are honored to have you with us.</p>
                <div className={styles.mobileQr}>
                    <QrCode value={ticketToken} size={190} />
                    <p>{ticketToken}</p>
                </div>
                <div className={styles.ticketDetailsInfo}>
                    <div className={styles.ticketDetailsInfoLocation}>
                        <span>Location</span>
                        <span>Intare Arena</span>
                    </div>
                    <div className={styles.ticketDetailsInfoTime}>
                        <span>Time</span>
                        <span>05:00 PM</span>
                    </div>
                </div>
                <div className={styles.ticketDetailsActions}>
                    {/* <button>
                        <Share2Icon />
                        Share
                    </button> */}
                    <a href="https://maps.app.goo.gl/EgXtpveJ8DfMPP5z7" target="_blank">
                        <MapPinIcon />
                        View Location
                    </a>
                </div>
            </div>
            <div className={styles.ticketQR}>
                <QrCode value={ticketToken} size={190} />
                <p>#TK_{ticketToken.split('_')[1]}</p>
            </div>
        </div>
    )
}

export default TicketCard;