/**
 * Preferred serial digits for Arkiv checkout notes (customerNotes).
 * Rules: digits only, exactly 2 chars when filled, both digits must differ.
 */

export type SerialNotesResult =
  | { ok: true; value?: string }
  | { ok: false; reason: "incomplete" | "twin" };

export function normalizeSerialNotes(raw: string): string {
  return String(raw ?? "").replace(/\D/g, "").slice(0, 2);
}

/** True when both digits are the same (88, 99, …). */
export function isTwinSerialNotes(digits: string): boolean {
  return digits.length === 2 && digits[0] === digits[1];
}

/**
 * Empty → ok (optional).
 * One digit → incomplete.
 * Twin digits → twin.
 * Two different digits → ok with value.
 */
export function validateSerialNotes(raw: string): SerialNotesResult {
  const digits = normalizeSerialNotes(raw);
  if (!digits) return { ok: true, value: undefined };
  if (digits.length < 2) return { ok: false, reason: "incomplete" };
  if (isTwinSerialNotes(digits)) return { ok: false, reason: "twin" };
  return { ok: true, value: digits };
}
