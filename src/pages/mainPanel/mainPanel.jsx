import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { MapaBase } from "../../maps/mapaBase";
import { VehicleMenuPanel } from "../../common/vehicleMenuPanel";
import { VehicleInfo } from "./optionsPanel/vehicleInfo";
import { VehicleOptions } from "./optionsPanel/vehicleOptions";
import { LogoutToken } from "../../hooks/logoutToken";
import { BatteryInfo } from "../../realTime/batteryInfo";
import { ImpactIncidentLogging } from "../optionsPanel/impactIncidentLogging";
import { ChecklistInfo } from "./optionsPanel/checklistInfo";
import { mqttDominio, mqttTopics } from "../../mqtt/mqttConfig";
import useMqtt from "../../hooks/useMqtt";
import useMqttMapHandler from "../../mqtt/mqttMapHandler";
import { FuelInfo } from "../../realTime/fuelInfo";
import { AlarmInfo } from "../../realTime/alarmInfo";
import { IgnitionInfo } from "../../realTime/ignitionInfo";
import { TireInfo } from "../../realTime/tireSensorInfo";
import { TireInfoData } from "../../realTime/tireSensorInfoData";
import { CamerasPanel } from "../camerasPanel";

import "./mainPanel.css";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaLayerGroup, FaMapMarkedAlt, FaVideo } from "react-icons/fa";

export function MainPanel() {
  LogoutToken();

  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [view, setView] = useState("map"); // 👈 mapa por defecto

  const companyId = localStorage.getItem("tp_companyId");
  const topic = `${mqttTopics.mapa}${companyId}`;
  const { messages } = useMqtt(mqttDominio, topic);
  const buses = useMqttMapHandler(messages);

  const handleSelectVehicle = (id) => {
    localStorage.setItem("selectedVehicleId", id);
    setSelectedVehicleId(id);
  };

  const [initialPosition, setInitialPosition] = useState([-76.95769789314294, -12.036776926858456]);

  useEffect(() => {
    if (selectedVehicleId && Array.isArray(buses)) {
      const vehicleMessages = buses.filter((bus) => bus.vehicleId === selectedVehicleId);
      if (vehicleMessages.length > 0) {
        const recentMessage = vehicleMessages.sort((a, b) => b.timestamp - a.timestamp)[0];
        if (recentMessage) {
          const { longitude, latitude } = recentMessage;
          setInitialPosition([longitude, latitude]);
        }
      } else {
        console.log("No messages found for selected vehicle ID:", selectedVehicleId);
      }
    }
  }, [selectedVehicleId, buses]);

  return (
    <div className="g-background">
      <NavbarCommon />

      <div className="main-panel-container">
        <div className="main-sidebar">
          <VehicleMenuPanel onSelectVehicle={handleSelectVehicle} />
        </div>

        <div className="main-content">
          {/* Botones para cambiar de vista */}
          <ButtonGroup>
            <Button className={`button-bordered ${view === "camera" ? "active" : ""}`} onClick={() => setView("camera")}>
              <FaVideo style={{ marginRight: "6px" }} />
              Vista cámaras
            </Button>
            <Button className={`button-bordered ${view === "mixed" ? "active" : ""}`} onClick={() => setView("mixed")}>
              <FaLayerGroup style={{ marginRight: "6px" }} />
              Vista mixta
            </Button>
            <Button className={`button-bordered ${view === "map" ? "active" : ""}`} onClick={() => setView("map")}>
              <FaMapMarkedAlt style={{ marginRight: "6px" }} />
              Vista mapa
            </Button>
          </ButtonGroup>
          {/* Renderizado condicional de vistas */}
          <div className={`main-map-container ${view === "mixed" ? "mixed-view" : ""}`}>
            {view === "map" && <MapaBase buses={buses} initialPosition={initialPosition} />}
            {view === "camera" &&
              (selectedVehicleId ? (
                <div className="camera-view-panel">
                  <CamerasPanel />
                </div>
              ) : (
                <div className="main-no-vehicle-selected">
                  <h1>Por favor, seleccione un vehículo para ver la vista mixta.</h1>
                </div>
              ))}
            {view === "mixed" && (
              <>
                <div className="half-panel left-panel">
                  {selectedVehicleId ? (
                    <CamerasPanel />
                  ) : (
                    <div className="main-no-vehicle-selected">
                      <h1>Por favor, seleccione un vehículo para ver las cámaras.</h1>
                    </div>
                  )}
                </div>
                <div className="half-panel right-panel">
                  <MapaBase buses={buses} initialPosition={initialPosition} />
                </div>
              </>
            )}
          </div>

          {/* Panel de opciones solo si hay vehículo seleccionado */}
          {selectedVehicleId ? (
            <div className="main-options-panel">
              <h3>Options Panel</h3>
              <div className="main-options-panel-content">
                <VehicleInfo />
                <VehicleOptions />
                <IgnitionInfo />
                <AlarmInfo />
                <ChecklistInfo />
              </div>

              <div className="main-options-panel-content">
                <FuelInfo />
                <BatteryInfo />
                <ImpactIncidentLogging />
                <TireInfo />
                <TireInfoData />
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
