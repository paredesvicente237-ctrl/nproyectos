"use client";

import { useEffect, useRef, useState } from "react";

type LazyLoopVideoProps = {
  src: string;
  className?: string;
  showPauseControl?: boolean;
};

export default function LazyLoopVideo({ src, className, showPauseControl = false }: LazyLoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUserRef = useRef(false);
  const [pausedByUser, setPausedByUser] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const source = video?.querySelector("source");
    if (!video || !source || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const startPlayback = () => {
      if (pausedByUserRef.current) return;
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
        () => { if (!pausedByUserRef.current) void video.play().catch(() => undefined); },
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
    <>
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
    {showPauseControl && (
      <button
        type="button"
        className="absolute right-4 top-4 z-10 rounded-sm bg-[#101820]/80 px-3 py-2 text-xs font-semibold text-white hover:bg-[#101820] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:hidden"
        onClick={() => {
          const next = !pausedByUserRef.current;
          pausedByUserRef.current = next;
          setPausedByUser(next);
          if (next) videoRef.current?.pause();
          else void videoRef.current?.play().catch(() => undefined);
        }}
      >
        {pausedByUser ? "Reproducir video" : "Pausar video"}
      </button>
    )}
    </>
  );
}
