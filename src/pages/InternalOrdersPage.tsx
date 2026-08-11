import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { API_BASE_URL } from "../config/api";
import { formatRupiah } from "../utils/format-currency";

type InvoiceRow = {
  orderId: string;
  status: string;
  grandTotal: number;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  paymentChannelCode: string | null;
  virtualAccountBank: string | null;
  virtualAccountNo: string | null;
  paidAt: string | null;
  createdAt: string;
};

type StockInfo = {
  id: string;
  label: string;
  quantityInitial: number;
  quantityRemaining: number;
  sold: number;
  updatedAt: string;
};

const STORAGE_KEY = "lfk-internal-key";

function statusLabel(status: string): string {
  switch (status) {
    case "PAID":
      return "Lunas";
    case "PENDING":
      return "Menunggu bayar";
    case "UNPAID":
      return "Belum bayar";
    case "EXPIRED":
      return "Kadaluarsa";
    case "FAILED":
      return "Gagal";
    default:
      return status;
  }
}

function formatWhen(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(d);
}

export const InternalOrdersPage = () => {
  const [keyInput, setKeyInput] = useState(() => localStorage.getItem(STORAGE_KEY) ?? "");
  const [key, setKey] = useState(() => localStorage.getItem(STORAGE_KEY) ?? "");
  const [filter, setFilter] = useState<"ALL" | "PAID" | "PENDING">("ALL");
  const [rows, setRows] = useState<InvoiceRow[]>([]);
  const [stock, setStock] = useState<StockInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);

  const fetchRows = useCallback(async (authKey: string, statusFilter: string) => {
    if (!authKey) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ key: authKey, limit: "200" });
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      const res = await fetch(`${API_BASE_URL}/api/internal/invoices?${params}`);
      const body = (await res.json()) as {
        success?: boolean;
        message?: string;
        data?: InvoiceRow[];
        stock?: StockInfo;
      };
      if (!res.ok || !body.success || !body.data) {
        throw new Error(body.message ?? `HTTP ${res.status}`);
      }
      setRows(body.data);
      setStock(body.stock ?? null);
    } catch (err) {
      setRows([]);
      setStock(null);
      setError(err instanceof Error ? err.message : "Gagal memuat data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!key) return;
    void fetchRows(key, filter);
  }, [key, filter, fetchRows]);

  const stats = useMemo(() => {
    const paid = rows.filter((r) => r.status === "PAID").length;
    const pending = rows.filter((r) => r.status === "PENDING").length;
    return { total: rows.length, paid, pending };
  }, [rows]);

  const unlock = (event: FormEvent) => {
    event.preventDefault();
    const next = keyInput.trim();
    localStorage.setItem(STORAGE_KEY, next);
    setKey(next);
  };

  const resetStock = async () => {
    if (!key) return;
    const ok = window.confirm(
      "Reset stok LFK × Arkiv ke 100 unit?\n\nPakai setelah selesai test supaya edisi terbatas kembali penuh.",
    );
    if (!ok) return;

    setResetting(true);
    setError(null);
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/internal/stock/reset?key=${encodeURIComponent(key)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ key, quantity: 100 }),
        },
      );
      const body = (await res.json()) as {
        success?: boolean;
        message?: string;
        stock?: StockInfo;
      };
      if (!res.ok || !body.success || !body.stock) {
        throw new Error(body.message ?? `HTTP ${res.status}`);
      }
      setStock(body.stock);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal reset stok");
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-black tracking-tight">Internal Orders</h1>
        <p className="mt-1 text-sm text-slate-600">
          Daftar invoice LFK × Arkiv (paid & unpaid). Hanya untuk internal.
        </p>

        {!key ? (
          <form onSubmit={unlock} className="mt-8 max-w-md rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Internal key
            </label>
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold outline-none focus:border-slate-400"
              placeholder="INTERNAL_DASHBOARD_KEY"
              required
            />
            <button
              type="submit"
              className="mt-4 w-full rounded-full bg-slate-900 py-2.5 text-sm font-bold text-white"
            >
              Buka
            </button>
          </form>
        ) : (
          <>
            {stock ? (
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Stok edisi terbatas
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-700">{stock.label}</p>
                  <p className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                    {stock.quantityRemaining}
                    <span className="text-lg font-bold text-slate-400">
                      {" "}
                      / {stock.quantityInitial}
                    </span>
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Terjual (stok): {stock.sold} · Update: {formatWhen(stock.updatedAt)}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={resetting}
                  onClick={() => void resetStock()}
                  className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60"
                >
                  {resetting ? "Resetting…" : "Reset stok ke 100"}
                </button>
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex gap-2 rounded-full bg-white p-1 text-sm font-bold ring-1 ring-slate-200">
                {(["ALL", "PAID", "PENDING"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`rounded-full px-4 py-1.5 ${
                      filter === f ? "bg-slate-900 text-white" : "text-slate-600"
                    }`}
                  >
                    {f === "ALL" ? "Semua" : f === "PAID" ? "Lunas" : "Pending"}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => void fetchRows(key, filter)}
                className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-bold"
              >
                Refresh
              </button>
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem(STORAGE_KEY);
                  setKey("");
                  setKeyInput("");
                  setRows([]);
                  setStock(null);
                }}
                className="rounded-full px-4 py-1.5 text-sm font-bold text-slate-500"
              >
                Logout
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
              <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                Total: {stats.total}
              </span>
              <span className="rounded-full bg-green-50 px-3 py-1 text-green-800 ring-1 ring-green-200">
                Lunas: {stats.paid}
              </span>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-900 ring-1 ring-amber-200">
                Pending: {stats.pending}
              </span>
            </div>

            {error ? (
              <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </p>
            ) : null}

            <div className="mt-4 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-100 bg-slate-50 text-xs font-black uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Waktu</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Channel</th>
                    <th className="px-4 py-3">Nominal</th>
                    <th className="px-4 py-3">Order</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                        Memuat…
                      </td>
                    </tr>
                  ) : rows.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                        Belum ada data
                      </td>
                    </tr>
                  ) : (
                    rows.map((row) => (
                      <tr key={row.orderId} className="border-b border-slate-50 align-top">
                        <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-500">
                          {formatWhen(row.createdAt)}
                          {row.paidAt ? (
                            <div className="mt-1 text-green-700">Bayar: {formatWhen(row.paidAt)}</div>
                          ) : null}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                              row.status === "PAID"
                                ? "bg-green-100 text-green-800"
                                : row.status === "PENDING"
                                  ? "bg-amber-100 text-amber-900"
                                  : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {statusLabel(row.status)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-bold">{row.customerName ?? "—"}</div>
                          <div className="text-xs text-slate-500">{row.customerEmail ?? "—"}</div>
                          <div className="text-xs text-slate-500">{row.customerPhone ?? "—"}</div>
                        </td>
                        <td className="px-4 py-3 text-xs font-semibold">
                          {row.paymentChannelCode ?? "—"}
                          {row.virtualAccountBank ? (
                            <div className="text-slate-500">{row.virtualAccountBank}</div>
                          ) : null}
                          {row.virtualAccountNo ? (
                            <div className="font-mono text-slate-500">{row.virtualAccountNo}</div>
                          ) : null}
                        </td>
                        <td className="px-4 py-3 font-bold whitespace-nowrap">
                          {formatRupiah(row.grandTotal)}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-slate-600">
                          {row.orderId}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
