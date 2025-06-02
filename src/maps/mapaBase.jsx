import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import { addMarker, useShowMapAfterDelay } from "./mapHooks";
import { useCreateMap } from "./useCreateMap";
import { FaBus } from "react-icons/fa";
import ReactDOM from "react-dom";
 
export function MapaBase({ buses, rutas, initialPosition }) {
  const mapRef = useRef(null);
  const showMap = useShowMapAfterDelay(20);
  const map = useCreateMap(mapRef.current, initialPosition); // Crear mapa usando el hook
  //console.log("MapaBase renderizado");
  //console.log(buses);
  // Añadir marcadores para los buses

  useEffect(() => {
    if (map && buses) {
      buses.forEach((bus) => {
        const busPosition = [bus.longitude, bus.latitude];
        const speed = bus.speed;
        const ignition = bus.ignitionInfo;
        
        const infoHTML = (
          <div>
            <p>Detalles del vehiculo</p>
            <p style={{ marginLeft: '10px' }}>Placa</p>
            <p style={{ marginLeft: '10px' }}>{bus.licensePlate}</p>
            {ReactDOM.createPortal(<FaBus size={24} style={{ marginRight: "10px", color: "#555" }} />, document.createElement("div"))}
          </div>
        );
        addMarker(map, speed, ignition, busPosition, "busesIcono", bus.licensePlate, infoHTML);
      });
    }
  }, [map, buses]);

  // Añadir marcadores para las rutas
  useEffect(() => {
    if (map && rutas) {
      rutas.forEach((ruta) => {
        const stopPosition = [ruta.paraderosModel.longitud, ruta.paraderosModel.latitud];
        const speed = 0;
        addMarker(map, speed, stopPosition, "paradero", ruta.paraderosModel.nombre, "<p>Detalles del bus</p><p>Ubicación: Lima, Perú</p>");
      });
    }
  }, [map, rutas]);

  return <>{showMap && <div ref={mapRef} className="g-mapa" />}</>;
}
