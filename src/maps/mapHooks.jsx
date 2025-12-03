// src/maps/mapHooks.js
import { useEffect, useState } from "react";
import { Feature } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Point } from "ol/geom";
import { Fill, Stroke, Style, Text } from "ol/style";
import CircleStyle from "ol/style/Circle";
import Overlay from "ol/Overlay";
import { fromLonLat } from "ol/proj";
import { FaBus } from "react-icons/fa";

/**
 * Hook para mostrar el mapa después de un delay (ms)
 * (si quieres, lo puedes dejar de usar)
 */
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

/**
 * Función para agregar / actualizar marcadores
 */
export const addMarker = (
  map,
  speed,
  ignition,
  position,
  image,
  title,
  infoHTML
) => {
  if (!map) return;

  let existingMarker;
  map.getLayers().forEach((layer) => {
    if (layer.getSource && layer.getSource() instanceof VectorSource) {
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

  const getColorByIgnition = (ignitionValue) => {
    if (ignitionValue === false) return "#808080";
    if (ignitionValue === true) return "#00FF00";
    return "#000000";
  };

  if (existingMarker) {
    existingMarker.getGeometry().setCoordinates(fromLonLat(position));

    existingMarker.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 15,
          fill: new Fill({ color: getColorByIgnition(ignition) }),
          stroke: new Stroke({ color: "#ffffff", width: 2 }),
        }),
        text: new Text({
          text: `Placa: ${title}\nVelocidad: ${speed} km/h`,
          offsetY: -25,
          textAlign: "center",
          fill: new Fill({ color: "#000" }),
          font: "bold 15px Arial, sans-serif",
          backgroundFill: new Fill({
            color: "rgba(255,255,255,0.5)",
          }),
        }),
      })
    );

    return;
  }

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
        fill: new Fill({ color: getColorByIgnition(ignition) }),
        stroke: new Stroke({ color: "#ffffff", width: 2 }),
      }),
      text: new Text({
        text: `Placa: ${title}\nVelocidad: ${speed} km/h`,
        offsetY: -25,
        textAlign: "center",
        fill: new Fill({ color: "#000" }),
        font: "bold 15px Arial, sans-serif",
        backgroundFill: new Fill({
          color: "rgba(255,255,255,0.5)",
        }),
      }),
    }),
  });

  map.addLayer(vectorLayer);

  // Overlay opcional (lo dejo tal como lo tenías)
  const overlayContainer = document.createElement("div");
  overlayContainer.style.position = "absolute";
  overlayContainer.style.backgroundColor = "white";
  overlayContainer.style.padding = "5px";
  overlayContainer.style.border = "1px solid #ccc";
  overlayContainer.style.width = "300px";

  if (typeof infoHTML === "object" && infoHTML !== null) {
    const children = infoHTML.props.children;

    if (Array.isArray(children)) {
      overlayContainer.innerHTML = children
        .map((child) => {
          if (child.type === "p") {
            return `<p>${child.props.children}</p>`;
          } else if (child.type === FaBus) {
            return `<div style="display: flex; align-items: center;">
                    <div style="margin-right: 10px; color: #555;">
                      <svg style="width:24px; height:24px;" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path d="M20 6V18a2 2 0 01-2 2H6a2 2 0 01-2-2V6H2"></path>
                        <path d="M4 10h16"></path>
                        <path d="M7 6V4a2 2 0 012-2h6a2 2 0 012 2v2"></path>
                      </svg>
                    </div>
                  </div>`;
          }
          return "";
        })
        .join("");
    }
  } else {
    overlayContainer.innerHTML = infoHTML;
  }

  const overlay = new Overlay({
    element: overlayContainer,
    position: fromLonLat(position),
    positioning: "bottom-center",
  });

  // map.addOverlay(overlay); // si quieres usarlo
};
