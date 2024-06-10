import { AnimationBackground } from "@/components/shared/animation-background";
import { FabMenu } from "@/components/shared/fab-menu";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <header>
        <AnimationBackground />
        <FabMenu startAngle={0} rotationAngle={90} rotation={8} />
      </header>
      <main>{children}</main>
    </div>
  );
}
