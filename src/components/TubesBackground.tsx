"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface TubesBackgroundProps {
  children?: ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

type TubesApp = {
  tubes?: {
    setColors?: (colors: string[]) => void;
    setLightsColors?: (colors: string[]) => void;
  };
  destroy?: () => void;
};

type TubesCursorFactory = (
  canvas: HTMLCanvasElement,
  options: {
    tubes: {
      colors: string[];
      lights: {
        intensity: number;
        colors: string[];
      };
    };
  }
) => TubesApp;

const randomColors = (count: number) =>
  Array.from({ length: count }, () =>
    `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`
  );

export default function TubesBackground({
  children,
  className = "",
  enableClickInteraction = true,
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tubesRef = useRef<TubesApp | null>(null);
  const fallbackCleanupRef = useRef<(() => void) | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    const tubesUrl =
      "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        const tubesModule = (await import(/* webpackIgnore: true */ tubesUrl)) as {
          default: TubesCursorFactory;
        };
        const TubesCursor = tubesModule.default;

        if (!mounted || !canvasRef.current) return;

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#f967fb", "#53bc28", "#6958d5"],
            lights: {
              intensity: 200,
              colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
            },
          },
        });

        tubesRef.current = app;
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load tubes background:", error);
        if (mounted && canvasRef.current) {
          fallbackCleanupRef.current = initFallbackTubes(canvasRef.current);
          setIsLoaded(true);
        }
      }
    };

    initTubes();

    return () => {
      mounted = false;
      tubesRef.current?.destroy?.();
      tubesRef.current = null;
      fallbackCleanupRef.current?.();
      fallbackCleanupRef.current = null;
    };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current?.tubes) return;

    tubesRef.current.tubes.setColors?.(randomColors(3));
    tubesRef.current.tubes.setLightsColors?.(randomColors(4));
  };

  return (
    <div
      className={`relative min-h-screen min-h-[100svh] w-full overflow-hidden bg-[#05060a] ${className}`}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full"
        style={{ touchAction: "none" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_42%),linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.78))]" />
      <div
        className={`pointer-events-none relative z-10 min-h-screen min-h-[100svh] w-full transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function initFallbackTubes(canvas: HTMLCanvasElement) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  const pointer = new THREE.Vector2(0, 0);
  const targetPointer = new THREE.Vector2(0, 0);
  const materials: THREE.MeshBasicMaterial[] = [];

  camera.position.set(0, 0, 8);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);

  const tubes = ["#f967fb", "#53bc28", "#6958d5", "#38bdf8"].map((color, index) => {
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.9,
    });
    materials.push(material);

    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-7, -2 + index * 1.2, -1.5),
      new THREE.Vector3(-3, 1.2 - index * 0.3, 0),
      new THREE.Vector3(0, -0.7 + index * 0.35, 1),
      new THREE.Vector3(3, 1.1 - index * 0.25, 0),
      new THREE.Vector3(7, -1.8 + index * 1.1, -1.5),
    ]);

    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 120, 0.04, 10), material);
    mesh.userData.phase = index * 0.8;
    scene.add(mesh);
    return mesh;
  });

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  };

  const handlePointerMove = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    targetPointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    targetPointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleTouchMove = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (!touch) return;

    const rect = canvas.getBoundingClientRect();
    targetPointer.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    targetPointer.y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
  };

  let frameId = 0;
  const animate = (time: number) => {
    pointer.lerp(targetPointer, 0.06);

    tubes.forEach((tube, index) => {
      const phase = tube.userData.phase as number;
      tube.rotation.z = Math.sin(time * 0.00045 + phase) * 0.13 + pointer.x * 0.18;
      tube.rotation.x = Math.cos(time * 0.00035 + phase) * 0.1 + pointer.y * 0.16;
      tube.position.x = pointer.x * (0.35 + index * 0.04);
      tube.position.y = pointer.y * (0.25 + index * 0.04);
    });

    renderer.render(scene, camera);
    frameId = requestAnimationFrame(animate);
  };

  resize();
  window.addEventListener("resize", resize);
  canvas.addEventListener("pointermove", handlePointerMove);
  canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
  frameId = requestAnimationFrame(animate);

  return () => {
    cancelAnimationFrame(frameId);
    window.removeEventListener("resize", resize);
    canvas.removeEventListener("pointermove", handlePointerMove);
    canvas.removeEventListener("touchmove", handleTouchMove);
    tubes.forEach((tube) => tube.geometry.dispose());
    materials.forEach((material) => material.dispose());
    renderer.dispose();
  };
}
