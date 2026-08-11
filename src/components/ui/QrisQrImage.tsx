import { useEffect, useState } from "react";
import QRCode from "qrcode";

interface QrisQrImageProps {
  content: string;
  className?: string;
  size?: number;
}

/** Renders SNAP QRIS EMV payload as a PNG data URL. */
export function QrisQrImage({ content, className = "", size = 280 }: QrisQrImageProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setFailed(false);
    setSrc(null);

    void QRCode.toDataURL(content, {
      width: size,
      margin: 2,
      errorCorrectionLevel: "M",
    })
      .then((url) => {
        if (!cancelled) setSrc(url);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [content, size]);

  if (failed) {
    return (
      <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
        Gagal merender QR. Salin konten QRIS manual jika perlu.
      </p>
    );
  }

  if (!src) {
    return (
      <div
        className={`animate-pulse rounded-2xl bg-slate-100 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <img
      src={src}
      alt="QRIS payment code"
      width={size}
      height={size}
      className={`rounded-2xl bg-white p-2 ${className}`}
    />
  );
}
