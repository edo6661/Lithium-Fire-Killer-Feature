import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  FlaskConical,
  KeyRound,
  LogOut,
  Package,
  RefreshCw,
  RotateCcw,
  Search,
  Shield,
  Wallet,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { API_BASE_URL } from "../config/api";
import { formatRupiah } from "../utils/format-currency";
import { ARKIV_ACCESS_KEY_STORAGE } from "../utils/arkiv-access";

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
  expiresAt: string | null;
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

type StatusFilter = "ALL" | "PAID" | "PENDING" | "EXPIRED" | "FAILED";

const STORAGE_KEY = ARKIV_ACCESS_KEY_STORAGE;
const DEV_TOOLS_KEY = "lfk-internal-dev-tools";
const AUTO_REFRESH_KEY = "lfk-internal-auto-refresh";
const ACCENT = "#1A80C1";
const AUTO_REFRESH_MS = 15_000;
/** Nominal di atas ini dianggap outlier test (bukan sampling VA 10rb / QRIS 1rb). */
const OUTLIER_THRESHOLD = 100_000;

const PIE_COLORS = {
  PAID: "#10b981",
  PENDING: "#f59e0b",
  OTHER: "#94a3b8",
};

function statusLabel(status: string): string {
  switch (status) {
    case "PAID":
      return "Lunas";
    case "PENDING":
      return "Menunggu";
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

function formatRelative(iso: string | null, nowMs: number): string {
  if (!iso) return "—";
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return iso;
  const diffSec = Math.round((nowMs - t) / 1000);
  if (diffSec < 5) return "baru saja";
  if (diffSec < 60) return `${diffSec} dtk lalu`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} mnt lalu`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} jam lalu`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay} hari lalu`;
}

function dayKey(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    timeZone: "Asia/Jakarta",
  }).format(d);
}

/** Start of calendar day in Asia/Jakarta as UTC Date. */
function startOfJakartaDay(now = new Date()): Date {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const y = parts.find((p) => p.type === "year")?.value ?? "1970";
  const m = parts.find((p) => p.type === "month")?.value ?? "01";
  const d = parts.find((p) => p.type === "day")?.value ?? "01";
  return new Date(`${y}-${m}-${d}T00:00:00+07:00`);
}

function startOfJakartaWeek(now = new Date()): Date {
  const start = startOfJakartaDay(now);
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    weekday: "short",
  }).format(now);
  const map: Record<string, number> = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6,
  };
  const offset = map[weekday] ?? 0;
  start.setTime(start.getTime() - offset * 24 * 60 * 60 * 1000);
  return start;
}

function paidAtMs(row: InvoiceRow): number {
  const raw = row.paidAt ?? row.createdAt;
  return new Date(raw).getTime();
}

function Copyable({
  value,
  className,
  mono,
}: {
  value: string;
  className?: string;
  mono?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      title="Salin"
      onClick={() => void onCopy()}
      className={`group inline-flex max-w-full items-center gap-1.5 rounded-md text-left transition hover:text-[#1A80C1] ${
        mono ? "font-mono" : ""
      } ${className ?? ""}`}
    >
      <span className="truncate">{value}</span>
      {copied ? (
        <Check className="size-3 shrink-0 text-emerald-600" />
      ) : (
        <Copy className="size-3 shrink-0 opacity-0 transition group-hover:opacity-60" />
      )}
    </button>
  );
}

export const InternalOrdersPage = () => {
  const [keyInput, setKeyInput] = useState(() => localStorage.getItem(STORAGE_KEY) ?? "");
  const [key, setKey] = useState(() => localStorage.getItem(STORAGE_KEY) ?? "");
  const [filter, setFilter] = useState<StatusFilter>("ALL");
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState<InvoiceRow[]>([]);
  const [stock, setStock] = useState<StockInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [simulatingId, setSimulatingId] = useState<string | null>(null);
  const [lastFetchedAt, setLastFetchedAt] = useState<string | null>(null);
  const [nowTick, setNowTick] = useState(() => Date.now());
  const [autoRefresh, setAutoRefresh] = useState(
    () => localStorage.getItem(AUTO_REFRESH_KEY) === "1",
  );
  const [devTools, setDevTools] = useState(
    () => localStorage.getItem(DEV_TOOLS_KEY) === "1",
  );
  const [hideOutliers, setHideOutliers] = useState(true);

  const fetchRows = useCallback(
    async (authKey: string, statusFilter: string, opts?: { silent?: boolean }) => {
      if (!authKey) return;
      const silent = opts?.silent ?? false;
      if (!silent) setLoading(true);
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
        setLastFetchedAt(new Date().toISOString());
      } catch (err) {
        if (!silent) {
          setRows([]);
          setStock(null);
        }
        setError(err instanceof Error ? err.message : "Gagal memuat data");
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!key) return;
    void fetchRows(key, filter);
  }, [key, filter, fetchRows]);

  useEffect(() => {
    localStorage.setItem(AUTO_REFRESH_KEY, autoRefresh ? "1" : "0");
  }, [autoRefresh]);

  useEffect(() => {
    localStorage.setItem(DEV_TOOLS_KEY, devTools ? "1" : "0");
  }, [devTools]);

  useEffect(() => {
    if (!key || !autoRefresh) return;
    const id = window.setInterval(() => {
      void fetchRows(key, filter, { silent: true });
    }, AUTO_REFRESH_MS);
    return () => window.clearInterval(id);
  }, [key, filter, autoRefresh, fetchRows]);

  useEffect(() => {
    const id = window.setInterval(() => setNowTick(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!notice) return;
    const id = window.setTimeout(() => setNotice(null), 3200);
    return () => window.clearTimeout(id);
  }, [notice]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => {
      const hay = [
        row.orderId,
        row.customerName,
        row.customerEmail,
        row.customerPhone,
        row.paymentChannelCode,
        row.virtualAccountBank,
        row.virtualAccountNo,
        row.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [rows, search]);

  const stats = useMemo(() => {
    const paidAll = rows.filter((r) => r.status === "PAID");
    const paidForRevenue = hideOutliers
      ? paidAll.filter((r) => r.grandTotal <= OUTLIER_THRESHOLD)
      : paidAll;
    const dayStart = startOfJakartaDay().getTime();
    const weekStart = startOfJakartaWeek().getTime();

    const sumPaid = (list: InvoiceRow[]) =>
      list.reduce((sum, r) => sum + r.grandTotal, 0);

    const todayRows = paidForRevenue.filter((r) => paidAtMs(r) >= dayStart);
    const weekRows = paidForRevenue.filter((r) => paidAtMs(r) >= weekStart);
    const outlierCount = paidAll.filter((r) => r.grandTotal > OUTLIER_THRESHOLD).length;

    return {
      total: rows.length,
      paid: paidAll.length,
      pending: rows.filter((r) => r.status === "PENDING").length,
      revenueToday: sumPaid(todayRows),
      revenueWeek: sumPaid(weekRows),
      revenueAll: sumPaid(paidForRevenue),
      outlierCount,
      revenueAllRaw: sumPaid(paidAll),
    };
  }, [rows, hideOutliers]);

  const pieData = useMemo(() => {
    const paid = rows.filter((r) => r.status === "PAID").length;
    const pending = rows.filter((r) => r.status === "PENDING").length;
    const expired = rows.filter((r) => r.status === "EXPIRED").length;
    const failed = rows.filter((r) => r.status === "FAILED").length;
    const other = Math.max(0, rows.length - paid - pending - expired - failed);
    return [
      { name: "Lunas", value: paid, color: PIE_COLORS.PAID },
      { name: "Pending", value: pending, color: PIE_COLORS.PENDING },
      { name: "Kadaluarsa", value: expired, color: "#ea580c" },
      { name: "Gagal", value: failed, color: "#dc2626" },
      { name: "Lainnya", value: other, color: PIE_COLORS.OTHER },
    ].filter((d) => d.value > 0);
  }, [rows]);

  const trendData = useMemo(() => {
    const map = new Map<string, { day: string; count: number; revenue: number; sort: number }>();
    for (const row of rows) {
      const d = new Date(row.createdAt);
      const sort = d.getTime();
      const label = dayKey(row.createdAt);
      const current = map.get(label) ?? { day: label, count: 0, revenue: 0, sort };
      current.count += 1;
      if (row.status === "PAID") current.revenue += row.grandTotal;
      current.sort = Math.min(current.sort, sort);
      map.set(label, current);
    }
    return [...map.values()].sort((a, b) => a.sort - b.sort).slice(-10);
  }, [rows]);

  const stockPct = stock
    ? Math.round((stock.quantityRemaining / Math.max(stock.quantityInitial, 1)) * 100)
    : 0;

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
      setNotice("Stok di-reset ke 100.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal reset stok");
    } finally {
      setResetting(false);
    }
  };

  const simulateStatus = async (orderId: string, status: "EXPIRED" | "FAILED") => {
    if (!key) return;
    const ok = window.confirm(
      `Simulasikan ${orderId} → ${status}?\n\nCheckout yang masih polling akan ikut pindah ke layar kadaluarsa/gagal setelah sync.`,
    );
    if (!ok) return;

    setSimulatingId(orderId);
    setError(null);
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/internal/invoices/${encodeURIComponent(orderId)}/simulate-status?key=${encodeURIComponent(key)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ key, status }),
        },
      );
      const body = (await res.json()) as { success?: boolean; message?: string };
      if (!res.ok || !body.success) {
        throw new Error(body.message ?? `HTTP ${res.status}`);
      }
      setNotice(`Status ${orderId} → ${status}`);
      await fetchRows(key, filter);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal simulasi status");
    } finally {
      setSimulatingId(null);
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setKey("");
    setKeyInput("");
    setRows([]);
    setStock(null);
    setLastFetchedAt(null);
  };

  const colCount = devTools ? 7 : 6;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#e8eef5] text-slate-900">
      <div className="pointer-events-none absolute -left-24 top-0 size-[28rem] rounded-full bg-[#1A80C1]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-40 size-[24rem] rounded-full bg-[#FFCFCF]/35 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 size-[22rem] rounded-full bg-slate-400/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-900 shadow-lg shadow-slate-900/20">
              <Shield className="size-6 text-[#5eb3e8]" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1A80C1]">
                LFK Internal
              </p>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Orders Dashboard
              </h1>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Monitor invoice, stok edisi terbatas, dan pembayaran Arkiv.
              </p>
            </div>
          </div>
          {key ? (
            <div className="flex flex-wrap items-center gap-2">
              {lastFetchedAt ? (
                <p className="mr-1 text-xs font-semibold text-slate-500">
                  Update {formatRelative(lastFetchedAt, nowTick)}
                  {autoRefresh ? " · auto 15s" : ""}
                </p>
              ) : null}
              <button
                type="button"
                onClick={() => setAutoRefresh((v) => !v)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                  autoRefresh
                    ? "bg-[#1A80C1] text-white shadow-sm"
                    : "border border-white/70 bg-white/80 text-slate-700 shadow-sm backdrop-blur hover:bg-white"
                }`}
              >
                <RefreshCw className={`size-4 ${autoRefresh ? "animate-spin" : ""}`} />
                Auto
              </button>
              <button
                type="button"
                onClick={() => void fetchRows(key, filter)}
                className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm backdrop-blur transition hover:bg-white"
              >
                <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-bold text-white"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </div>
          ) : null}
        </header>

        <AnimatePresence mode="wait">
          {!key ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-auto mt-10 max-w-md"
            >
              <form
                onSubmit={unlock}
                className="rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl"
              >
                <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-[#1A80C1]/10 text-[#1A80C1]">
                  <KeyRound className="size-7" />
                </div>
                <h2 className="text-center text-2xl font-black tracking-tight">Masuk Internal</h2>
                <p className="mt-2 text-center text-sm font-medium text-slate-500">
                  Paste key dari admin Famindo / LFK. Key panjang — copy paste saja.
                </p>
                <label className="mt-8 block text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Internal key
                </label>
                <input
                  type="password"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold outline-none transition focus:border-[#1A80C1] focus:ring-4 focus:ring-[#1A80C1]/15"
                  placeholder="Paste INTERNAL_DASHBOARD_KEY"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="submit"
                  className="mt-5 w-full rounded-full bg-[#1A80C1] py-3.5 text-sm font-black text-white shadow-lg shadow-[#1A80C1]/30 transition hover:bg-[#1672ad]"
                >
                  Buka Dashboard
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="dash"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {error ? (
                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  {error}
                </div>
              ) : null}
              {notice ? (
                <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                  {notice}
                </div>
              ) : null}

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-[1.5rem] bg-slate-900 p-5 text-white shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] opacity-70">
                      Total invoice
                    </p>
                    <Wallet className="size-4 opacity-70" />
                  </div>
                  <p className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                    {stats.total}
                  </p>
                  <p className="mt-2 text-xs font-semibold text-white/60">
                    Filter aktif: {filter === "ALL" ? "semua status" : statusLabel(filter)}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="rounded-[1.5rem] bg-emerald-50 p-5 text-emerald-800 shadow-sm ring-1 ring-emerald-100"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] opacity-70">
                      Lunas
                    </p>
                    <CheckCircle2 className="size-4 opacity-70" />
                  </div>
                  <p className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                    {stats.paid}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-[1.5rem] bg-amber-50 p-5 text-amber-900 shadow-sm ring-1 ring-amber-100"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] opacity-70">
                      Pending
                    </p>
                    <Clock3 className="size-4 opacity-70" />
                  </div>
                  <p className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                    {stats.pending}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="rounded-[1.5rem] bg-[#1A80C1]/10 p-5 text-[#0d5a8c] shadow-sm ring-1 ring-[#1A80C1]/15"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] opacity-70">
                      Revenue hari ini
                    </p>
                    <Wallet className="size-4 opacity-70" />
                  </div>
                  <p className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                    {formatRupiah(stats.revenueToday)}
                  </p>
                  <p className="mt-2 text-[11px] font-bold leading-relaxed opacity-80">
                    Minggu: {formatRupiah(stats.revenueWeek)}
                    <br />
                    All-time: {formatRupiah(stats.revenueAll)}
                  </p>
                </motion.div>
              </div>

              <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur">
                <label className="inline-flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={hideOutliers}
                    onChange={(e) => setHideOutliers(e.target.checked)}
                    className="size-3.5 rounded border-slate-300 text-[#1A80C1] focus:ring-[#1A80C1]"
                  />
                  Sembunyikan outlier &gt; {formatRupiah(OUTLIER_THRESHOLD)} dari revenue
                </label>
                {stats.outlierCount > 0 ? (
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-amber-900">
                    {stats.outlierCount} invoice test besar (raw all-time{" "}
                    {formatRupiah(stats.revenueAllRaw)})
                  </span>
                ) : (
                  <span className="text-slate-400">Termasuk nominal sampling VA/QRIS.</span>
                )}
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                {stock ? (
                  <div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#1A80C1]/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#1A80C1]">
                          <Package className="size-3.5" />
                          Stok edisi terbatas
                        </div>
                        <p className="mt-3 text-sm font-bold text-slate-600">{stock.label}</p>
                        <p className="mt-2 text-4xl font-black tracking-tight text-slate-900">
                          {stock.quantityRemaining}
                          <span className="text-xl font-bold text-slate-400">
                            {" "}
                            / {stock.quantityInitial}
                          </span>
                        </p>
                        <p className="mt-2 text-xs font-semibold text-slate-500">
                          Terjual {stock.sold} · Update {formatWhen(stock.updatedAt)}
                        </p>
                      </div>
                      <button
                        type="button"
                        disabled={resetting}
                        onClick={() => void resetStock()}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"
                      >
                        <RotateCcw className={`size-4 ${resetting ? "animate-spin" : ""}`} />
                        {resetting ? "Resetting…" : "Reset ke 100"}
                      </button>
                    </div>
                    <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stockPct}%` }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          stockPct <= 10
                            ? "bg-gradient-to-r from-red-500 to-orange-400"
                            : "bg-gradient-to-r from-[#1A80C1] to-[#5eb3e8]"
                        }`}
                      />
                    </div>
                    <p className="mt-2 text-right text-xs font-bold text-slate-500">
                      {stockPct}% tersisa
                    </p>
                  </div>
                ) : (
                  <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white/50 p-6 text-sm font-semibold text-slate-500">
                    Stok belum tersedia.
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-5 shadow-sm backdrop-blur">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                      Status mix
                    </p>
                    <div className="mt-2 h-44">
                      {pieData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              dataKey="value"
                              nameKey="name"
                              innerRadius={48}
                              outerRadius={72}
                              paddingAngle={3}
                            >
                              {pieData.map((entry) => (
                                <Cell key={entry.name} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value) => [`${value as number} invoice`, ""]}
                              contentStyle={{
                                borderRadius: 12,
                                border: "1px solid #e2e8f0",
                                fontSize: 12,
                                fontWeight: 700,
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm font-semibold text-slate-400">
                          Belum ada data
                        </div>
                      )}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-3 text-[11px] font-bold">
                      {pieData.map((d) => (
                        <span key={d.name} className="inline-flex items-center gap-1.5 text-slate-600">
                          <span
                            className="size-2.5 rounded-full"
                            style={{ backgroundColor: d.color }}
                          />
                          {d.name} {d.value}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-5 shadow-sm backdrop-blur">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                      Tren order
                    </p>
                    <div className="mt-2 h-44">
                      {trendData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={trendData}>
                            <defs>
                              <linearGradient id="orderFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={ACCENT} stopOpacity={0.35} />
                                <stop offset="100%" stopColor={ACCENT} stopOpacity={0.02} />
                              </linearGradient>
                            </defs>
                            <XAxis
                              dataKey="day"
                              tick={{ fontSize: 10, fill: "#94a3b8" }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <YAxis hide />
                            <Tooltip
                              contentStyle={{
                                borderRadius: 12,
                                border: "1px solid #e2e8f0",
                                fontSize: 12,
                                fontWeight: 700,
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="count"
                              stroke={ACCENT}
                              fill="url(#orderFill)"
                              strokeWidth={2.5}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm font-semibold text-slate-400">
                          Belum ada data
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-wrap gap-1 rounded-full border border-white/80 bg-white/80 p-1 text-sm font-bold shadow-sm backdrop-blur">
                  {(
                    [
                      ["ALL", "Semua"],
                      ["PAID", "Lunas"],
                      ["PENDING", "Pending"],
                      ["EXPIRED", "Kadaluarsa"],
                      ["FAILED", "Gagal"],
                    ] as const
                  ).map(([f, label]) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFilter(f)}
                      className={`rounded-full px-3 py-1.5 transition sm:px-4 ${
                        filter === f
                          ? "bg-slate-900 text-white"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="relative min-w-[220px] flex-1">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari nama, email, phone, order, VA…"
                    className="w-full rounded-full border border-white/80 bg-white/90 py-2.5 pr-4 pl-10 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-[#1A80C1] focus:ring-4 focus:ring-[#1A80C1]/15"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setDevTools((v) => !v)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                    devTools
                      ? "bg-orange-500 text-white shadow-sm"
                      : "border border-white/70 bg-white/80 text-slate-600 shadow-sm backdrop-blur hover:bg-white"
                  }`}
                >
                  <FlaskConical className="size-4" />
                  Dev tools
                </button>
              </div>

              <div className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="border-b border-slate-100 bg-slate-50/80 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                      <tr>
                        <th className="px-5 py-4">Waktu</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4">Customer</th>
                        <th className="px-5 py-4">Channel</th>
                        <th className="px-5 py-4">Nominal</th>
                        <th className="px-5 py-4">Order</th>
                        {devTools ? <th className="px-5 py-4">QA</th> : null}
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={colCount} className="px-5 py-14 text-center text-slate-500">
                            <RefreshCw className="mx-auto mb-2 size-5 animate-spin text-[#1A80C1]" />
                            Memuat data…
                          </td>
                        </tr>
                      ) : filteredRows.length === 0 ? (
                        <tr>
                          <td
                            colSpan={colCount}
                            className="px-5 py-14 text-center font-semibold text-slate-400"
                          >
                            {search.trim() ? "Tidak ada hasil pencarian" : "Belum ada invoice"}
                          </td>
                        </tr>
                      ) : (
                        filteredRows.map((row, index) => {
                          const isOutlier = row.grandTotal > OUTLIER_THRESHOLD;
                          return (
                            <motion.tr
                              key={row.orderId}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: Math.min(index * 0.02, 0.3) }}
                              className="border-b border-slate-50 align-top transition hover:bg-[#1A80C1]/[0.03]"
                            >
                              <td className="px-5 py-4 whitespace-nowrap text-xs text-slate-500">
                                <div className="font-semibold text-slate-700">
                                  {formatRelative(row.createdAt, nowTick)}
                                </div>
                                <div className="mt-0.5 text-slate-400">{formatWhen(row.createdAt)}</div>
                                {row.expiresAt ? (
                                  <div className="mt-1 text-slate-400">
                                    Exp: {formatWhen(row.expiresAt)}
                                  </div>
                                ) : null}
                                {row.paidAt ? (
                                  <div className="mt-1 font-semibold text-emerald-700">
                                    Bayar: {formatRelative(row.paidAt, nowTick)}
                                  </div>
                                ) : null}
                              </td>
                              <td className="px-5 py-4">
                                <span
                                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                                    row.status === "PAID"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : row.status === "PENDING"
                                        ? "bg-amber-100 text-amber-900"
                                        : row.status === "EXPIRED"
                                          ? "bg-orange-100 text-orange-900"
                                          : row.status === "FAILED"
                                            ? "bg-red-100 text-red-800"
                                            : "bg-slate-100 text-slate-700"
                                  }`}
                                >
                                  {statusLabel(row.status)}
                                </span>
                                {isOutlier ? (
                                  <div className="mt-1.5 inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-amber-900">
                                    Outlier
                                  </div>
                                ) : null}
                              </td>
                              <td className="px-5 py-4">
                                <div className="font-bold text-slate-900">
                                  {row.customerName ?? "—"}
                                </div>
                                {row.customerEmail ? (
                                  <Copyable
                                    value={row.customerEmail}
                                    className="mt-0.5 text-xs text-slate-500"
                                  />
                                ) : (
                                  <div className="text-xs text-slate-500">—</div>
                                )}
                                {row.customerPhone ? (
                                  <Copyable
                                    value={row.customerPhone}
                                    className="text-xs text-slate-500"
                                  />
                                ) : (
                                  <div className="text-xs text-slate-500">—</div>
                                )}
                              </td>
                              <td className="px-5 py-4 text-xs font-semibold">
                                {row.paymentChannelCode ?? "—"}
                                {row.virtualAccountBank ? (
                                  <div className="text-slate-500">{row.virtualAccountBank}</div>
                                ) : null}
                                {row.virtualAccountNo ? (
                                  <Copyable
                                    value={row.virtualAccountNo}
                                    mono
                                    className="text-slate-500"
                                  />
                                ) : null}
                              </td>
                              <td className="px-5 py-4 font-black whitespace-nowrap text-slate-900">
                                {formatRupiah(row.grandTotal)}
                              </td>
                              <td className="px-5 py-4 text-xs text-slate-500">
                                <Copyable value={row.orderId} mono />
                              </td>
                              {devTools ? (
                                <td className="px-5 py-4">
                                  {row.status === "PENDING" ? (
                                    <div className="flex flex-col gap-1.5">
                                      <button
                                        type="button"
                                        disabled={simulatingId === row.orderId}
                                        onClick={() => void simulateStatus(row.orderId, "EXPIRED")}
                                        className="rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-orange-900 disabled:opacity-50"
                                      >
                                        Expire
                                      </button>
                                      <button
                                        type="button"
                                        disabled={simulatingId === row.orderId}
                                        onClick={() => void simulateStatus(row.orderId, "FAILED")}
                                        className="rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-red-800 disabled:opacity-50"
                                      >
                                        Fail
                                      </button>
                                    </div>
                                  ) : (
                                    <span className="text-xs text-slate-300">—</span>
                                  )}
                                </td>
                              ) : null}
                            </motion.tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
                {filteredRows.length > 0 ? (
                  <div className="border-t border-slate-100 px-5 py-3 text-xs font-semibold text-slate-400">
                    Menampilkan {filteredRows.length}
                    {search.trim() ? ` dari ${rows.length}` : ""} invoice
                  </div>
                ) : null}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
