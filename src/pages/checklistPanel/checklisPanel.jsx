import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { useNavigate } from "react-router-dom";
import { FaClipboardCheck, FaTruckLoading, FaTruckMoving, FaCheckSquare, FaEye } from "react-icons/fa";
import { Button, Table, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListItems, ListItemsPaginated } from "../../hooks/listItems";
import { checklistRecordsRoutes, vehicleRoutes } from "../../api/apiurls";
import { PaginacionUtils } from "../../utils/paginacionUtils";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../utils/formatUtils";

export function ChecklistPanel() {
  const navigate = useNavigate();

  const [vehicleData, setVehicleData] = useState([]);
  const [selectedChecklist, setSelectedChecklist] = useState("todos");
  const [pageNumber, setPageNumber] = useState(0);
  const [errorV, setErrorV] = useState(null);
 
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const { data, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(`${checklistRecordsRoutes.byVehiclePages}/${selectedVehicleId}`, pageNumber);

  useEffect(() => {
    ListItems(`${vehicleRoutes.base}/${selectedVehicleId}`, setVehicleData, setErrorV);
  }, [selectedVehicleId]);

  const cardStyle = {
    display: "inline-block",
    width: "200px",
    padding: "20px",
    margin: "10px",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    color: "#fff",
  };

  const iconStyle = { fontSize: "2em", marginBottom: "10px" };

  // Función para determinar qué checklist mostrar según el tipo de vehículo
  const renderChecklistCards = () => {
    if (vehicleData && vehicleData.vehicleTypeId) {
      const vehicleTypeId = vehicleData.vehicleTypeId;

      if (vehicleTypeId === 3 || vehicleTypeId === 4) {
        return (
          <>
            <div style={{ ...cardStyle, backgroundColor: "#28a745" }} onClick={() => navigate("/example/salida")}>
              <FaClipboardCheck style={iconStyle} />
              <p>Inspección diaria de unidades (salida)</p>
            </div>

            <div style={{ ...cardStyle, backgroundColor: "#ffc107" }} onClick={() => navigate("/example/retorno")}>
              <FaTruckMoving style={iconStyle} />
              <p>Inspección diaria de unidades (retorno)</p>
            </div>

            <div style={{ ...cardStyle, backgroundColor: "#17a2b8" }} onClick={() => navigate("/example2/retorno")}>
              <FaTruckLoading style={iconStyle} />
              <p>Inspección diaria de unidad MOTOFURGON (retorno)</p>
            </div>

            <div style={{ ...cardStyle, backgroundColor: "#007bff" }} onClick={() => navigate("/example2/salida")}>
              <FaCheckSquare style={iconStyle} />
              <p>Inspección diaria de unidades MOTOFURGON (salida)</p>
            </div>
          </>
        );
      } else if (vehicleTypeId === 1 || vehicleTypeId === 2) {
        return (
          <>
            <div style={{ ...cardStyle, backgroundColor: "#28a745" }} onClick={() => navigate(`/example3/${vehicleData.licensePlate}`)}>
              <FaClipboardCheck style={iconStyle} />
              <p>Nuevo registro</p>
            </div>
          </>
        );
      }
    }
    return null;
  };

  const vehicleTypeId = vehicleData?.vehicleTypeId;

  return (
    <div className="g-background">
      <NavbarCommon />
      <Button onClick={() => navigate("/")} className="back-button">
        Atras
      </Button>
      <div style={{ border: "2px solid #d1d0cc", margin: "5px 5%" }}>
        <h1>Checklist</h1>

        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>{renderChecklistCards()}</div>

        {vehicleTypeId !== 1 && vehicleTypeId !== 2 && (
          <>
            <h1>Registros</h1>
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
              <label htmlFor="checklistSelect" style={{ marginRight: "10px" }}>
                Seleccionar tipo de checklist:
              </label>
              <div style={{ position: "relative", display: "inline-block", width: "auto" }}>
                <Form.Select
                  id="checklistSelect"
                  value={selectedChecklist}
                  onChange={(e) => setSelectedChecklist(e.target.value)}
                  className="form-select"
                  style={{
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "1px solid #fff",
                    appearance: "none",
                    paddingRight: "30px",
                    width: "auto",
                    display: "inline-block",
                  }}
                >
                  <option value="todos">Todos</option>
                  <option value="salida">Checklist de Salida</option>
                  <option value="retorno">Checklist de Retorno</option>
                  <option value="inspeccion_entrada">Inspección de Entrada</option>
                  <option value="inspeccion_salida">Inspección de Salida</option>
                </Form.Select>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "#fff",
                  }}
                >
                  ▼
                </div>
              </div>
            </div>
          </>
        )}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Table striped bordered hover variant="dark" style={{ width: "90%" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Tiempo</th>
                <th>Descripción</th>
                <th>Placa</th>
                {vehicleTypeId !== 1 && vehicleTypeId !== 2 && <th>Conductor</th>}
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((d) => {

                  return (
                    <tr key={d.id}>
                      <td>{d.id}</td>
                      <td>{d.createdAt ? getDateFromTimestamp(d.createdAt) : "No disponible"}</td>
                      <td>{d.createdAt ? getTimeFromTimestamp(d.createdAt) : "No disposible"}</td>
                      <td>{d.timer ? `${Math.floor(d.timer / 60)}:${d.timer % 60 < 10 ? `0${d.timer % 60}` : d.timer % 60}` : "No disponible"}</td>
                      <td>{d.name ? d.name : "No disponible"}</td>
                      <td>{d.licensePlate ? d.licensePlate : "No disponible" }</td>
                      {vehicleTypeId !== 1 && vehicleTypeId !== 2 && <td>{d.driverName ? d.driverName : "No disponible"}</td>}{" "}
    
                      <td>
                        <Button style={{ width: "80%", backgroundColor: "#007bff", border: "none" }} onClick={() => navigate(`/ver-cl/${d.id}`)}>
                          Ver
                          <FaEye style={{ marginLeft: "8px" }} />
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={vehicleTypeId === 1 || vehicleTypeId === 2 ? 8 : 7} style={{ textAlign: "center" }}>
                    No hay registros disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
