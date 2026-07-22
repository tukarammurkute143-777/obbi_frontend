import StarsBackground from "@/components/landing/StarsBackground";

function MountainsSilhouette() {
  return (
    <svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-40 w-full sm:h-56 md:h-72"
      aria-hidden="true"
    >
      <path
        d="M0,320 L0,180 L120,110 L220,170 L340,60 L460,150 L580,90 L700,180 L820,40 L950,160 L1080,100 L1200,190 L1320,120 L1440,200 L1440,320 Z"
        fill="#1A1A26"
        opacity="0.85"
      />
      <path
        d="M0,320 L0,230 L150,170 L280,220 L420,140 L560,210 L700,150 L860,230 L1000,170 L1160,240 L1300,190 L1440,240 L1440,320 Z"
        fill="#12121A"
      />
    </svg>
  );
}

export default function LoginBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-dark via-dark-2 to-dark"
    >
      <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <StarsBackground />
      <MountainsSilhouette />
    </div>
  );
}
