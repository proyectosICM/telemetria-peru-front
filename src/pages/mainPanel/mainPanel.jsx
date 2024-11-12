import React, { useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { MapaBase } from "../../maps/mapaBase";
import { VehicleMenuPanel } from "../../common/vehicleMenuPanel";

import { TireInfo } from "../optionsPanel/tireSensorInfo";
import { VehicleInfo } from "./optionsPanel/vehicleInfo";
import { VehicleOptions } from "./optionsPanel/vehicleOptions";
import { LogoutToken } from "../../hooks/logoutToken";
import { BatteryInfo } from "../optionsPanel/batteryInfo";
import { TireInfoData } from "../optionsPanel/tireSensorInfoData";
import { ImpactIncidentLogging } from "../optionsPanel/impactIncidentLogging";
import { ChecklistInfo } from "./optionsPanel/checklistInfo";
import { mqttDominio, mqttTopics } from "../../mqtt/mqttConfig";
import useMqtt from "../../hooks/useMqtt";
import useMqttMapHandler from "../../mqtt/mqttMapHandler";
import "./mainPanel.css";
import { FuelInfo } from "./optionsPanel/fuelInfo";

export function MainPanel() {
  LogoutToken();

  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const companyId = localStorage.getItem("companyId");
  const topic = `${mqttTopics.mapa}${companyId}`;
  console.log(topic);
  const { messages } = useMqtt(mqttDominio, topic);
  const buses = useMqttMapHandler(messages);
  //console.log(buses)

  const handleSelectVehicle = (id) => {
    localStorage.setItem("selectedVehicleId", id);
    setSelectedVehicleId(id);
  };

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
                <FuelInfo />
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
