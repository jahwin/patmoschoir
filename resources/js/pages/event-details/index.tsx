import { useEffect, useState } from 'react';
import { Head, usePage } from "@inertiajs/react";
import TicketModal from "@/components/modal/TicketModal";
import PaymentModal from "@/components/modal/PaymentModal";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { PaymentWidget, PricingItem, VotingPricingItem } from '@/types/shared/ICommon';
import { GET_EVENT_PAYMENT_WIDGET_URL } from '@/types/shared/urls';

interface PageProps {
  pricings?: PricingItem[];
}

export default function Home() {
  const { props } = usePage<PageProps>();
  const pricingData: PricingItem[] = props.pricings ?? [];

  // Payment widget state
  const [paymentWidget, setPaymentWidget] = useState<PaymentWidget | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [email, setEmail] = useState('');

  // Event date and time - easily changeable
  const EVENT_DATE_TIME = new Date('2025-10-05T17:00:00'); // October 5th, 2025 at 5:00 PM

  // Function to fetch payment widget
  const fetchPaymentWidget = async (selectedPricing: PricingItem | VotingPricingItem) => {
    setPaymentLoading(true);
    setPaymentError(null);

    try {
      // Type guard to check if it's PricingItem (event payment)
      const isPricingItem = (p: PricingItem | VotingPricingItem): p is PricingItem => {
        return 'pricing_id' in p;
      };

      if (!isPricingItem(selectedPricing)) {
        throw new Error('Invalid pricing item type for event payment');
      }

      const payload = {
        eventId: selectedPricing.event_id,
        selected_price: selectedPricing.pricing_id,
        selected_amount: selectedPricing.amount,
        numberOfPeople: numberOfPeople.toString(),
        emailDelivery: email ? email.split('@')[0] : "guest",
        currency: selectedPricing.currency,
        url: "/event/item/pay",
        amount: selectedPricing.amount * numberOfPeople, // Compute amount based on price and number of people
        first_name: "", // TODO: Replace with actual state variable
        last_name: "", // TODO: Replace with actual state variable
        email: email || "",
        phone_number: "" // TODO: Replace with actual state variable
      };


      const response = await fetch(GET_EVENT_PAYMENT_WIDGET_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        // Try to get the error response body
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.text();

          // Try to parse as JSON first
          try {
            const parsedError = JSON.parse(errorData);
            if (parsedError.message) {
              errorMessage = parsedError.message;
            } else if (parsedError.status && parsedError.status === 'bad') {
              errorMessage = 'Unable to process your request. Please try again.';
            }
          } catch (jsonParseError) {
            // If it's not JSON, use the raw text
            errorMessage = errorData || errorMessage;
          }
        } catch (e) {
        }
        throw new Error(errorMessage);
      }

      const data: PaymentWidget = await response.json();

      if (data.status === 'ok' && data.iframeUrl) {
        setPaymentWidget(data);
        setShowModal(false);
        setShowPaymentModal(true);
      } else {
        throw new Error(data.message || 'Failed to get payment widget');
      }
    } catch (error) {
      setPaymentLoading(false);
      setPaymentError(error instanceof Error ? error.message : 'Failed to get payment widget');
      // Keep the ticket modal open and show the error there instead of payment modal
      setShowPaymentModal(false);
    } finally {

    }
  };




  useEffect(() => {
    window.addEventListener(
      "message",
      (event) => {
        if (event.data && event.data.type === 'PAYMENT_STATUS') {
          const status = event.data.status;
          switch (status) {
            case 'init':
              setPaymentLoading(false);
              break;
            case 'success':
              setPaymentLoading(false);
              break;
            case "failed":
              setPaymentLoading(false);
              setShowPaymentModal(true);
              break;
            case "close":
              setShowModal(true);
              setPaymentLoading(false);
              setShowPaymentModal(false);
              break;
          }
        }
      },
      false
    );
  }, []);


  return (
    <>
      <Head title="Home" />
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Ticket Modal */}
        <TicketModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedTicket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
          numberOfPeople={numberOfPeople}
          setNumberOfPeople={setNumberOfPeople}
          email={email}
          setEmail={setEmail}
          pricingData={pricingData}
          paymentLoading={paymentLoading}
          paymentError={paymentError}
          setPaymentError={setPaymentError}
          fetchPaymentWidget={fetchPaymentWidget}
        />

        {/* Payment Modal */}
        <PaymentModal
          showPaymentModal={showPaymentModal}
          setShowPaymentModal={setShowPaymentModal}
          paymentWidget={paymentWidget}
          paymentLoading={paymentLoading}
          paymentError={paymentError}
          pricingData={pricingData}
          selectedTicket={selectedTicket}
          fetchPaymentWidget={fetchPaymentWidget}
        />

      </div>
    </>
  );
}
