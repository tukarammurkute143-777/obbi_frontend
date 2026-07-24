const OWNER_KEY = "obbi_owner";
const CALL_STATUS_KEY = "obbi_dashboard_call_status";
const INCOMING_STATUS_KEY = "obbi_dashboard_incoming_status";
const NOTES_KEY = "obbi_dashboard_notes";
const REMINDERS_KEY = "obbi_dashboard_reminders";
const UNBLOCKED_KEY = "obbi_dashboard_unblocked";
const BOOKINGS_KEY = "obbi_dashboard_bookings";

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

// ── Owner gate ──

export function isOwner(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(OWNER_KEY) === "true";
}

export function grantOwnerAccess(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(OWNER_KEY, "true");
}

export function revokeOwnerAccess(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(OWNER_KEY);
}

// ── Call list status overrides (id -> called) ──

export function getCallStatusOverrides(): Record<number, boolean> {
  return readJSON<Record<number, boolean>>(CALL_STATUS_KEY, {});
}

export function setCallStatus(id: number, called: boolean): void {
  const overrides = getCallStatusOverrides();
  overrides[id] = called;
  writeJSON(CALL_STATUS_KEY, overrides);
}

// ── Incoming contacts status overrides (namespaced by type + id) ──

export function getIncomingStatusOverrides(): Record<string, "pending" | "done"> {
  return readJSON<Record<string, "pending" | "done">>(INCOMING_STATUS_KEY, {});
}

export function setIncomingStatus(
  type: "calls" | "whatsapp",
  id: number,
  status: "pending" | "done"
): void {
  const overrides = getIncomingStatusOverrides();
  overrides[`${type}-${id}`] = status;
  writeJSON(INCOMING_STATUS_KEY, overrides);
}

// ── Quick notes ──

export interface QuickNote {
  id: string;
  text: string;
  timestamp: string;
}

export function getNotes(): QuickNote[] {
  return readJSON<QuickNote[]>(NOTES_KEY, []);
}

export function addNote(text: string): QuickNote[] {
  const notes = [
    { id: `${Date.now()}`, text, timestamp: new Date().toISOString() },
    ...getNotes(),
  ];
  writeJSON(NOTES_KEY, notes);
  return notes;
}

// ── Follow-up reminders ──

export interface Reminder {
  id: string;
  customer: string;
  date: string;
  note: string;
}

export function getReminders(): Reminder[] {
  return readJSON<Reminder[]>(REMINDERS_KEY, []);
}

export function addReminder(reminder: Omit<Reminder, "id">): Reminder[] {
  const reminders = [...getReminders(), { id: `${Date.now()}`, ...reminder }];
  writeJSON(REMINDERS_KEY, reminders);
  return reminders;
}

export function removeReminder(id: string): Reminder[] {
  const reminders = getReminders().filter((r) => r.id !== id);
  writeJSON(REMINDERS_KEY, reminders);
  return reminders;
}

// ── Blocked users — unblock overrides ──

export function getUnblockedIds(): number[] {
  return readJSON<number[]>(UNBLOCKED_KEY, []);
}

export function unblockUser(id: number): number[] {
  const ids = Array.from(new Set([...getUnblockedIds(), id]));
  writeJSON(UNBLOCKED_KEY, ids);
  return ids;
}

// ── Bookings ──

export interface DashboardBooking {
  id: string;
  customerName: string;
  customerMobile: string;
  customerEmail: string;
  from: string;
  to: string;
  pickupDate: string;
  dropDate: string;
  totalDays: number;
  vehicleType: string;
  driver: string;
  totalRate: number;
  advancePaid: number;
  remaining: number;
  extraCharges: boolean;
  allInclusive: boolean;
  paymentMode: "Cash" | "Online" | "Pending";
  vehicleSource: "My Vehicle" | "Partner Vehicle";
  partnerName?: string;
  partnerMobile?: string;
  partnerCommission?: number;
  partnerPayout?: number;
  notes: string;
  createdAt: string;
}

export function getBookings(): DashboardBooking[] {
  return readJSON<DashboardBooking[]>(BOOKINGS_KEY, []);
}

export function addBooking(booking: Omit<DashboardBooking, "id" | "createdAt">): DashboardBooking[] {
  const bookings = [
    { id: `${Date.now()}`, createdAt: new Date().toISOString(), ...booking },
    ...getBookings(),
  ];
  writeJSON(BOOKINGS_KEY, bookings);
  return bookings;
}
