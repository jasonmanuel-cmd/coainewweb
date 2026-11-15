"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

type ZoomableScreenshotProps = {
  src: string;
  alt: string;
  sizes: string;
  className: string;
  imageClassName: string;
};

export function ZoomableScreenshot({ src, alt, sizes, className, imageClassName }: ZoomableScreenshotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const previewRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
      } else if (event.key === "Tab") {
        // The close button is the only control in the lightbox, so keep keyboard focus there.
        event.preventDefault();
        closeRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previewRef.current?.focus();
    };
  }, [isOpen]);

  const lightbox = isOpen && typeof document !== "undefined"
    ? createPortal(
        <div
          className="zoomable-screenshot-backdrop"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <div
            className="zoomable-screenshot-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Enlarged screenshot: ${alt}`}
            tabIndex={-1}
          >
            <button
              ref={closeRef}
              className="zoomable-screenshot-close"
              type="button"
              aria-label="Close enlarged screenshot"
              onClick={() => setIsOpen(false)}
            >
              <X aria-hidden="true" />
            </button>
            <div className="zoomable-screenshot-large-frame" style={{ position: "relative" }}>
              <Image src={src} alt={alt} fill sizes="96vw" quality={88} />
            </div>
            <p className="zoomable-screenshot-hint">Click outside or press Escape to close</p>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <button
        ref={previewRef}
        className={className}
        style={{ position: "relative" }}
        type="button"
        aria-label={`View enlarged screenshot: ${alt}`}
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}
      >
        <Image className={imageClassName} src={src} alt={alt} fill sizes={sizes} />
        <span className="zoomable-screenshot-cue" aria-hidden="true">
          <Maximize2 />
          Click to enlarge
        </span>
      </button>
      {lightbox}
    </>
  );
}
