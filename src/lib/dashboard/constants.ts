export interface SummaryData {
  loginsToday: number;
  bookingsToday: number;
  callsReceived: number;
  callsUnanswered: number;
  whatsappReceived: number;
  whatsappUnread: number;
  blockedToday: number;
  budgetSaved: number;
}

export const MOCK_SUMMARY: SummaryData = {
  loginsToday: 24,
  bookingsToday: 8,
  callsReceived: 8,
  callsUnanswered: 3,
  whatsappReceived: 14,
  whatsappUnread: 5,
  blockedToday: 3,
  budgetSaved: 4200,
};

export interface CallListEntry {
  id: number;
  name: string;
  mobile: string;
  time: string;
  visits: number;
  called: boolean;
}

export const MOCK_CALL_LIST: CallListEntry[] = [
  { id: 1, name: "Rahul S.", mobile: "9812345601", time: "9:15 AM", visits: 3, called: false },
  { id: 2, name: "Priya M.", mobile: "8712345602", time: "11:30 AM", visits: 1, called: false },
  { id: 3, name: "Amit K.", mobile: "9912345603", time: "2:45 PM", visits: 2, called: true },
  { id: 4, name: "Sneha R.", mobile: "7612345604", time: "4:10 PM", visits: 1, called: false },
];

export interface DailyStat {
  day: string;
  logins: number;
  bookings: number;
  blocked: number;
}

export const MOCK_DAILY_STATS: DailyStat[] = [
  { day: "Mon", logins: 18, bookings: 6, blocked: 2 },
  { day: "Tue", logins: 22, bookings: 8, blocked: 4 },
  { day: "Wed", logins: 15, bookings: 5, blocked: 1 },
  { day: "Thu", logins: 31, bookings: 11, blocked: 6 },
  { day: "Fri", logins: 28, bookings: 9, blocked: 3 },
  { day: "Sat", logins: 35, bookings: 14, blocked: 2 },
  { day: "Sun", logins: 24, bookings: 8, blocked: 3 },
];

export const MOCK_LOGIN_TYPE_SPLIT = {
  mobile: 68,
  gmail: 32,
};

export interface RevenuePoint {
  week: string;
  revenue: number;
}

export const MOCK_REVENUE: RevenuePoint[] = [
  { week: "Week 1", revenue: 12000 },
  { week: "Week 2", revenue: 18000 },
  { week: "Week 3", revenue: 24000 },
  { week: "Week 4", revenue: 31000 },
];

export interface BlockedEntry {
  id: number;
  ip: string;
  account: string;
  reason: "Multi-account" | "Suspicious IP" | "Rate limit" | "VPN detected";
  time: string;
}

export const MOCK_BLOCKED: BlockedEntry[] = [
  { id: 1, ip: "192.168.1.42", account: "abc@gmail.com", reason: "Multi-account", time: "2:30 PM" },
  { id: 2, ip: "203.112.4.19", account: "9812345699", reason: "Suspicious IP", time: "4:15 PM" },
  { id: 3, ip: "45.88.201.7", account: "xyz@gmail.com", reason: "Rate limit", time: "6:45 PM" },
];

export const MOCK_BLOCKED_THIS_MONTH = 47;

export interface MailOutreachData {
  today: { total: number; welcome: number; reengage: number };
  week: number;
  month: number;
  daily: { day: string; count: number }[];
}

export const MOCK_MAIL_OUTREACH: MailOutreachData = {
  today: { total: 24, welcome: 18, reengage: 6 },
  week: 142,
  month: 489,
  daily: [
    { day: "Mon", count: 18 },
    { day: "Tue", count: 9 },
    { day: "Wed", count: 28 },
    { day: "Thu", count: 20 },
    { day: "Fri", count: 14 },
    { day: "Sat", count: 5 },
    { day: "Sun", count: 12 },
  ],
};

export interface MailRecipient {
  id: number;
  customer: string;
  email: string;
  time: string;
  mailType: "Welcome" | "Re-engage";
  visits: number;
}

