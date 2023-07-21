import { AnimationBackground } from "@/components/molecules/animation-background/animation-background";
import { FabItem, FabMenu } from "@/components/molecules/fab-menu";
import {
  HomeIcon,
  PhotoIcon,
  PuzzlePieceIcon,
  TicketIcon,
} from "@heroicons/react/24/solid";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative grid min-h-screen grid-rows-[80px,1fr,80px]">
      <header className="grid items-center">
        <AnimationBackground />
        <div className="grid px-4">
          <FabMenu
            startAngle={0}
            rotationAngle={90}
            radius={10}
            transform="right"
          >
            <FabItem path="/">
              <HomeIcon />
            </FabItem>
            <FabItem path="/gallery">
              <PhotoIcon />
            </FabItem>
            <FabItem path="/game">
              <PuzzlePieceIcon />
            </FabItem>
            <FabItem path="/ticket">
              <TicketIcon />
            </FabItem>
          </FabMenu>
        </div>
      </header>
      <main className="grid place-items-center">{children}</main>
    </div>
  );
}
