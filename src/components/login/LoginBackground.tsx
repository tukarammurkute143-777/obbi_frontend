import StarsBackground from "@/components/landing/StarsBackground";
import MountainsSilhouette from "@/components/shared/MountainsSilhouette";

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
