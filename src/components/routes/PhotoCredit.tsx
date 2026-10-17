import type { PhotoCredit as Credit } from "@/lib/unsplash";

// Unsplash requires attribution wherever one of its photos is shown: the
// photographer's name linked to their profile, and a link to Unsplash, both
// with the utm parameters already on the URLs.
const UNSPLASH_HOME = "https://unsplash.com/?utm_source=obii_cabs&utm_medium=referral";

interface PhotoCreditProps {
  credit: Credit | null;
  className?: string;
}

export default function PhotoCredit({ credit, className = "" }: PhotoCreditProps) {
  if (!credit) return null;

  return (
    <p className={`font-body text-[11px] leading-tight text-white/85 ${className}`}>
      Photo by{" "}
      <a
        href={credit.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-white/40 underline-offset-2 hover:text-white"
      >
        {credit.name}
      </a>{" "}
      on{" "}
      <a
        href={UNSPLASH_HOME}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-white/40 underline-offset-2 hover:text-white"
      >
        Unsplash
      </a>
    </p>
  );
}
