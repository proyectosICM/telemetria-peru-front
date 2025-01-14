import { useEffect, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

export function useCreateMap(mapContainer, initialPosition) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapContainer && !map) {
      const view = new View({
        center: fromLonLat(initialPosition),
        zoom: 15,
      });

      const createdMap = new Map({
        target: mapContainer,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view,
      });

      setMap(createdMap);
    }
  }, [mapContainer, map]);

  // Actualizar la vista cuando cambie `initialPosition`
  useEffect(() => {
    if (map && initialPosition) {
      const view = map.getView();
      view.setCenter(fromLonLat(initialPosition));
    }
  }, [map, initialPosition]);

  return map;
}
