"use client";

import { useEffect, useRef } from "react";

type LazyLoopVideoProps = {
  src: string;
  className?: string;
};

export default function LazyLoopVideo({ src, className }: LazyLoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const source = video?.querySelector("source");
    if (!video || !source || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const startPlayback = () => {
      if (!source.getAttribute("src")) {
        source.setAttribute("src", src);
        video.load();
      }

      if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        void video.play().catch(() => undefined);
        return;
      }

      video.addEventListener(
        "canplay",
        () => void video.play().catch(() => undefined),
        { once: true },
      );
    };

    if (!("IntersectionObserver" in window)) {
      startPlayback();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startPlayback();
        else video.pause();
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      muted
      loop
      playsInline
      preload="none"
      className={className}
    >
      <source data-src={src} type="video/mp4" />
    </video>
  );
}
