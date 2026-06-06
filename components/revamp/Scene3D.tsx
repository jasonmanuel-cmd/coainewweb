"use client";

import Image from "next/image";

export function Scene3D() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Image
        src="/3dlogo.png"
        alt=""
        fill
        priority
        style={{
          objectFit: "contain",
          opacity: 0.35,
          transform: "scale(0.85)",
        }}
      />
    </div>
  );
}
