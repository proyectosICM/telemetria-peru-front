// MainPanel.jsx
import React, { useEffect, useState } from "react";
import { FaLayerGroup, FaMapMarkedAlt, FaVideo, FaBus } from "react-icons/fa";
import { Button, ButtonGroup, Container, Row, Col, Offcanvas } from "react-bootstrap";
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

  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [view, setView] = useState("map");
  const [showSidebar, setShowSidebar] = useState(false); // 👈 nuevo

  const topic = `${mqttTopics.mapa}${companyId}`;
  const { messages } = useMqtt(mqttDominio, topic);
  const buses = useMqttMapHandler(messages); // si quisieras usar los de MQTT

  const [initialPosition, setInitialPosition] = useState([
    -76.95769789314294,
    -12.036776926858456,
  ]);

  const handleSelectVehicle = (id) => {
    localStorage.setItem("selectedVehicleId", id);
    setSelectedVehicleId(id);
    // en móvil cierro el menú al elegir
    setShowSidebar(false);
  };

  useEffect(() => {
    if (selectedVehicleId && Array.isArray(dataBus)) {
      const vehicleSnapshot = dataBus.find(
        (item) => item.vehicleModel?.id === selectedVehicleId
      );
      if (vehicleSnapshot) {
        const longitude = parseFloat(vehicleSnapshot.snapshotLongitude);
        const latitude = parseFloat(vehicleSnapshot.snapshotLatitude);
        if (!isNaN(longitude) && !isNaN(latitude)) {
          setInitialPosition([longitude, latitude]);
        } else {
          console.warn("Coordenadas inválidas para el vehículo seleccionado");
        }
      } else {
        console.log(
          "No se encontró snapshot para el vehículo:",
          selectedVehicleId
        );
      }
    }
  }, [selectedVehicleId, dataBus]);

  return (
    <div className="g-background">
      <NavbarCommon />

      <div className="main-panel-container">
        {/* 🟦 Sidebar que en desktop es fijo y en móvil es Offcanvas */}
        <Offcanvas
          show={showSidebar}
          onHide={() => setShowSidebar(false)}
          responsive="lg"
          placement="start"
          className="main-sidebar-offcanvas"
        >
          <Offcanvas.Header closeButton className="d-lg-none">
            <Offcanvas.Title>Unidades</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <VehicleMenuPanel onSelectVehicle={handleSelectVehicle} />
          </Offcanvas.Body>
        </Offcanvas>

        {/* 🟦 Contenido principal */}
        <Container fluid className="main-content">
          {/* Fila superior: botón para abrir menú (solo móvil) + botones de vista */}
          <Row className="align-items-center mb-2">
            <Col xs="auto" className="d-lg-none">
              <Button
                variant="dark"
                size="sm"
                onClick={() => setShowSidebar(true)}
              >
                <FaBus style={{ marginRight: 6 }} />
                Unidades
              </Button>
            </Col>

            <Col xs={12} lg="auto" className="mt-2 mt-lg-0">
              <ButtonGroup className="w-100 w-lg-auto">
                <Button
                  className={`button-bordered ${
                    view === "camera" ? "active" : ""
                  }`}
                  onClick={() => setView("camera")}
                >
                  <FaVideo style={{ marginRight: "6px" }} />
                  Vista cámaras
                </Button>
                <Button
                  className={`button-bordered ${
                    view === "mixed" ? "active" : ""
                  }`}
                  onClick={() => setView("mixed")}
                >
                  <FaLayerGroup style={{ marginRight: "6px" }} />
                  Vista mixta
                </Button>
                <Button
                  className={`button-bordered ${
                    view === "map" ? "active" : ""
                  }`}
                  onClick={() => setView("map")}
                >
                  <FaMapMarkedAlt style={{ marginRight: "6px" }} />
                  Vista mapa
                </Button>
              </ButtonGroup>
            </Col>
          </Row>

          {/* Fila mapa / cámaras */}
          <Row>
            <Col xs={12}>
              <div
                className={`main-map-container ${
                  view === "mixed" ? "mixed-view" : ""
                }`}
              >
                {view === "map" && (
                  <MapaBase
                    buses={dataBus}
                    initialPosition={initialPosition}
                    onMarkerClick={handleSelectVehicle} // 👈 clic marker = seleccionar
                  />
                )}

                {view === "camera" &&
                  (selectedVehicleId ? (
                    <div className="camera-view-panel">
                      <CamerasPanel vehicleId={selectedVehicleId} />
                    </div>
                  ) : (
                    <div className="main-no-vehicle-selected">
                      <h1>
                        Por favor, seleccione un vehículo para ver las cámaras.
                      </h1>
                    </div>
                  ))}

                {view === "mixed" && (
                  <>
                    <div className="half-panel left-panel">
                      {selectedVehicleId ? (
                        <CamerasPanel vehicleId={selectedVehicleId} />
                      ) : (
                        <div className="main-no-vehicle-selected">
                          <h1>
                            Por favor, seleccione un vehículo para ver las
                            cámaras.
                          </h1>
                        </div>
                      )}
                    </div>
                    <div className="half-panel right-panel">
                      <MapaBase
                        buses={dataBus}
                        initialPosition={initialPosition}
                        onMarkerClick={handleSelectVehicle} // 👈 también aquí
                      />
                    </div>
                  </>
                )}
              </div>
            </Col>
          </Row>

          {/* Fila inferior: panel de opciones o KPI */}
          <Row className="mt-3 mb-3">
            <Col xs={12}>
              {selectedVehicleId ? (
                <div className="main-options-panel">
                  <h3 className="main-options-title">Panel de opciones</h3>
                  <div className="main-options-panel-content">
                    <VehicleInfo />
                    <VehicleOptions />
                    <FuelInfo />
                    <BatteryInfo />
                    <ImpactIncidentLogging />
                    {/* <ChecklistInfo /> */}
                    {/* <IgnitionInfo /> */}
                    {/* <AlarmInfo /> */}
                    {/* <TireInfo /> */}
                    {/* <TireInfoData /> */}
                  </div>
                </div>
              ) : (
                <div className="main-no-vehicle-selected">
                  <FleetKpiPanel dataBus={dataBus} />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