export const MOCK_MAIL_RECIPIENTS: MailRecipient[] = [
  { id: 1, customer: "Rahul S.", email: "rahul.s@gmail.com", time: "9:20 AM", mailType: "Welcome", visits: 3 },
  { id: 2, customer: "Priya M.", email: "priya.m@gmail.com", time: "11:35 AM", mailType: "Welcome", visits: 1 },
  { id: 3, customer: "Amit K.", email: "amit.k@gmail.com", time: "1:10 PM", mailType: "Re-engage", visits: 4 },
  { id: 4, customer: "Sneha R.", email: "sneha.r@gmail.com", time: "3:45 PM", mailType: "Welcome", visits: 1 },
  { id: 5, customer: "Vijay P.", email: "vijay.p@gmail.com", time: "5:05 PM", mailType: "Re-engage", visits: 2 },
];

export interface IncomingCall {
  id: number;
  name: string;
  number: string;
  time: string;
  status: "pending" | "done";
  hasWhatsApp: boolean;
}

export interface IncomingWhatsApp {
  id: number;
  name: string;
  number: string;
  time: string;
  status: "pending" | "done";
  hasCall: boolean;
}

export const MOCK_INCOMING = {
  calls: [
    { id: 1, name: "Rahul S.", number: "9812345601", time: "9:15 AM", status: "pending", hasWhatsApp: true },
    { id: 2, name: "Priya M.", number: "8712345602", time: "11:30 AM", status: "done", hasWhatsApp: false },
    { id: 3, name: "Sneha R.", number: "7612345604", time: "4:10 PM", status: "pending", hasWhatsApp: false },
  ] as IncomingCall[],
  whatsapp: [
    { id: 1, name: "Amit K.", number: "9912345603", time: "2:45 PM", status: "pending", hasCall: false },
    { id: 2, name: "Rahul S.", number: "9812345601", time: "3:00 PM", status: "pending", hasCall: true },
  ] as IncomingWhatsApp[],
};

export const HEATMAP_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const HEATMAP_SLOTS = ["6 AM", "12 PM", "6 PM", "10 PM"];

// [slot][day] login counts — deterministic mock, evenings/weekends busier
export const MOCK_HEATMAP: number[][] = [
  [4, 6, 3, 5, 7, 12, 9],
  [10, 12, 8, 14, 16, 22, 18],
  [18, 22, 15, 28, 25, 35, 30],
  [12, 15, 9, 20, 24, 40, 28],
];

export interface FunnelStage {
  label: string;
  percent: number;
  count: number;
}

export const MOCK_FUNNEL: FunnelStage[] = [
  { label: "Visitors", percent: 100, count: 620 },
  { label: "Logins", percent: 65, count: 403 },
  { label: "Enquiries", percent: 45, count: 279 },
  { label: "Bookings", percent: 28, count: 174 },
];

export interface DashboardRoutePopularity {
  route: string;
  percent: number;
  trending?: boolean;
}

export const MOCK_ROUTE_POPULARITY: DashboardRoutePopularity[] = [
  { route: "Pune → Shirdi", percent: 85, trending: true },
  { route: "Pune → Mumbai", percent: 72 },
  { route: "Pune → Nashik", percent: 58 },
  { route: "Pune → Mahabaleshwar", percent: 45 },
  { route: "Mumbai → Shirdi", percent: 38 },
];

export const MOCK_NOTIFICATIONS = [
  { id: 1, text: "Rahul S. ne abhi login kiya — Call karo! 📞", time: "2 min ago" },
  { id: 2, text: "3 suspicious IPs blocked today 🛡️", time: "1 hour ago" },
  { id: 3, text: "New WhatsApp message received 💬", time: "3 hours ago" },
];

export const MOCK_WEATHER = {
  location: "Pune, Maharashtra",
  tempC: 28,
  condition: "Partly Cloudy",
  emoji: "🌤️",
  humidity: 72,
  windKmh: 12,
  travelNote: "Good day for travel! ✅",
};

export const DATE_FILTERS = [
  "Today",
  "Yesterday",
  "Last 7 Days",
  "Last 30 Days",
  "Last 60 Days",
  "Last 90 Days",
  "This Month",
  "Last Month",
  "This Year",
] as const;

export const TIME_FILTERS = ["Morning 6-12", "Afternoon 12-6", "Evening 6-10", "Night 10-6"] as const;
export const DATA_TYPE_FILTERS = ["All", "Bookings", "Logins", "Blocked"] as const;
export const LOGIN_TYPE_FILTERS = ["Both", "Mobile Only", "Gmail Only"] as const;

export const VEHICLE_TYPES = [
  "Swift Dzire",
  "Ertiga",
  "Innova Crysta",
  "Kia Carens",
  "Force Urbania",
  "Mini Bus",
  "Full Bus",
];
