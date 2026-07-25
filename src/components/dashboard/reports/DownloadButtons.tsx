"use client";

import { Download, MessageCircle } from "lucide-react";

export type ExportJob = "pdf" | "png" | null;

interface DownloadButtonsProps {
  busy: ExportJob;
  onDownloadPDF: () => void;
  onDownloadPNG: () => void;
  onShareWhatsApp: () => void;
}

export default function DownloadButtons({
  busy,
  onDownloadPDF,
  onDownloadPNG,
  onShareWhatsApp,
}: DownloadButtonsProps) {
  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={onDownloadPDF}
        disabled={busy !== null}
        className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-5 py-2.5 font-body text-sm font-medium text-dark transition-[transform,box-shadow] duration-150 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        <Download className="h-4 w-4" strokeWidth={2} />
        {busy === "pdf" ? "Generating…" : "Download PDF 📄"}
      </button>
      <button
        type="button"
        onClick={onDownloadPNG}
        disabled={busy !== null}
        className="flex items-center justify-center gap-2 rounded-full border border-gold/50 px-5 py-2.5 font-body text-sm font-medium text-gold-light transition-colors hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Download className="h-4 w-4" strokeWidth={2} />
        {busy === "png" ? "Generating…" : "Download PNG 🖼️"}
      </button>
      <button
        type="button"
        onClick={onShareWhatsApp}
        className="flex items-center justify-center gap-2 rounded-full border border-[#25D366]/50 px-5 py-2.5 font-body text-sm font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/10"
      >
        <MessageCircle className="h-4 w-4" strokeWidth={2} />
        Share via WhatsApp 📤
      </button>
    </div>
  );
}
