const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface ApiResult {
  success: boolean;
  message?: string;
  [key: string]: unknown;
}

// FastAPI reports failures as HTTP 4xx with `{ detail }` — a string for
// raised HTTPExceptions, an array of field errors for validation failures.
// Neither carries a `success` flag, so every response is normalised here and
// callers only ever branch on `success`.
function extractDetail(body: unknown): string | undefined {
  if (typeof body !== "object" || body === null) return undefined;
  const detail = (body as { detail?: unknown }).detail;

  if (typeof detail === "string") return detail;

  if (Array.isArray(detail)) {
    const first = detail[0] as { msg?: unknown } | undefined;
    if (first && typeof first.msg === "string") return first.msg;
  }

  return undefined;
}

async function post(path: string, payload: unknown): Promise<ApiResult> {
  let res: Response;

  try {
    res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Offline, DNS failure, CORS rejection — fetch rejects rather than resolving.
    return { success: false, message: "Server se connect nahi ho paya. Internet check karo." };
  }

  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  if (!res.ok) {
    return {
      success: false,
      message: extractDetail(body) ?? `Request failed (${res.status})`,
    };
  }

  const parsed = (body ?? {}) as Record<string, unknown>;

  return {
    // A 2xx without an explicit flag still counts as success.
    success: parsed.success === undefined ? true : parsed.success === true,
    ...parsed,
  };
}

export const api = {
  sendOTP: (mobile: string): Promise<ApiResult> => post("/api/auth/send-otp", { mobile }),

  verifyOTP: (mobile: string, otp: string): Promise<ApiResult> =>
    post("/api/auth/verify-otp", { mobile, otp }),

  // NOTE: /api/auth/google is not implemented on the backend yet — it currently
  // returns 404, so the Google button still uses the mock path in loginUtils.
  // Wire it up once the endpoint ships.
  googleLogin: (token: string): Promise<ApiResult> => post("/api/auth/google", { token }),
};

export { API_URL };
