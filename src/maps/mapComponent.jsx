import React, { useEffect, useRef, useState } from "react";

import { addMarker, useCreateMap, useShowMapAfterDelay } from "./mapHooks";
const position = [-76.95769789314294, -12.036776926858456];
export function MapComponent({ buses, rutas }) {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);

  const showMap = useShowMapAfterDelay(20);

  const createMap = useCreateMap(mapRef, position, setMap);

  useEffect(() => {
    if (map && buses) {
      if (Array.isArray(buses)) {
        buses.forEach((bus) => {
          const busPosition = [bus.longitude, bus.latitude];
          addMarker(map, busPosition, "busesIcono", bus.licensePlate);
        });
      } else {
        const busPosition = [buses.longitude, buses.latitude];
        addMarker(map, busPosition, "busesIcono", buses.licensePlate);
      }
    }
  }, [map, buses]);

  useEffect(() => {
    if (map && rutas) {
      rutas.forEach((ruta) => {
        const busPosition = [ruta.paraderosModel.longitud, ruta.paraderosModel.latitud];
        addMarker(map, busPosition, "paradero", ruta.paraderosModel.nombre);
      });
    }
  }, [map, rutas]);

  return <>{showMap && <div ref={mapRef} className="g-mapa" />}</>;
}
