import { PIXABAY_HOME } from "@/lib/imageService";

interface PhotoCreditProps {
  show: boolean;
  className?: string;
}

export default function PhotoCredit({ show, className = "" }: PhotoCreditProps) {
  if (!show) return null;

  return (
    <p className={`font-body text-[11px] leading-tight text-white/85 ${className}`}>
      <a
        href={PIXABAY_HOME}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-white/40 underline-offset-2 hover:text-white"
      >
        Photo from Pixabay
      </a>
    </p>
  );
}
