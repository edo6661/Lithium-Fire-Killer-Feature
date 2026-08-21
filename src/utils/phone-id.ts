/**
 * Indonesian mobile phone helpers for YUKK VA / checkout.
 * Expected wire format: digits only, starts with 62, length 11–20 (YUKK max 20).
 */

const YUKK_PHONE_MAX = 20;
/** Total length including country code 62 (e.g. 62812345678). */
const YUKK_PHONE_MIN = 11;

export type PhoneNormalizeResult =
  | { ok: true; phone: string }
  | { ok: false; reason: "empty" | "invalid" };

/** Strip to digits; convert +62 / 62 / 0… / 8… into 62… */
export function normalizeIdPhone(raw: string): string {
  let digits = String(raw ?? "").replace(/\D/g, "");

  if (!digits) return "";

  // Mistype: 62 + leading 0 (e.g. 6208123…) → drop the 0 after 62.
  if (digits.startsWith("620")) {
    digits = `62${digits.slice(3)}`;
  }

  if (digits.startsWith("62")) {
    // already international
  } else if (digits.startsWith("0")) {
    digits = `62${digits.slice(1)}`;
  } else if (digits.startsWith("8")) {
    // common shorthand: 8123… → 628123…
    digits = `62${digits}`;
  }

  return digits.slice(0, YUKK_PHONE_MAX);
}

export function isValidIdPhone(phone: string): boolean {
  return (
    /^62\d+$/.test(phone) &&
    phone.length >= YUKK_PHONE_MIN &&
    phone.length <= YUKK_PHONE_MAX
  );
}

export function normalizeAndValidateIdPhone(raw: string): PhoneNormalizeResult {
  const trimmed = String(raw ?? "").trim();
  if (!trimmed) return { ok: false, reason: "empty" };

  const phone = normalizeIdPhone(trimmed);
  if (!isValidIdPhone(phone)) return { ok: false, reason: "invalid" };
  return { ok: true, phone };
}
