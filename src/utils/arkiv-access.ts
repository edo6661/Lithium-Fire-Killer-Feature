import { API_BASE_URL } from "../config/api";

/** Shared dengan halaman /internal — satu unlock untuk preview + dashboard. */
export const ARKIV_ACCESS_KEY_STORAGE = "lfk-internal-key";

export function readArkivAccessKey(): string {
  try {
    return (localStorage.getItem(ARKIV_ACCESS_KEY_STORAGE) ?? "").trim();
  } catch {
    return "";
  }
}

export function writeArkivAccessKey(key: string): void {
  try {
    localStorage.setItem(ARKIV_ACCESS_KEY_STORAGE, key.trim());
  } catch {
    /* ignore */
  }
}

export function clearArkivAccessKey(): void {
  try {
    localStorage.removeItem(ARKIV_ACCESS_KEY_STORAGE);
  } catch {
    /* ignore */
  }
}

export async function verifyArkivAccessKey(key: string): Promise<void> {
  const trimmed = key.trim();
  if (!trimmed) {
    throw new Error("Key wajib diisi.");
  }

  const params = new URLSearchParams({ key: trimmed });
  const res = await fetch(`${API_BASE_URL}/api/internal/verify?${params}`, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(10_000),
  });

  let body: { success?: boolean; message?: string } = {};
  try {
    body = (await res.json()) as { success?: boolean; message?: string };
  } catch {
    throw new Error("Respons server tidak valid. Pastikan backend berjalan.");
  }

  if (!res.ok || !body.success) {
    throw new Error(body.message ?? `HTTP ${res.status}`);
  }
}
