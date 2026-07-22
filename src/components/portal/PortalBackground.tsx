import StarsBackground from "@/components/landing/StarsBackground";

function SahyadriMountains() {
  return (
    <svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-[45vh] w-full opacity-30"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="portal-mountain-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#1A1A26" />
        </linearGradient>
      </defs>
      <path
        d="M0,320 L0,180 L120,110 L220,170 L340,60 L460,150 L580,90 L700,180 L820,40 L950,160 L1080,100 L1200,190 L1320,120 L1440,200 L1440,320 Z"
        fill="url(#portal-mountain-gold)"
        opacity="0.5"
      />
      <path
        d="M0,320 L0,230 L150,170 L280,220 L420,140 L560,210 L700,150 L860,230 L1000,170 L1160,240 L1300,190 L1440,240 L1440,320 Z"
        fill="#12121A"
      />
    </svg>
  );
}

export default function PortalBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden bg-dark"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at center bottom, rgba(201,168,76,0.06), transparent 70%)",
      }}
    >
      <StarsBackground starVerticalExtent={60} />
      <SahyadriMountains />
    </div>
  );
}
