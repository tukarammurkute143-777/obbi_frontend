export interface AuthUser {
  name: string;
  mobile?: string;
  email?: string;
  loginType: "mobile" | "google";
  role?: "customer" | "owner";
  location?: string;
  loginTime: string;
}

export interface SendOTPResponse {
  success: boolean;
  message: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: AuthUser;
  isNewUser?: boolean;
}

export interface GoogleLoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: AuthUser;
  isNewUser?: boolean;
}

export const ERROR_MESSAGES = {
  invalidMobile: "Valid Indian mobile number daalo (10 digits)",
  otpSendFailed: "OTP bhejne mein problem hui. Dobara try karo.",
  wrongOTP: "OTP galat hai. Dobara check karo.",
  expiredOTP: "OTP expire ho gaya. Resend karo.",
  tooManyRequests: "Bahut zyada requests. Thodi der baad try karo.",
  googleFailed: "Google login mein problem hui. Dobara try karo.",
  ipBlocked: "Aapka access temporarily block hai. Contact karo.",
} as const;

const MOBILE_REGEX = /^[6-9]\d{9}$/;

export function validateMobile(mobile: string): boolean {
  return MOBILE_REGEX.test(mobile);
}

// ── Rate limiting (frontend hint — backend must enforce the real limit) ──

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_KEY_PREFIX = "obbi_otp_requests_";

interface RateLimitStatus {
  allowed: boolean;
  retryAfterSeconds: number;
}

function readTimestamps(key: string): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

export function checkRateLimit(mobile: string): RateLimitStatus {
  const key = `${RATE_LIMIT_KEY_PREFIX}${mobile}`;
  const now = Date.now();
  const recent = readTimestamps(key).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );

  if (recent.length < RATE_LIMIT_MAX) {
    return { allowed: true, retryAfterSeconds: 0 };
  }

  const oldest = Math.min(...recent);
  const retryAfterSeconds = Math.ceil(
    (RATE_LIMIT_WINDOW_MS - (now - oldest)) / 1000
  );
  return { allowed: false, retryAfterSeconds };
}

export function recordOtpRequest(mobile: string): void {
  if (typeof window === "undefined") return;
  const key = `${RATE_LIMIT_KEY_PREFIX}${mobile}`;
  const now = Date.now();
  const recent = readTimestamps(key).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  window.localStorage.setItem(key, JSON.stringify(recent));
}

// ── IP capture + multi-account detection (frontend hint only) ──

const LOGIN_ATTEMPTS_KEY = "obbi_login_attempts";
const FLAGGED_IPS_KEY = "obbi_flagged_ips";

interface LoginAttempt {
  ip: string;
  identifier: string;
  timestamp: number;
  success: boolean;
}

export async function getClientIP(): Promise<string> {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    if (!res.ok) return "unknown";
    const data = (await res.json()) as { ip?: string };
    return data.ip ?? "unknown";
  } catch {
    return "unknown";
  }
}

function readAttempts(): LoginAttempt[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOGIN_ATTEMPTS_KEY);
    return raw ? (JSON.parse(raw) as LoginAttempt[]) : [];
  } catch {
    return [];
  }
}

export function recordLoginAttempt(
  ip: string,
  identifier: string,
  success: boolean
): { flagged: boolean } {
  if (typeof window === "undefined") return { flagged: false };

  const attempts = readAttempts();
  attempts.push({ ip, identifier, timestamp: Date.now(), success });
  window.localStorage.setItem(LOGIN_ATTEMPTS_KEY, JSON.stringify(attempts));

  const distinctIdentifiers = new Set(
    attempts.filter((a) => a.ip === ip).map((a) => a.identifier)
  );
  const flagged = ip !== "unknown" && distinctIdentifiers.size >= 2;

  if (flagged) {
    const flaggedIps = readTimestamps(FLAGGED_IPS_KEY);
    if (!flaggedIps.length) {
      window.localStorage.setItem(FLAGGED_IPS_KEY, JSON.stringify([ip]));
    }
  }

  return { flagged };
}

// ── Session storage ──

const SESSION_KEY = "obbi_session";

export function setSession(user: AuthUser): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getSession(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}

// ── Known-users mock (used only to decide new vs. returning in the demo) ──

const KNOWN_USERS_KEY = "obbi_known_users";

function isKnownIdentifier(identifier: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(KNOWN_USERS_KEY);
    const known = raw ? (JSON.parse(raw) as string[]) : [];
    if (known.includes(identifier)) return true;
    window.localStorage.setItem(
      KNOWN_USERS_KEY,
      JSON.stringify([...known, identifier])
    );
    return false;
  } catch {
    return false;
  }
}

// ── Last trip (mock — real data will come from the bookings API) ──

const LAST_TRIP_KEY = "obbi_last_trip";

export function getLastTrip(): { route: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LAST_TRIP_KEY);
    return raw ? (JSON.parse(raw) as { route: string }) : null;
  } catch {
    return null;
  }
}

// ── Mock API calls (real backend to follow) ──

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendOTP(mobile: string): Promise<SendOTPResponse> {
  await delay(900);
  return {
    success: true,
    message: `OTP sent on WhatsApp to +91 ${mobile}`,
  };
}

export async function verifyOTP(
  mobile: string,
  otp: string
): Promise<VerifyOTPResponse> {
  await delay(900);

  if (otp.length !== 6) {
    return { success: false, message: ERROR_MESSAGES.wrongOTP };
  }

  const isNewUser = !isKnownIdentifier(mobile);

  return {
    success: true,
    token: "mock-token",
    user: {
      name: "Rahul",
      mobile,
      loginType: "mobile",
      role: "customer",
      loginTime: new Date().toISOString(),
    },
    isNewUser,
  };
}

export async function googleLogin(): Promise<GoogleLoginResponse> {
  await delay(1100);

  const email = "traveller@gmail.com";
  const isNewUser = !isKnownIdentifier(email);

  return {
    success: true,
    token: "mock-token",
    user: {
      name: "Priya",
      email,
      loginType: "google",
      role: "customer",
      loginTime: new Date().toISOString(),
    },
    isNewUser,
  };
}

// ── Redirect logic ──

export function determineRedirectPath(
  user: AuthUser,
  isNewUser: boolean
): string {
  if (user.role === "owner") return "/dashboard";
  return isNewUser ? "/welcome" : "/welcome-back";
}
