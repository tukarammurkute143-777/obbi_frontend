// Mock report data — a real backend aggregation replaces this once bookings,
// expenses, and drivers are tracked server-side.

export interface ClosedBooking {
  id: number;
  customer: string;
  mobile: string;
  route: string;
  cab: string;
  date: string;
  amount: number;
}

export interface PendingLead {
  id: number;
  customer: string;
  mobile: string;
  lastContact: string;
  status: string;
}

export interface ExpenseRow {
  customer: string;
  vehicle: string;
  route: string;
  date: string;
  fuel: number;
  toll: number;
  driver: number;
  maintenance: number;
}

export interface DriverRow {
  name: string;
  trips: number;
  routes: string;
  cab: string;
}

export interface RouteRow {
  route: string;
  bookings: number;
  revenue: number;
}

export interface CabRow {
  cab: string;
  bookings: number;
  badge: string;
}

export interface PartnerRow {
  partner: string;
  vehicle: string;
  route: string;
  total: number;
  commission: number;
  payout: number;
}

export interface CancellationRow {
  customer: string;
  route: string;
  reason: string;
  date: string;
  amount: number;
}

export const MOCK_REPORT = {
  period: "Last 7 Days",
  generated: "25 July 2026",

  pl: {
    myVehicleRevenue: 48000,
    partnerCommission: 1300,
    totalIncome: 49300,
    adRecharge: 5000,
    fuel: 8000,
    toll: 2500,
    driver: 6000,
    maintenance: 1500,
    partnerPayouts: 6700,
    totalExpenses: 29700,
    netProfit: 19600,
    growthPercent: 38,
  },

  overview: {
    leadsReceived: 10,
    leadsClosed: 8,
    leadsPending: 2,
    conversionRate: 80,
  },

  closedBookings: [
    { id: 1, customer: "Rahul S.", mobile: "98XXXXXXXX", route: "Pune → Shirdi", cab: "Innova Crysta", date: "28 Jun", amount: 3000 },
    { id: 2, customer: "Priya M.", mobile: "87XXXXXXXX", route: "Pune → Mumbai", cab: "Ertiga", date: "29 Jun", amount: 1800 },
    { id: 3, customer: "Amit K.", mobile: "99XXXXXXXX", route: "Pune → Nashik", cab: "Ertiga", date: "30 Jun", amount: 2200 },
    { id: 4, customer: "Sneha R.", mobile: "76XXXXXXXX", route: "Mumbai → Shirdi", cab: "Innova Crysta", date: "01 Jul", amount: 4500 },
    { id: 5, customer: "Vijay P.", mobile: "91XXXXXXXX", route: "Pune → Mahabaleshwar", cab: "Innova Crysta", date: "02 Jul", amount: 2800 },
  ] as ClosedBooking[],

  pendingLeads: [
    { id: 1, customer: "Deepak M.", mobile: "88XXXXXXXX", lastContact: "01 July", status: "Call pending" },
    { id: 2, customer: "Kavita S.", mobile: "77XXXXXXXX", lastContact: "30 June", status: "WhatsApp sent" },
  ] as PendingLead[],

  expenses: [
    { customer: "Rahul S.", vehicle: "Innova Crysta", route: "Pune→Shirdi", date: "28 Jun", fuel: 1200, toll: 400, driver: 800, maintenance: 0 },
    { customer: "Priya M.", vehicle: "Ertiga", route: "Pune→Mumbai", date: "29 Jun", fuel: 800, toll: 250, driver: 600, maintenance: 0 },
  ] as ExpenseRow[],

  drivers: [
    { name: "Suresh K.", trips: 3, routes: "Pune→Shirdi", cab: "Innova Crysta" },
    { name: "Ramesh P.", trips: 2, routes: "Pune→Mumbai", cab: "Ertiga" },
    { name: "Vijay S.", trips: 3, routes: "Pune→Nashik", cab: "Urbania" },
  ] as DriverRow[],

  routes: [
    { route: "Pune → Shirdi", bookings: 4, revenue: 24000 },
    { route: "Pune → Mumbai", bookings: 2, revenue: 8000 },
    { route: "Pune → Nashik", bookings: 2, revenue: 16000 },
  ] as RouteRow[],

  cabs: [
    { cab: "Innova Crysta", bookings: 3, badge: "👑 Most Used" },
    { cab: "Ertiga", bookings: 2, badge: "" },
    { cab: "Urbania", bookings: 2, badge: "" },
    { cab: "Dzire", bookings: 1, badge: "" },
  ] as CabRow[],

  ratings: {
    average: 4.8,
    fiveStar: 6,
    fourStar: 2,
    threeStar: 0,
    verifiedTrips: 8,
  },

  communication: {
    callsMade: 12,
    whatsappSent: 8,
    mailsSent: 24,
    responseRate: 75,
  },

  paymentMode: {
    cash: 5,
    online: 3,
    pending: 2,
  },

  bestCustomer: {
    name: "Rahul S.",
    mobile: "98XXXXXXXX",
    route: "Pune → Shirdi",
    cab: "Innova Crysta",
    bookingCount: 3,
  },

  busiestDay: {
    day: "Friday",
    bookings: 3,
    peakTime: "7-9 PM",
  },

  partners: [
    { partner: "Raju B.", vehicle: "Dzire", route: "Pune→Mumbai", total: 3000, commission: 500, payout: 2500 },
    { partner: "Suresh K.", vehicle: "Innova", route: "Pune→Shirdi", total: 5000, commission: 800, payout: 4200 },
  ] as PartnerRow[],

  gst: {
    totalRevenue: 48000,
    gstRate: 5,
    gstAmount: 2400,
    netRevenue: 45600,
  },

  cancellations: [
    { customer: "Rahul S.", route: "Pune→Shirdi", reason: "Weather", date: "28 Jun", amount: 4000 },
    { customer: "Priya M.", route: "Pune→Mumbai", reason: "Personal", date: "30 Jun", amount: 4000 },
  ] as CancellationRow[],
};

