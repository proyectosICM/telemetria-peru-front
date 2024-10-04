import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../common/navbarCommon";
import { MapaBase } from "../maps/mapaBase";
import { VehicleMenuPanel } from "../common/vehicleMenuPanel";
import { GasInfo } from "./optionsPanel/gasInfo";
import { TireInfo } from "./optionsPanel/tireSensorInfo";
import { VehicleInfo } from "./optionsPanel/vehicleInfo";
import { VehicleOptions } from "./optionsPanel/vehicleOptions";
import "./mainPanel.css";
import { LogoutToken } from "../hooks/logoutToken";
import { BatteryInfo } from "./optionsPanel/batteryInfo";
import { TireInfoData } from "./optionsPanel/tireSensorInfoData";
import { ImpactIncidentLogging } from "./optionsPanel/impactIncidentLogging";
import useMqtt from "../hooks/useMqtt";
import { mqttDominio, mqttTopics } from "../api/apiurls";
import { ChecklistInfo } from "./optionsPanel/checklistInfo";

export function MainPanel() {
  LogoutToken();

  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [buses, setBuses] = useState([]);

  const handleSelectVehicle = (id) => {
    localStorage.setItem("selectedVehicleId", id);
    setSelectedVehicleId(id);
  };

  const topic = `prueba`;
  const { messages } = useMqtt(mqttDominio, topic);

  // Manejar los mensajes recibidos
  useEffect(() => {
    if (messages && messages.length > 0) {
      messages.forEach((message) => {
        try {
          // Intentar parsear el mensaje como JSON
          console.log(message);
          const jsonString = message.match(/{.*}/); // Extraer solo el JSON del mensaje
          if (!jsonString) {
            console.error("El mensaje no contiene un JSON válido:", message);
            return;
          }

          const data = JSON.parse(jsonString[0]);

          const { imei, longitude, latitude } = data;

          // Verificar si el mensaje tiene los campos esperados
          if (imei && longitude && latitude) {
            setBuses((prevBuses) => {
              const busIndex = prevBuses.findIndex((bus) => bus.imei === imei);

              if (busIndex !== -1) {
                // Actualizar la longitud y latitud del bus si el IMEI ya existe
                const updatedBuses = [...prevBuses];
                updatedBuses[busIndex] = {
                  ...updatedBuses[busIndex],
                  longitude,
                  latitude,
                };
                return updatedBuses;
              } else {
                // Si no existe, agregar un nuevo bus
                return [...prevBuses, { imei, longitude, latitude }];
              }
            });
          }
        } catch (error) {
          console.error("Error al procesar el mensaje JSON:", error);
        }
      });
    }
  }, [messages]);

  return (
    <div className="g-background">
      <NavbarCommon />

      <div className="main-panel-container">
        <div className="main-sidebar">
          <VehicleMenuPanel onSelectVehicle={handleSelectVehicle} />
        </div>

        <div className="main-content">
          <div className="main-map-container">
            <MapaBase buses={buses} />
          </div>

          {selectedVehicleId ? (
            <div className="main-options-panel">
              <h3>Options Panel</h3>
              <div className="main-options-panel-content">
                <VehicleInfo />
                <ChecklistInfo />
                <VehicleOptions />
                <GasInfo />
              </div>

              <div className="main-options-panel-content">
                <BatteryInfo />
                <TireInfo />
                <TireInfoData />
                <ImpactIncidentLogging />
              </div>
            </div>
          ) : (
            <div className="main-no-vehicle-selected">
              <h1>Por favor, seleccione un vehículo para ver las opciones.</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
