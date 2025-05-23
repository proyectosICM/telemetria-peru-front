import React from "react";
import "./camerasPanel.css";

export function CamerasPanel() {
  // Lista simulada de cámaras (algunas con url y otras sin)
  const cameras = [
    { name: "Cámara 1", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { name: "Cámara 2", url: null },
    { name: "Cámara 3", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { name: "Cámara 4", url: null },
    { name: "Cámara 5", url: null },
    { name: "Cámara 6", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { name: "Cámara 7", url: null },
    { name: "Cámara 8", url: null },
    { name: "Cámara 9", url: null },

  ];

  return (
    <div className="g-background">
      <div className="g-cameras-panel">
        <h2>Panel de Cámaras</h2>

        <div className="camera-grid">
          {cameras.map((camera, index) => (
            <div key={index} className="camera-box">
              <div className="camera-label">{camera.name}</div>

              {camera.url ? (
                <video src={camera.url} className="camera-video" controls muted autoPlay />
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
