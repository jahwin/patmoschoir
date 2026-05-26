import { X } from "lucide-react";
import styles from "@/pages/event-details/style.module.scss";
import modalStyles from "./TicketModal.module.scss";
import { EPayingType, PricingItem, VotingPricingItem } from "@/types/shared/ICommon";

interface TicketModalProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    selectedTicket: number | null;
    setSelectedTicket: (id: number | null) => void;
    numberOfPeople: number;
    setNumberOfPeople: (num: number) => void;
    email: string;
    setEmail: (email: string) => void;
    pricingData: PricingItem[] | VotingPricingItem[];
    paymentLoading: boolean;
    paymentError: string | null;
    setPaymentError: (error: string | null) => void;
    fetchPaymentWidget: (selectedPricing: PricingItem | VotingPricingItem) => void | Promise<void>;
    payingType?: EPayingType;
    modalText?: string;
    contentDescription?: string;
}

const isVipTier = (name: string) =>
    /vip/i.test(name);

export default function TicketModal({
    showModal,
    setShowModal,
    selectedTicket,
    setSelectedTicket,
    numberOfPeople,
    setNumberOfPeople,
    email,
    setEmail,
    pricingData,
    paymentLoading,
    paymentError,
    setPaymentError,
    fetchPaymentWidget,
    payingType,
    modalText = "Select Your Tickets",
    contentDescription,
}: TicketModalProps) {
    const handleBuyNow = (ticket: PricingItem | VotingPricingItem) => {
        const id = 'pricing_id' in ticket ? ticket.pricing_id : ticket.id;
        setSelectedTicket(id);
        setPaymentError(null);
        fetchPaymentWidget(ticket);
    };

    return (
        showModal ? (
            <div
                className={styles.modalOverlay}
                onClick={() => setShowModal(false)}
            >
                <div
                    className={styles.modalTicket}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* ── Header ── */}
                    <div className={styles.header}>
                        <div>
                            <span className={modalStyles.eyebrow}>Select Your Tickets</span>
                            <h2 className={modalStyles.modalTitle}>{modalText}</h2>
                            {contentDescription && (
                                <p className={modalStyles.contentDescription}>{contentDescription}</p>
                            )}
                        </div>
                        <button
                            onClick={() => setShowModal(false)}
                            className={modalStyles.closeButton}
                            aria-label="Close"
                        >
                            <X />
                        </button>
                    </div>

                    {/* ── Content ── */}
                    <div className={styles.content}>

                        {/* Inputs */}
                        {payingType === EPayingType.EVENT_PAYMENT && (
                            <div className={modalStyles.inputRow}>
                                <div className={modalStyles.formGroup}>
                                    <label className={modalStyles.formLabel}>
                                        Number of People
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={numberOfPeople}
                                        onChange={(e) => setNumberOfPeople(parseInt(e.target.value) || 1)}
                                        className={modalStyles.inputField}
                                        autoComplete="off"
                                    />
                                </div>
                                <div className={modalStyles.formGroup}>
                                    <label className={modalStyles.formLabel}>
                                        Email <span className={modalStyles.optionalLabel}>(Optional)</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="example@email.com"
                                        className={modalStyles.inputField}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Ticket cards */}
                        <div className={modalStyles.ticketGrid}>
                            {pricingData.map((ticket, index) => {
                                const ticketId = 'pricing_id' in ticket ? ticket.pricing_id : ticket.id;
                                const name = 'name' in ticket && ticket.name
                                    ? ticket.name
                                    : typeof ticket.quantity === 'string'
                                        ? ticket.quantity
                                        : 'Ticket';
                                const isSelected = selectedTicket === ticketId;
                                const vip = isVipTier(name);

                                return (
                                    <div
                                        key={index}
                                        className={`${modalStyles.ticketCard} ${isSelected ? modalStyles.cardSelected : ''}`}
                                        onClick={() => handleBuyNow(ticket)}
                                    >
                                        {/* Watermark */}
                                        <span className={modalStyles.watermark} aria-hidden="true">
                                            {name[0]?.toUpperCase()}
                                        </span>

                                        {/* Tier name */}
                                        <div className={`${modalStyles.tierName} ${vip ? modalStyles.tierVip : ''}`}>
                                            {name.toUpperCase()}
                                        </div>

                                        {/* Price */}
                                        <div className={modalStyles.priceBlock}>
                                            <span className={modalStyles.priceAmount}>
                                                {Number(ticket.amount).toLocaleString()}
                                            </span>
                                            <span className={modalStyles.priceCurrency}>
                                                {ticket.currency}
                                            </span>
                                        </div>

                                        {/* Buy button */}
                                        <button
                                            type="button"
                                            className={modalStyles.buyBtn}
                                            disabled={paymentLoading && isSelected}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleBuyNow(ticket);
                                            }}
                                        >
                                            {paymentLoading && isSelected ? 'Loading…' : 'Buy Now'}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Error */}
                        {paymentError && (
                            <div className={modalStyles.errorContainer}>
                                <div className={modalStyles.errorContent}>
                                    <div className={modalStyles.errorIcon}><X /></div>
                                    <div className={modalStyles.errorText}>
                                        <h3 className={modalStyles.errorTitle}>Payment Error</h3>
                                        <p className={modalStyles.errorMessage}>{paymentError}</p>
                                        <button onClick={() => setPaymentError(null)} className={modalStyles.errorDismiss}>
                                            Dismiss
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        ) : null
    );
}