export type ReportData = typeof MOCK_REPORT;

export const REPORT_PERIODS = [
  "Today",
  "Last 7 Days",
  "Last 30 Days",
  "This Month",
  "Last Month",
  "This Year",
] as const;

export type ReportPeriod = (typeof REPORT_PERIODS)[number] | "Custom";

export type ReportFormat = "PDF" | "PNG";

export interface ReportSectionToggles {
  bookings: boolean;
  pending: boolean;
  expenses: boolean;
  drivers: boolean;
  routes: boolean;
  cabs: boolean;
  ratings: boolean;
  communication: boolean;
  payment: boolean;
  bestCustomer: boolean;
  busiestDay: boolean;
  partners: boolean;
  gst: boolean;
  cancellations: boolean;
}

export const DEFAULT_SECTION_TOGGLES: ReportSectionToggles = {
  bookings: true,
  pending: true,
  expenses: true,
  drivers: true,
  routes: true,
  cabs: true,
  ratings: true,
  communication: true,
  payment: true,
  bestCustomer: true,
  busiestDay: true,
  partners: true,
  gst: true,
  cancellations: true,
};

export const SECTION_LABELS: { key: keyof ReportSectionToggles; label: string }[] = [
  { key: "bookings", label: "Closed Bookings" },
  { key: "pending", label: "Pending Leads" },
  { key: "expenses", label: "Expense Tracking" },
  { key: "drivers", label: "Driver Details" },
  { key: "routes", label: "Route Breakdown" },
  { key: "cabs", label: "Cab Breakdown" },
  { key: "ratings", label: "Rating Summary" },
  { key: "communication", label: "Communication Summary" },
  { key: "payment", label: "Payment Mode" },
  { key: "bestCustomer", label: "Best Customer" },
  { key: "busiestDay", label: "Busiest Day" },
  { key: "partners", label: "Partner/Vendor" },
  { key: "gst", label: "GST Summary" },
  { key: "cancellations", label: "Cancellation Report" },
];
