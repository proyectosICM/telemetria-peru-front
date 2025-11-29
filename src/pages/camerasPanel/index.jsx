// src/components/cameras/CamerasPanel.jsx
import React from "react";
import "./camerasPanel.css";
import { HlsPlayer } from "../../common/HlsPlayer";
import { useGetVehicleVideoConfig } from "../../api/hooks/useVehicle";

export function CamerasPanel({ vehicleId }) {
  const {
    data: videoConfig,
    isLoading,
    isError,
    error,
  } = useGetVehicleVideoConfig(vehicleId);

  const isHls = (url) => !!url && url.toLowerCase().endsWith(".m3u8");

  if (!vehicleId) {
    return (
      <div className="g-background">
        <div className="g-cameras-panel">
          <h2>Panel de Cámaras</h2>
          <p>Selecciona un vehículo para ver sus cámaras.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="g-background">
        <div className="g-cameras-panel">
          <h2>Panel de Cámaras</h2>
          <p>Cargando configuración de video...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="g-background">
        <div className="g-cameras-panel">
          <h2>Panel de Cámaras</h2>
          <p>Error al cargar la configuración de video.</p>
          {error?.message && <small>{error.message}</small>}
        </div>
      </div>
    );
  }

  // Si no hay config o no hay URLs, mensaje de “sin cámaras”
  if (
    !videoConfig ||
    !videoConfig.hlsUrls ||
    videoConfig.hlsUrls.length === 0
  ) {
    return (
      <div className="g-background">
        <div className="g-cameras-panel">
          <h2>Panel de Cámaras</h2>
          <p>Este vehículo no tiene cámaras configuradas.</p>
        </div>
      </div>
    );
  }

  const channels = videoConfig.videoChannels || [];
  const urls = videoConfig.hlsUrls || [];

  // Construimos tantos slots como canales existan
  const cameras = channels.map((channelNumber, idx) => ({
    name: `Cámara ${channelNumber}`,
    url: urls[idx] ?? null,
  }));

  return (
    <div className="g-background">
      <div className="g-cameras-panel">
        <h2>
          Panel de Cámaras – {videoConfig.licensePlate}{" "}
          {videoConfig.dvrPhone && (
            <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>
              ({videoConfig.dvrPhone})
            </span>
          )}
        </h2>

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
