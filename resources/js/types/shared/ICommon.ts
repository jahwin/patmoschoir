export interface PricingItem {
  event_id: number;
  pricing_id: number;
  name: string;
  amount: number;
  quantity?: number;
  currency: string;
}

export interface VotingPricingItem {
  id: number,
  amount: number,
  currency: string,
  quantity: string,
  item_index: string
}

export enum EPayingType {
  EVENT_PAYMENT = "EVENT_PAYMENT",
  VOTE_PAYMENT = "VOTE_PAYMENT"
}

export interface PaymentWidget {
  status: string,
  message: string,
  iframeUrl: string,
  requestToken: string
}

export interface IPayVoteReqDto {
  participant_id: number;
  selected_price: number | null;
  selected_amount: number;
  currency: string;
  ip: string;
  url: string;
  amount: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone_number: string | null;
}