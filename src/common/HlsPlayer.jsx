// src/common/HlsPlayer.jsx
import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

export function HlsPlayer({ src, autoPlay = true, muted = true, controls = true, className }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let hls = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("[HLS] error", event, data);
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari / iOS
      video.src = src;
    } else {
      console.warn("[HLS] Navegador sin soporte HLS ni hls.js");
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      controls={controls}
      playsInline
    />
  );
}
