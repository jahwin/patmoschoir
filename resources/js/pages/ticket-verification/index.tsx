import { useMemo, useState } from "react";
import { Head, router, usePage, Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import Button from "@/components/shared/Button";
import TicketCard from "@/components/shared/TicketCard";
import styles from "./style.module.scss";
import { SharedData } from '@/types/shared';

interface TicketVerificationResponse {
    status: string,
    message: string,
    return: {
        seatType: string,
        ticketToken: string,
        bill_to_first_name: string | null,
        bill_to_last_name: string | null,
        bill_to_phone: string | null,
        payment_type: string,
        transactionid: string,
        eventTitle: string,
        eventVenue: string,
        eventCoverImage: string,
        eventStartTime: string,
        eventEndTime: string,
        ticketTemplate: string | null
    }[] | null
}

export default function TicketVerification() {
    const page = usePage();
    const currentUrl = page.url || "";
    // Resolve id from props, query string, or path
    const id = useMemo(() => {
        const propsId = (page.props as unknown as SharedData & { id?: string })?.id;
        if (propsId) return propsId;
        try {
            const url = new URL(currentUrl, window.location.origin);
            const qId = url.searchParams.get("id");
            if (qId) return qId;
        } catch { /* no-op */ }
        const parts = currentUrl.split("?")[0].split("/").filter(Boolean);
        const last = parts[parts.length - 1];
        if (last && last !== "ticket-verification") return last;
        return "";
    }, [page, currentUrl]);
    const [contactInfo, setContactInfo] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [ticketDetails, setTicketDetails] = useState<TicketVerificationResponse | null>(null);
    const [showTicket, setShowTicket] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            if (!contactInfo.trim()) {
                setError("Please enter your phone number or email");
                return;
            }

            if (!id) {
                setError("Please enter a valid transaction ID");
                return;
            }

            // Check if it's a valid email or phone number
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo);
            const isPhone = /^[0-9]{10}$/.test(contactInfo.replace(/[\s\-\(\)]/g, ""));

            if (!isEmail && !isPhone) {
                setError("Please enter a valid phone number (Ex:07...) or email address");
                return;
            }

            const response = await fetch('https://api-watch.wecodefy.com/api/v1/event/tickets/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailOrPhone: contactInfo,
                    transationId: id || ""
                })
            });

            if (!response.ok) {
                if (response.status === 404) {
                    setError("Ticket not available. Please check your email/phone number and transaction ID.");
                    return;
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.status === 'ok' && data.return) {
                setTicketDetails(data);
                setShowTicket(true);
            } else if (data.status === 'bad' && data.return === null) {
                setError("No ticket found for the provided information. Please check your email/phone number.");
            } else {
                setError(data.message || "Ticket verification failed");
            }

        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContactInfo(e.target.value);
        if (error) setError("");
    };

    const handleShareTicket = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Album Launch',
                text: 'Check out my ticket for Voices in Harmony!',
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Ticket link copied to clipboard!');
        }
    };

    const handleViewTicket = () => {
        // Implement view ticket functionality
        // Could open a modal or navigate to a detailed view
    };

    // Helper function to format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Helper function to format time
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <>
            <Head title="Ticket Verification" />
            <div className={styles.container}>
                {!showTicket ? (
                    <div className={styles.content}>
                        {/* Logo */}
                        <div className={styles.logoContainer}>
                            {/* <img
                                src={Logo}
                                alt="Icyambu Logo"
                                className={styles.logo}
                            /> */}
                        </div>

                        {/* Title */}
                        <h1 className={styles.title}>
                            Ticket Verification
                        </h1>

                        {/* Description */}
                        <p className={styles.description}>
                            Enter your phone number or email to verify your ticket
                        </p>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.inputContainer}>
                                <input
                                    type="text"
                                    value={contactInfo}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number or email"
                                    className={styles.input}
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className={styles.errorMessage}>
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                shape="rounded"
                                disabled={isLoading || !contactInfo.trim()}
                                loading={isLoading}
                                rightIcon={<ArrowRight />}
                                className={styles.submitButton}
                                fullWidth
                            >
                                Continue
                            </Button>
                        </form>

                        {/* Back to Home */}
                        <Link href="/" className={styles.backButton}>
                            ← Back to Home
                        </Link>
                    </div>
                ) : (
                    <div className={styles.ticketContainer}>
                        {/* Success Message */}
                        <div className={styles.successMessage}>
                            <h2>Ticket Verified Successfully!</h2>
                            <p>Here are your ticket details:</p>
                        </div>
                        <div className={styles.ticketCardsContainer}>
                            {/* Ticket Card */}
                            {ticketDetails?.return && ticketDetails.return.length > 0 && ticketDetails.return.map((ticket) => (
                                <TicketCard
                                    ticketToken={ticket.ticketToken}
                                    eventTitle={ticket.eventTitle}
                                    eventSubtitle="CONCERT"
                                    eventDate={formatDate(ticket.eventStartTime)}
                                    eventTime={formatTime(ticket.eventStartTime)}
                                    venue={ticket.eventVenue}
                                    seatInfo={`${ticket.eventVenue} (${ticket.seatType})`}
                                    coverImage={ticket.eventCoverImage}
                                    onShare={handleShareTicket}
                                    onViewTicket={handleViewTicket}
                                // className={styles.ticketCard}
                                />
                            ))}
                        </div>


                        {/* Action Buttons */}
                        <div className={styles.actionButtons}>
                            <Button
                                variant="outline"
                                size="md"
                                shape="rounded"
                                onClick={() => setShowTicket(false)}
                                className={styles.actionButton}
                            >
                                Verify Another
                            </Button>
                            <Button
                                variant="primary"
                                size="md"
                                shape="rounded"
                                onClick={() => router.visit("/")}
                                className={styles.actionButton}
                            >
                                Back to Home
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
