import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";

import { addMarker, useCreateMap, useShowMapAfterDelay } from "./mapHooks";
import { fromLonLat, toLonLat } from "ol/proj";

// Posición inicial del mapa
const position = [-76.95769789314294, -12.036776926858456];

export function MapaBase({ buses, rutas }) {
  const [map, setMap] = useState(null);
  // Referencia al elemento del mapa
  const mapRef = useRef(null);

  // Estado para controlar quw se  muestre el mapa después de un retraso
  const showMap = useShowMapAfterDelay(20);
 
  // Función para crear el mapa utilizando el hook personalizado
  const createMap = useCreateMap(mapRef, position, setMap);

  useEffect(() => {
    if (showMap && mapRef.current) {
      createMap();
    }
  }, [showMap, createMap]);


  useEffect(() => {
    if (map && buses) {
      if (Array.isArray(buses)) {
        buses.forEach((bus) => {
          const busPosition = [bus.longitude, bus.latitude];
          addMarker(map, busPosition, "busesIcono",bus.imei);
        });
      } else {
        const busPosition = [buses.longitude, buses.latitude];
        addMarker(map, busPosition, "busesIcono",buses.imei);
      }
    }
  }, [map, buses]);

  useEffect(() => {
    if (map && rutas) {
      rutas.forEach((ruta) => {
        const busPosition = [ruta.paraderosModel.longitud, ruta.paraderosModel.latitud];
        addMarker(map, busPosition, "paradero",ruta.paraderosModel.nombre);
      });
    }
  }, [map, rutas]);

  

  return <>{showMap && <div ref={mapRef} className="g-mapa" />}</>;
}