const BASE_URL = process.env.NODE_ENV === 'development' ? "http://127.0.0.1:8000/" : "https://api-watch.wecodefy.com/";
export const WATCH_NODE_BASE_URL = process.env.NODE_ENV === 'development' ? "http://127.0.0.1:3011/" : "https://ws.watch.rw/";
export const WATCH_API_NODE_BASE_URL = WATCH_NODE_BASE_URL + "node/api";
export const ASSETS_BASE_URL = "https://cagura-assets.b-cdn.net/";
export const API_URL = BASE_URL + 'api/v1';

// Always use production for payment/ticket endpoints
// (local Watch API server is not required to be running in dev)
const PROD_API_URL = "https://api-watch.wecodefy.com/api/v1";
const PROD_NODE_URL = "https://ws.watch.rw/node/api";

export const GET_PAST_EVENTS_URL = `${API_URL}/events/get/past`;
export const GET_EVENT_ITEM_URL = `${API_URL}/event/item`;

// Voting
export const GET_VOTING_SESSIONS_URL = `${API_URL}/voting/get/voting/sessions`;
export const GET_PAST_VOTING_SESSIONS_URL = `${API_URL}/voting/get/past/voting/sessions`;
export const GET_VOTING_SESSION_SINGLE_URL = `${API_URL}/voting/get/voting/session`;
export const GET_VOTING_CATEGORY_URL = `${API_URL}/voting/get/voting/category`;

// Pricings
export const GET_VOTING_PRICES_URL = `${API_URL}/voting/get/session/prices`;

// Payment widgets — always prod
export const GET_EVENT_PAYMENT_WIDGET_URL = `${PROD_API_URL}/event/item/pay`;
export const GET_VOTING_PAYMENT_WIDGET_URL = `${PROD_API_URL}/vote/participant/pay`;

// Contestant
export const GET_VOTING_CONTESTANT_URL = `${API_URL}/voting/get/voting/contensant`;

// Tickets — always prod
export const PAYMENT_CHECK_STATUS_URL = `${PROD_API_URL}/payment/check/status`;
export const EVENT_TICKETS_VERIFY_URL = `${PROD_API_URL}/event/tickets/verify`;
export const EVENT_DOWNLOAD_TICKET_URL = `${PROD_NODE_URL}/events/download/invitation/ticket`;
export const GET_TICKET_DETAILS_URL = `${PROD_API_URL}/event/ticket/details`;
