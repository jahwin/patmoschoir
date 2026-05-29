import { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { ArrowRight, Ticket } from "lucide-react";
import Button from "@/components/shared/Button";
import EventTicket, { type TicketItem } from "@/components/tickets/EventTicket";
import { EVENT_TICKETS_VERIFY_URL } from "@/types/shared/urls";
import type { SharedData } from "@/types/shared";
import styles from "./style.module.scss";

type PagePhase = "verify" | "tickets" | "empty";

interface PageProps {
    transactionId?: string;
    id?: string;
    [key: string]: unknown;
}

export default function MyTickets() {
    const { props } = usePage<SharedData & PageProps>();
    const transactionId = props.transactionId ?? props.id ?? "";

    const siteLogo = props.siteContent?.site_logo;
    const siteName = props.siteContent?.site_name ?? "Patmos Choir";
    const brandLabel = siteName.replace(/\s+/g, " ").trim().slice(0, 12).toUpperCase() || "PATMOS";

    const [phase, setPhase] = useState<PagePhase>("verify");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [tickets, setTickets] = useState<TicketItem[]>([]);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!phone.trim()) {
            setError("Please enter your phone number or email");
            return;
        }

        if (!transactionId) {
            setError("Invalid ticket link. Please use the link from your confirmation message.");
            return;
        }

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(phone.trim());
        const isPhone = /^[0-9]{10}$/.test(phone.replace(/[\s\-\(\)]/g, ""));

        if (!isEmail && !isPhone) {
            setError("Please enter a valid phone number (e.g. 07...) or email address");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(EVENT_TICKETS_VERIFY_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    emailOrPhone: phone.trim(),
                    transationId: transactionId,
                }),
            });

            if (!response.ok) {
                if (response.status === 404) {
                    setError("Ticket not available. Check your email/phone and try again.");
                    return;
                }
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            if (data.status === "ok" && Array.isArray(data.return) && data.return.length > 0) {
                setTickets(data.return);
                setPhase("tickets");
            } else if (data.status === "bad" && data.return === null) {
                setPhase("empty");
            } else {
                setError(data.message || "Ticket verification failed");
            }
        } catch {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleTryAgain = () => {
        setPhase("verify");
        setTickets([]);
        setError("");
    };

    const viewTicket = (ticketToken: string) => {
        window.open(`/tk?q=${encodeURIComponent(ticketToken)}`, "_blank", "noopener,noreferrer");
    };

    return (
        <>
            <Head title="My Tickets" />
            <div className={styles.mytickets}>
                <Link href="/" className={styles.logoLink}>
                    {siteLogo ? (
                        <img src={siteLogo} alt={siteName} />
                    ) : (
                        <span className={styles.logoFallback}>{brandLabel}</span>
                    )}
                </Link>

                {phase === "verify" && (
                    <form className={styles.verifyPhone} onSubmit={handleVerify}>
                        <h2>Phone / Email Verification</h2>
                        <p>Enter your phone number or email to verify your ticket</p>
                        <input
                            type="text"
                            placeholder="Enter your phone number or email"
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                                if (error) setError("");
                            }}
                            disabled={loading}
                            required
                        />
                        {error && <p className={styles.error}>{error}</p>}
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            shape="rounded"
                            disabled={loading || !phone.trim()}
                            loading={loading}
                            rightIcon={<ArrowRight />}
                            className={styles.submitBtn}
                            fullWidth
                        >
                            Continue
                        </Button>
                    </form>
                )}

                {phase === "tickets" && tickets.length > 0 && (
                    <div className={styles.ticketsContainer}>
                        <div className={styles.ticketsHeader}>
                            <h2>My Tickets</h2>
                        </div>
                        <Link href="/" className={styles.goBack}>
                            Go Home
                        </Link>
                        <div className={styles.ticketsGrid}>
                            {tickets.map((ticket) => (
                                <EventTicket
                                    key={ticket.ticketToken}
                                    ticket={ticket}
                                    brandLabel={brandLabel}
                                    onViewTicket={viewTicket}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {phase === "empty" && (
                    <div className={styles.noTickets}>
                        <h1>My Tickets</h1>
                        <Ticket className={styles.icon} strokeWidth={1.25} aria-hidden />
                        <h2>No tickets found!</h2>
                        <div className={styles.links}>
                            <button type="button" className={styles.tryAgain} onClick={handleTryAgain}>
                                Try Again
                            </button>
                            <Link href="/" className={styles.goBackBtn}>
                                Go Back
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
