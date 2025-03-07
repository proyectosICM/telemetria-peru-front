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
import Overlay from "ol/Overlay";
import { FaBus } from "react-icons/fa";

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

export const addMarker = (map, speed, position, image, title, infoHTML) => {
  console.log(infoHTML);
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
  if (image === "busesIcono") {
    markerImageSrc = require("../images/busesIcono.webp");
  } else if (image === "paradero") {
    markerImageSrc = require("../images/paradero.png");
  } else {
    markerImageSrc = require("../images/masIcono.png");
  }

  const getColorBySpeed = (speed) => {
    if (speed === 0) return "#808080"; // Gris (detenido)
    if (speed > 30) return "#FF0000"; // Rojo (más de 30 km/h)
    return "#00FF00"; // Verde (en movimiento, pero <= 30 km/h)
  };


  // Si existe un marcador con el mismo título, actualizar su posición
  if (existingMarker) {
    existingMarker.getGeometry().setCoordinates(fromLonLat(position));

    existingMarker.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 15,
          fill: new Fill({ color: getColorBySpeed(speed) }), // Cambia el color según la velocidad
          stroke: new Stroke({ color: "#ffffff", width: 2 }),
        }),
        text: new Text({
          text: `Placa: ${title}\nVelocidad: ${speed} km/h `,
          offsetY: -25,
          textAlign: "center",
          fill: new Fill({ color: "#000" }),
          font: "bold 15px Arial, sans-serif",
          backgroundFill: new Fill({ color: "rgba(255,255,255,0.5)" }),
        }),
      })
    );

    return; // Salir de la función, no añadir un nuevo marcador
  }

  // Si no existe un marcador con el mismo título, añadir uno nuevo
  const marker = new Feature({
    geometry: new Point(fromLonLat(position)),
  });

  marker.set("title", title);
  marker.set("speed", speed);

  const vectorSource = new VectorSource({
    features: [marker],
  });


  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: new Style({
      image: new CircleStyle({
        radius: 15,
        fill: new Fill({ color: getColorBySpeed(speed) }),
        stroke: new Stroke({ color: "#ffffff", width: 2 }),
      }),
      text: new Text({
        text: `Placa: ${title}\nVelocidad: ${speed} km/h `,
        offsetY: -25,
        textAlign: "center",
        fill: new Fill({ color: "#000" }),
        font: "bold 15px Arial, sans-serif",
        backgroundFill: new Fill({ color: "rgba(255,255,255,0.5)" }),
      }),
    }),
  });

  map.addLayer(vectorLayer);

  // Crear overlay HTML
  const overlayContainer = document.createElement("div");
  overlayContainer.style.position = "absolute";
  overlayContainer.style.backgroundColor = "white";
  overlayContainer.style.padding = "5px";
  overlayContainer.style.border = "1px solid #ccc";
  overlayContainer.style.width = "300px";

  // Verificar si infoHTML es un objeto React
  if (typeof infoHTML === "object" && infoHTML !== null) {
    const children = infoHTML.props.children;

    if (Array.isArray(children)) {
      overlayContainer.innerHTML = children
        .map((child) => {
          if (child.type === "p") {
            return `<p>${child.props.children}</p>`;
          } else if (child.type === FaBus) {
            // Si es el icono FaBus
            return `<div style="display: flex; align-items: center;">
                    <div style="margin-right: 10px; color: #555;">
                      <svg style="width:24px; height:24px;" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path d="M20 6V18a2 2 0 01-2 2H6a2 2 0 01-2-2V6H2"></path>
                        <path d="M4 10h16"></path>
                        <path d="M7 6V4a2 2 0 012-2h6a2 2 0 012 2v2"></path>
                      </svg>
                    </div>
                    ${child.props.children}
                  </div>`;
          }
        })
        .join("");
    }
  } else {
    overlayContainer.innerHTML = infoHTML; // Si ya es un string puro
  }

  const overlay = new Overlay({
    element: overlayContainer,
    position: fromLonLat(position),
    positioning: "bottom-center",
  });

  // map.addOverlay(overlay);

  // Agregar evento de clic al marcador
  vectorSource.on("featureclick", (evt) => {
    const clickedFeature = evt.feature;
    if (clickedFeature) {
      overlay.setPosition(fromLonLat(position)); // Muestra el panel junto al marcador
    }
  });
};
