import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import { addMarker, useShowMapAfterDelay } from "./mapHooks";
import { useCreateMap } from "./useCreateMap";
import { FaBus } from "react-icons/fa";
import ReactDOM from 'react-dom';

export function MapaBase({ buses, rutas, initialPosition }) {
  const mapRef = useRef(null);
  const showMap = useShowMapAfterDelay(20);
  const map = useCreateMap(mapRef.current, initialPosition); // Crear mapa usando el hook

  // Añadir marcadores para los buses

  <div style={{border:"2px solid red"}}><p>Detalles del bus</p><p>Ubicación: Lima, Perú</p></div>

  useEffect(() => {
    if (map && buses) {
      buses.forEach((bus) => {
        const busPosition = [bus.longitude, bus.latitude];
        const infoHTML = (
          <div>

            <p>Detalles del bus</p>
            {ReactDOM.createPortal(
              <FaBus size={24} style={{ marginRight: '10px', color: '#555' }} />,
              document.createElement('div')
            )}
            <p>Ubicación: Lima, Perú</p>
          </div>
        );

        {/* '<p>Detalles del bus</p><p>Ubicación: Lima, Perú</p>' */}
        addMarker(map, busPosition, "busesIcono", bus.licensePlate );
      });
    }
  }, [map, buses]);

  // Añadir marcadores para las rutas
  useEffect(() => {
    if (map && rutas) {
      rutas.forEach((ruta) => {
        const stopPosition = [ruta.paraderosModel.longitud, ruta.paraderosModel.latitud];
        addMarker(map, stopPosition, "paradero", ruta.paraderosModel.nombre, '<p>Detalles del bus</p><p>Ubicación: Lima, Perú</p>');
      });
    }
  }, [map, rutas]);

  return <>{showMap && <div ref={mapRef} className="g-mapa" />}</>;
}
