// src/maps/mapaBase.jsx
import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";
import { fromLonLat } from "ol/proj";
import { addMarker } from "./mapHooks";
import { FaBus } from "react-icons/fa";
import ReactDOM from "react-dom";

export function MapaBase({ buses, rutas, initialPosition }) {
  const mapRef = useRef(null);          // div del mapa
  const mapInstanceRef = useRef(null);  // instancia de OpenLayers

  const formatCoordinate = (value) =>
    Number.parseFloat(value).toFixed(7);

  // Crear el mapa UNA sola vez
  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
              attributions: "© Google Maps",
            }),
          }),
        ],
        view: new View({
          center: fromLonLat(initialPosition || [-76.95, -12.03]),
          zoom: 15,
        }),
      });

      mapInstanceRef.current = map;
      // console.log("Mapa creado", map);
    }
  }, []); // solo una vez al montar

  // Recentrar cuando cambie initialPosition
  useEffect(() => {
    if (mapInstanceRef.current && initialPosition) {
      try {
        mapInstanceRef.current
          .getView()
          .setCenter(fromLonLat(initialPosition));
      } catch (e) {
        console.warn("Error recentrando mapa:", e);
      }
    }
  }, [initialPosition]);

  // Marcadores de buses
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !buses || !Array.isArray(buses)) return;

    buses.forEach((bus) => {
      if (
        bus.snapshotLongitude == null ||
        bus.snapshotLatitude == null ||
        !bus.vehicleModel
      ) {
        return;
      }

      const busPosition = [
        Number(formatCoordinate(bus.snapshotLongitude)),
        Number(formatCoordinate(bus.snapshotLatitude)),
      ];
      const speed = bus.snapshotSpeed ?? 0;
      const ignition = bus.snapshotIgnitionStatus;
      const licensePlate = bus.vehicleModel.licensePlate;

      const infoHTML = (
        <div>
          <p>Detalles del vehículo</p>
          <p style={{ marginLeft: "10px" }}>Placa</p>
          <p style={{ marginLeft: "10px" }}>{licensePlate}</p>
          {ReactDOM.createPortal(
            <FaBus
              size={24}
              style={{ marginRight: "10px", color: "#555" }}
            />,
            document.createElement("div")
          )}
        </div>
      );

      addMarker(
        map,
        speed,
        ignition,
        busPosition,
        "busesIcono",
        licensePlate,
        infoHTML
      );
    });
  }, [buses]);

  // Marcadores de rutas/paraderos (si los usas)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !rutas || !Array.isArray(rutas)) return;

    rutas.forEach((ruta) => {
      if (!ruta.paraderosModel) return;

      const stopPosition = [
        Number(formatCoordinate(ruta.paraderosModel.longitud)),
        Number(formatCoordinate(ruta.paraderosModel.latitud)),
      ];
      const speed = 0;

      addMarker(
        map,
        speed,
        null,
        stopPosition,
        "paradero",
        ruta.paraderosModel.nombre,
        "<p>Detalles del bus</p><p>Ubicación: Lima, Perú</p>"
      );
    });
  }, [rutas]);

  // Render simple: inline style para asegurar altura
  return (
    <div
      ref={mapRef}
      className="g-mapa"
      style={{
        width: "100%",
        height: "70vh", // fuerza altura visible
        borderRadius: "8px",
        overflow: "hidden",
      }}
    />
  );
}
