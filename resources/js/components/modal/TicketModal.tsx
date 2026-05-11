import { X, Check } from "lucide-react";
import styles from "@/pages/event-details/style.module.scss";
import modalStyles from "./TicketModal.module.scss";
import { EPayingType, PricingItem, VotingPricingItem } from "@/types/shared/ICommon";
import Button from "@/components/shared/Button";

type PricingData = PricingItem | VotingPricingItem;

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
    payingType?: EPayingType,
    modalText?: string;
    contentDescription?: string;

}

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
    modalText = "Choose",
    contentDescription = "You are about to start payment process"
}: TicketModalProps) {
    return (
        showModal && (
            <div
                className={styles.modalOverlay}
                onClick={() => setShowModal(false)}
            >
                <div
                    className={styles.modalTicket}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className={styles.header}>
                        <h2 className={modalStyles.modalTitle}>{modalText}</h2>
                        <button
                            onClick={() => setShowModal(false)}
                            className={modalStyles.closeButton}
                        >
                            <X />
                        </button>
                    </div>

                    {/* Content */}
                    <div className={styles.content}>

                        <p className={modalStyles.contentDescription}>{contentDescription}</p>
                        {
                            payingType === EPayingType.EVENT_PAYMENT && (
                                <>
                                    {/* Number of People */}
                                    <div className={modalStyles.formGroup}>
                                        <label className={modalStyles.formLabel}>
                                            Enter number of people
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={numberOfPeople}
                                            onChange={(e) => {
                                                setNumberOfPeople(parseInt(e.target.value));
                                            }}
                                            className={modalStyles.inputField}
                                            autoComplete="off"
                                        />
                                    </div>

                                    {/* Email Address */}
                                    <div className={modalStyles.formGroup}>
                                        <label className={modalStyles.formLabel}>
                                            Ticket Delivery Email Address <span className={modalStyles.optionalLabel}>(Optional)</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }}
                                            placeholder="Ex: example.me@gmail.com"
                                            className={modalStyles.inputField}
                                            autoComplete="off"
                                        />
                                    </div>
                                </>
                            )
                        }

                        {/* Ticket Type Selection */}
                        <div className={modalStyles.ticketSelectionSection}>
                            <label className={modalStyles.ticketSelectionLabel}>
                                Select Ticket Type
                            </label>
                            <div className={modalStyles.ticketGrid}>
                                {pricingData.map((ticket, index) => {
                                    const ticketId = 'pricing_id' in ticket ? ticket.pricing_id : ticket.id;
                                    const ticketQuantity = typeof ticket.quantity === 'string' ? ticket.quantity : `${ticket.quantity} Ticket${ticket.quantity !== 1 ? 's' : ''}`;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setSelectedTicket(ticketId);
                                            }}
                                            className={`${modalStyles.ticketButton} ${selectedTicket === ticketId ? modalStyles.selected : ''}`}
                                        >
                                            {selectedTicket === ticketId && (
                                                <div className={modalStyles.selectedIndicator}>
                                                    <Check />
                                                </div>
                                            )}
                                            <div className={`${modalStyles.ticketContent} ${selectedTicket === ticketId ? modalStyles.selected : modalStyles.default}`}>
                                                <div className={modalStyles.ticketName}>{ticketQuantity}</div>
                                                <div className={modalStyles.ticketPrice}>{ticket.amount} {ticket.currency}</div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Error Display */}
                        {paymentError && (
                            <div className={modalStyles.errorContainer}>
                                <div className={modalStyles.errorContent}>
                                    <div className={modalStyles.errorIcon}>
                                        <X />
                                    </div>
                                    <div className={modalStyles.errorText}>
                                        <h3 className={modalStyles.errorTitle}>Payment Error</h3>
                                        <p className={modalStyles.errorMessage}>{paymentError}</p>
                                        <button
                                            onClick={() => setPaymentError(null)}
                                            className={modalStyles.errorDismiss}
                                        >
                                            Dismiss
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Action Buttons */}
                    <div className={modalStyles.actionButtons}>
                        <Button
                            onClick={() => {
                                // Clear any previous payment error
                                setPaymentError(null);

                                // Find the selected pricing item
                                const selectedPricing = pricingData.find(p => {
                                    const itemId = 'pricing_id' in p ? p.pricing_id : p.id;
                                    return itemId === selectedTicket;
                                });

                                if (selectedPricing) {
                                    fetchPaymentWidget(selectedPricing);
                                } else {
                                }
                            }}
                            disabled={paymentLoading || !selectedTicket}
                            variant="primary"
                            size="md"
                            fullWidth
                        >
                            {paymentLoading ? 'Loading...' : 'Next'}
                        </Button>
                        <Button
                            onClick={() => setShowModal(false)}
                            variant="outline"
                            size="md"
                            fullWidth
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        )
    );
}