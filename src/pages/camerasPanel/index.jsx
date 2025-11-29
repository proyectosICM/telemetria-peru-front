// src/components/cameras/CamerasPanel.jsx
import React from "react";
import "./camerasPanel.css";
import { HlsPlayer } from "../../common/HlsPlayer";

export function CamerasPanel() {
  const cameras = [
    { name: "Cámara 1", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { name: "Cámara 2", url: null },
    { name: "Cámara 3", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { name: "Cámara 4", url: "http://38.43.134.172:2000/000012345678_4.m3u8" },
    { name: "Cámara 5", url: null },
    { name: "Cámara 6", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { name: "Cámara 7", url: null },
    { name: "Cámara 8", url: null },
    { name: "Cámara 9", url: null },
  ];

  const isHls = (url) => !!url && url.toLowerCase().endsWith(".m3u8");

  return (
    <div className="g-background">
      <div className="g-cameras-panel">
        <h2>Panel de Cámaras</h2>

        <div className="camera-grid">
          {cameras.map((camera, index) => (
            <div key={index} className="camera-box">
              <div className="camera-label">{camera.name}</div>

              {camera.url ? (
                isHls(camera.url) ? (
                  <HlsPlayer
                    src={camera.url}
                    className="camera-video"
                    autoPlay
                    muted
                    controls
                  />
                ) : (
                  <video
                    src={camera.url}
                    className="camera-video"
                    controls
                    muted
                    autoPlay
                  />
                )
              ) : (
                <div className="camera-placeholder">Sin señal</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
