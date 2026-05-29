import { Head, Link, usePage } from "@inertiajs/react";
import QrCodePreview from "@/components/tickets/QrCodePreview";
import type { SharedData } from "@/types/shared";
import styles from "./style.module.scss";

interface PageProps {
    ticketToken?: string;
    [key: string]: unknown;
}

export default function ViewTicket() {
    const { props } = usePage<SharedData & PageProps>();
    const ticketToken = props.ticketToken ?? "";

    const siteLogo = props.siteContent?.site_logo;
    const siteName = props.siteContent?.site_name ?? "Patmos Choir";

    return (
        <>
            <Head title="Ticket QR Code" />
            <div className={styles.page}>
                <Link href="/" className={styles.logoLink}>
                    {siteLogo ? (
                        <img src={siteLogo} alt={siteName} />
                    ) : (
                        <span className={styles.logoFallback}>{siteName}</span>
                    )}
                </Link>

                <div className={styles.qrContainer}>
                    <h1>Ticket QR Code</h1>
                    {ticketToken ? (
                        <div className={styles.qrCode}>
                            <QrCodePreview value={ticketToken} size={220} />
                        </div>
                    ) : null}
                    <p className={styles.instruction}>Scan this QR code for entry</p>
                    <Link href="/" className={styles.goHome}>
                        Go Home
                    </Link>
                </div>
            </div>
        </>
    );
}
