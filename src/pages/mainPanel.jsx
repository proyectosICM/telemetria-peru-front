import React, { useState } from "react";
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
import { IssuesInfo } from "./optionsPanel/issuesInfo";
import { ImpactIncidentLogging } from "./optionsPanel/impactIncidentLogging";
import useMqtt from "../hooks/useMqtt";
import { mqttDominio, mqttTopics } from "../api/apiurls";

export function MainPanel() {
  LogoutToken();

  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const buses = [
    {
      placa: "ABC12223",
      longitud: -76.95769789314294,
      latitud: -12.036776926858456,
    },
    {
      placa: "DEF456",
      longitud: -76.96,
      latitud: -12.037,
    },
    { 
      placa: "GHI789",
      longitud: -76.955,
      latitud: -12.035,
    },
  ];

  const handleSelectVehicle = (id) => {
    localStorage.setItem("selectedVehicleId", id);
    setSelectedVehicleId(id);
  };

  const topic = `${mqttTopics.tmp_gasPressure}${selectedVehicleId}`;
  
  const { isConnected, messages, sendMessage } = useMqtt(mqttDominio, topic);
 
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
                <VehicleOptions />
                <GasInfo />
                <BatteryInfo />
              </div>

              <div className="main-options-panel-content">
                <TireInfo />
                <TireInfoData />
                <ImpactIncidentLogging />
                {/* <IssuesInfo /> */}
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
