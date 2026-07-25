import type { ReportData } from "./mockReportData";

// The report preview renders this id so the export helpers can find the exact
// DOM subtree to rasterise.
export const REPORT_PREVIEW_ID = "report-preview";

function fileSlug(period: string): string {
  return period
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function todayFileDate(): string {
  return new Date().toISOString().split("T")[0];
}

function reportFileName(period: string, extension: "pdf" | "png"): string {
  return `OBBICabs-Report-${fileSlug(period)}-${todayFileDate()}.${extension}`;
}

async function captureReport(): Promise<HTMLCanvasElement> {
  const element = document.getElementById(REPORT_PREVIEW_ID);
  if (!element) {
    throw new Error("Report preview is not ready yet — try again in a moment.");
  }

  // html2canvas and jspdf are both heavy and browser-only, so they stay out of
  // the initial bundle and load on the first export.
  const { default: html2canvas } = await import("html2canvas");
  return html2canvas(element, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
}

export async function downloadReportPDF(period: string): Promise<void> {
  const canvas = await captureReport();
  const { default: jsPDF } = await import("jspdf");

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgHeight = (canvas.height * pageWidth) / canvas.width;

  // A full report runs several A4 pages tall. Draw the same tall image on each
  // page, shifted up by one page height, so nothing is cropped at the boundary.
  pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);

  let remaining = imgHeight - pageHeight;
  let offset = 0;
  while (remaining > 0) {
    offset -= pageHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, offset, pageWidth, imgHeight);
    remaining -= pageHeight;
  }

  pdf.save(reportFileName(period, "pdf"));
}

export async function downloadReportPNG(period: string): Promise<void> {
  const canvas = await captureReport();
  const link = document.createElement("a");
  link.download = reportFileName(period, "png");
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export function buildWhatsAppSummary(period: string, data: ReportData): string {
  const inr = (value: number) => `₹${value.toLocaleString("en-IN")}`;

  return [
    "*Obbi Cabs — Business Report*",
    `Period: ${period}`,
    `Generated: ${data.generated}`,
    "",
    "📊 *P&L Summary*",
    `Total Income: ${inr(data.pl.totalIncome)}`,
    `Total Expenses: ${inr(data.pl.totalExpenses)}`,
    `*Net Profit: ${inr(data.pl.netProfit)} ✅*`,
    `Growth: ↑ ${data.pl.growthPercent}% 📈`,
    "",
    `📋 Bookings: ${data.overview.leadsClosed}/${data.overview.leadsReceived}`,
    `⭐ Rating: ${data.ratings.average}`,
  ].join("\n");
}

export function shareReportWhatsApp(period: string, data: ReportData): void {
  const text = buildWhatsAppSummary(period, data);
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
}
