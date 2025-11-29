import React, { useEffect, useState } from "react";
import { FaLayerGroup, FaMapMarkedAlt, FaVideo } from "react-icons/fa";
import { Button, ButtonGroup } from "react-bootstrap";
import useMqtt from "../../hooks/useMqtt";
import useMqttMapHandler from "../../mqtt/mqttMapHandler";
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
import { FuelInfo } from "../../realTime/fuelInfo";
import { AlarmInfo } from "../../realTime/alarmInfo";
import { IgnitionInfo } from "../../realTime/ignitionInfo";
import { TireInfo } from "../../realTime/tireSensorInfo";
import { TireInfoData } from "../../realTime/tireSensorInfoData";
import { CamerasPanel } from "../camerasPanel";
import "./mainPanel.css";
import { useGetByCompanyId } from "../../api/hooks/useVehicleSnapshots";
import { FleetKpiPanel } from "../../common/FleetKpiPanel";

export function MainPanel() {
  LogoutToken();
  const companyId = localStorage.getItem("tp_companyId");
  const { data: dataBus, isLoading, error } = useGetByCompanyId(companyId);

  console.log(dataBus);

  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [view, setView] = useState("map");

  const topic = `${mqttTopics.mapa}${companyId}`;
  const { messages } = useMqtt(mqttDominio, topic);
  const buses = useMqttMapHandler(messages);

  const handleSelectVehicle = (id) => {
    localStorage.setItem("selectedVehicleId", id);
    setSelectedVehicleId(id);
  };

  const [initialPosition, setInitialPosition] = useState([-76.95769789314294, -12.036776926858456]);

  useEffect(() => {
    if (selectedVehicleId && Array.isArray(dataBus)) {
      const vehicleSnapshot = dataBus.find((item) => item.vehicleModel?.id === selectedVehicleId);
      if (vehicleSnapshot) {
        const longitude = parseFloat(vehicleSnapshot.snapshotLongitude);
        const latitude = parseFloat(vehicleSnapshot.snapshotLatitude);
        if (!isNaN(longitude) && !isNaN(latitude)) {
          setInitialPosition([longitude, latitude]);
        } else {
          console.warn("Coordenadas inválidas para el vehículo seleccionado");
        }
      } else {
        console.log("No se encontró snapshot para el vehículo:", selectedVehicleId);
      }
    }
  }, [selectedVehicleId, dataBus]);

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
            {view === "map" && <MapaBase buses={dataBus} initialPosition={initialPosition} />}
            {view === "camera" &&
              (selectedVehicleId ? (
                <div className="camera-view-panel">
                  <CamerasPanel vehicleId={selectedVehicleId} />
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
                    <CamerasPanel vehicleId={selectedVehicleId} />
                  ) : (
                    <div className="main-no-vehicle-selected">
                      <h1>Por favor, seleccione un vehículo para ver las cámaras.</h1>
                    </div>
                  )}
                </div>
                <div className="half-panel right-panel">
                  <MapaBase buses={dataBus} initialPosition={initialPosition} />
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
                {/* <IgnitionInfo /> */}
                {/* <AlarmInfo /> */}
                {/* <ChecklistInfo /> */}


                <FuelInfo />
                <BatteryInfo />
                <ImpactIncidentLogging />
                {/* <ImpactIncidentLogging /> */}
                {/* <TireInfo /> */}
                {/* <TireInfoData /> */}
              </div>
            </div>
          ) : (
            <div className="main-no-vehicle-selected">
              <FleetKpiPanel dataBus={dataBus} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
