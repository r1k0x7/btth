"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import type { ScanResult } from "@/lib/types";
import {
  buildReadingText,
  buildShareUrl,
  canvasToBlob,
  renderShareCard,
  shareFileName,
} from "@/lib/shareCard";

type Feedback = { key: string; label: string } | null;

/**
 * Result actions: download a branded PNG card, share it (native share sheet
 * with the image when supported, otherwise copy a reproducible link), and
 * copy the text reading.
 */
export function ShareActions({
  result,
  onScanAgain,
}: {
  result: ScanResult;
  onScanAgain: () => void;
}) {
  const [busy, setBusy] = useState<null | "download" | "share">(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const cardCache = useRef<Blob | null>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCanNativeShare(
      typeof navigator !== "undefined" && typeof navigator.share === "function",
    );
  }, []);

  // A fresh scan invalidates the cached image.
  useEffect(() => {
    cardCache.current = null;
  }, [result]);

  useEffect(
    () => () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    },
    [],
  );

  const flash = useCallback((key: string, label: string) => {
    setFeedback({ key, label });
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setFeedback(null), 2200);
  }, []);

  const getCard = useCallback(async () => {
    if (cardCache.current) return cardCache.current;
    const canvas = await renderShareCard(result);
    const blob = await canvasToBlob(canvas);
    cardCache.current = blob;
    return blob;
  }, [result]);

  const handleDownload = useCallback(async () => {
    if (busy) return;
    setBusy("download");
    try {
      const blob = await getCard();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = shareFileName(result);
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      flash("download", "Tersimpan ✓");
    } catch {
      flash("download", "Gagal mengunduh");
    } finally {
      setBusy(null);
    }
  }, [busy, flash, getCard, result]);

  const copyLink = useCallback(async () => {
    const text = `${buildReadingText(result)}\n\n${buildShareUrl(result)}`;
    try {
      await navigator.clipboard.writeText(text);
      flash("share", "Tautan tersalin ✓");
    } catch {
      flash("share", "Gagal menyalin");
    }
  }, [flash, result]);

  const handleShare = useCallback(async () => {
    if (busy) return;
    setBusy("share");
    try {
      const shareData: ShareData = {
        title: "Dou Qi Realm Scanner",
        text: buildReadingText(result),
        url: buildShareUrl(result),
      };

      // Prefer sharing the image file when the platform allows it.
      try {
        const blob = await getCard();
        const file = new File([blob], shareFileName(result), {
          type: "image/png",
        });
        const withFile: ShareData = { ...shareData, files: [file] };
        if (
          typeof navigator.canShare === "function" &&
          navigator.canShare(withFile)
        ) {
          await navigator.share(withFile);
          flash("share", "Dibagikan ✓");
          return;
        }
      } catch {
        /* fall through to link/text sharing */
      }

      if (typeof navigator.share === "function") {
        await navigator.share(shareData);
        flash("share", "Dibagikan ✓");
        return;
      }

      await copyLink();
    } catch (err) {
      // A user cancelling the native sheet throws AbortError — stay quiet.
      if (!(err instanceof DOMException && err.name === "AbortError")) {
        await copyLink();
      }
    } finally {
      setBusy(null);
    }
  }, [busy, copyLink, flash, getCard, result]);

  const handleCopyReading = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(buildReadingText(result));
      flash("reading", "Tersalin ✓");
    } catch {
      flash("reading", "Gagal menyalin");
    }
  }, [flash, result]);

  const label = (key: string, fallback: string) =>
    feedback?.key === key ? feedback.label : fallback;

  return (
    <div className="flex flex-wrap justify-center gap-3 pt-2">
      <GlowButton onClick={handleDownload} variant="ghost" disabled={busy !== null}>
        {busy === "download" ? "Menyiapkan…" : label("download", "Unduh Gambar")}
      </GlowButton>
      <GlowButton onClick={handleShare} disabled={busy !== null}>
        {busy === "share"
          ? "Menyiapkan…"
          : label("share", canNativeShare ? "Bagikan" : "Bagikan Tautan")}
      </GlowButton>
      <GlowButton onClick={handleCopyReading} variant="ghost">
        {label("reading", "Salin Bacaan")}
      </GlowButton>
      <GlowButton onClick={onScanAgain} variant="ghost">
        Pindai Lagi
      </GlowButton>
    </div>
  );
}
