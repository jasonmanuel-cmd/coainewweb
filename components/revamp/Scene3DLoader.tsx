"use client";

import dynamic from "next/dynamic";

const Scene3D = dynamic(
  () => import("./Scene3D").then((m) => m.Scene3D),
  { ssr: false }
);

export function Scene3DLoader() {
  return <Scene3D />;
}
