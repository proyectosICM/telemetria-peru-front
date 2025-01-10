import { Feature, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import { XYZ } from "ol/source";
import { useCallback, useEffect, useState } from "react";
import Map from "ol/Map";

import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Icon, Stroke, Style, Text } from "ol/style";
import { Point } from "ol/geom";
import CircleStyle from "ol/style/Circle";

export const useShowMapAfterDelay = (delay) => {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMap(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return showMap;
};

export const useCreateMap = (mapRef, position, setMap) => {
  const createMap = useCallback(() => {
    const initialMap = new Map({
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
        center: fromLonLat(position),
        zoom: 15,
      }),
    });

    setMap(initialMap);
  }, [mapRef, position, setMap]);

  return createMap;
};

export const addMarker = (map, position, image, title) => {
  // Buscar si ya existe un marcador con el mismo título
  let existingMarker;
  map.getLayers().forEach((layer) => {
    if (layer.getSource() instanceof VectorSource) {
      const features = layer.getSource().getFeatures();
      features.forEach((feature) => {
        if (feature.get("title") === title) {
          existingMarker = feature;
        }
      });
    }
  });

  let markerImageSrc;
  if (image === 'busesIcono') {
    markerImageSrc = require("../images/busesIcono.png");
  } else if (image === 'paradero') {
    markerImageSrc = require("../images/paradero.png");
  } else {
    markerImageSrc = require("../images/masIcono.png");
  }

  // Si existe un marcador con el mismo título, actualizar su posición
  if (existingMarker) {
    existingMarker.getGeometry().setCoordinates(fromLonLat(position));
    return; // Salir de la función, no añadir un nuevo marcador
  }

  // Si no existe un marcador con el mismo título, añadir uno nuevo
  const marker = new Feature({
    geometry: new Point(fromLonLat(position)),
  });

  marker.set("title", title);

  const vectorSource = new VectorSource({
    features: [marker],
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: new Style({
      image: new CircleStyle({
        radius: 20,
        fill: new Fill({ color: "#ff5722" }),
        stroke: new Stroke({ color: "#ffffff", width: 2 }),
      }),
      text: new Text({
        text: title,
        offsetY: -15,
        textAlign: "center",
        fill: new Fill({ color: "#000" }),
        font: "15px Arial, sans-serif",
        backgroundFill: new Fill({ color: "rgba(255,255,255,0.5)" }),
      }),
    }),
  });

  map.addLayer(vectorLayer);

  // Agregar evento de clic al marcador
  vectorSource.on('featureclick', (evt) => {
    const clickedFeature = evt.feature;
    if (clickedFeature) {
      alert(`Clicked on marker: ${clickedFeature.get("title")}`);
    }
  });
};

