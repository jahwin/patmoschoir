export interface IEvent {
  id: number;
  userId: 109,
  channelId: number;
  title: string,
  slug: string,
  description: string,
  bookingLink: null | string,
  customUssd: null | string,
  logoImage: string,
  coverImage: string,
  startTime: string,
  endTime: string,
  status: string,
  allowSellTicket: number,
  created_at: string,
  updated_at: string,
  deleted_at: string | null,
  showOnOriginalWebsite: number,
  organizers: string,
  category: string,
  location: string,
  venue: string,
  coordinates: string | null,
  seasonEnabled: string | null,
  seasonCount: number,
  has_subevents: string | null
}

export interface IEventDetails extends IEvent {
  packages: {
    currency: string;
    amount: number;
    seatType: string;
  }[];
}