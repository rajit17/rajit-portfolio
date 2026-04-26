"use client";

import TubesBackground from "@/components/TubesBackground";
import Overlay from "@/components/Overlay";

export default function Hero() {
  return (
    <div className="relative min-h-screen" id="home">
      <TubesBackground>
        <Overlay />
      </TubesBackground>
    </div>
  );
}
