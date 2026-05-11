import Button from "@/components/shared/Button";
import styles from "@/pages/event-details/style.module.scss";
import modalStyles from "./PaymentModal.module.scss";
import { PaymentWidget, PricingItem, VotingPricingItem } from "@/types/shared/ICommon";

interface PaymentModalProps {
    showPaymentModal: boolean;
    setShowPaymentModal: (show: boolean) => void;
    paymentWidget: PaymentWidget | null;
    paymentLoading: boolean;
    paymentError: string | null;
    pricingData: PricingItem[] | VotingPricingItem[];
    selectedTicket: number | null;
    fetchPaymentWidget: (selectedPricing: PricingItem | VotingPricingItem) => void | Promise<void>;
}

export default function PaymentModal({
    showPaymentModal,
    setShowPaymentModal,
    paymentWidget,
    paymentLoading,
    paymentError,
    pricingData,
    selectedTicket,
    fetchPaymentWidget,
}: PaymentModalProps) {
    return (
        showPaymentModal && (
            <div
                className={styles.modalOverlay}
                onClick={() => setShowPaymentModal(false)}
            >
                <div
                    className={styles.paymentModal}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Loading state for payment widget */}
                    {paymentLoading && (
                        <div className={styles.paymentLoading}>
                            <div className={modalStyles.loadingSpinner}></div>
                        </div>
                    )}

                    {paymentError && (
                        <div className={modalStyles.errorContainer}>
                            <div className={modalStyles.errorContent}>
                                <div className={modalStyles.errorTitle}>Payment Error</div>
                                <div className={modalStyles.errorMessage}>{paymentError}</div>
                                <Button
                                    onClick={() => {
                                        const selectedPricing = pricingData.find(p => {
                                            const itemId = 'pricing_id' in p ? p.pricing_id : p.id;
                                            return itemId === selectedTicket;
                                        });
                                        if (selectedPricing) {
                                            fetchPaymentWidget(selectedPricing);
                                        }
                                    }}
                                    variant="primary"
                                    size="sm"
                                    className={modalStyles.tryAgainButton}
                                >
                                    Try Again
                                </Button>
                            </div>
                        </div>
                    )}

                    {paymentWidget?.iframeUrl && (
                        /* iframe Content - Dynamic payment widget */
                        <iframe
                            src={paymentWidget.iframeUrl}
                            className={styles.paymentIframe}
                            title="Payment Gateway"
                            allow="payment"
                            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                        />
                    )}
                </div>
            </div>
        )
    );
}