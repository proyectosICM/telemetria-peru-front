import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { useNavigate } from "react-router-dom";
import { FaClipboardCheck, FaTruckLoading, FaTruckMoving, FaCheckSquare, FaEye } from "react-icons/fa"; // Importando íconos
import { Button, Table, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa Bootstrap
import { ListItems, ListItemsPaginated } from "../../hooks/listItems";
import { checklistRecordsVehiclePageURL, vehiclesURL } from "../../api/apiurls";
import { PaginacionUtils } from "../../utils/paginacionUtils";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../utils/formatUtils";

export function ChecklistPanel() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [selectedChecklist, setSelectedChecklist] = useState("todos");
  const [pageNumber, setPageNumber] = useState(0);

  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const { datos, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(`${checklistRecordsVehiclePageURL}/${selectedVehicleId}`, pageNumber);

  useEffect(() => {
    ListItems(`${vehiclesURL}/${selectedVehicleId}`, setData);
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
    if (data && data.vehicletypeModel) {
      const vehicleTypeId = data.vehicletypeModel.id;

      if (vehicleTypeId === 3 || vehicleTypeId === 4) {
        // Mostrar el primer grupo de checklists
        return (
          <>
            <div
              style={{ ...cardStyle, backgroundColor: "#28a745" }} // Color verde para checklist de salida
              onClick={() => navigate("/example/salida")}
            >
              <FaClipboardCheck style={iconStyle} />
              <p>Inspección diaria de unidades (salida)</p>
            </div>

            <div
              style={{ ...cardStyle, backgroundColor: "#ffc107" }} // Color amarillo para checklist de retorno
              onClick={() => navigate("/example/retorno")}
            >
              <FaTruckMoving style={iconStyle} />
              <p>Inspección diaria de unidades (retorno)</p>
            </div>

            <div
              style={{ ...cardStyle, backgroundColor: "#17a2b8" }} // Color azul claro para inspección de entrada
              onClick={() => navigate("/example2/retorno")}
            >
              <FaTruckLoading style={iconStyle} />
              <p>Inspección diaria de unidad MOTOFURGON (retorno)</p>
            </div>

            <div
              style={{ ...cardStyle, backgroundColor: "#007bff" }} // Color azul oscuro para inspección de salida
              onClick={() => navigate("/example2/salida")}
            >
              <FaCheckSquare style={iconStyle} />
              <p>Inspección diaria de unidades MOTOFURGON (salida)</p>
            </div>
          </>
        );
      } else if (vehicleTypeId === 1 || vehicleTypeId === 2) {
        // Mostrar el segundo grupo de checklists
        return (
          <>
            <div
              style={{ ...cardStyle, backgroundColor: "#28a745" }} // Color verde para checklist de salida
              onClick={() => navigate(`/example3/${data.licensePlate}`)}
            >
              <FaClipboardCheck style={iconStyle} />
              <p>Nuevo registro</p>
            </div>
          </>
        );
      }
    }
    return null;
  };

  return (
    <div className="g-background">
      <NavbarCommon />
      <Button onClick={() => navigate("/")} className="back-button">
        Atras
      </Button>
      <div style={{ border: "2px solid #d1d0cc", margin: "5px 10%" }}>
        <h1>Checklist</h1>

        {/* Sección de "cards" para agregar nuevos checklists */}
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>{renderChecklistCards()}</div>

        {/* ComboBox estilizado con Bootstrap */}
        {data && data.vehicletypeModel && data.vehicletypeModel.id !== 1 && data.vehicletypeModel.id !== 2 && (
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
                    backgroundColor: "#000", // Fondo negro
                    color: "#fff", // Texto en blanco
                    border: "1px solid #fff", // Borde blanco
                    appearance: "none", // Ocultar la flecha por defecto
                    paddingRight: "30px", // Espacio para la flecha personalizada
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
                {/* Flecha personalizada */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "#fff", // Color blanco para la flecha
                  }}
                >
                  ▼
                </div>
              </div>
            </div>
          </>
        )}

        {/* Contenedor centrado para la tabla */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Table striped bordered hover variant="dark" style={{ width: "90%" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Descripción</th>
                <th>Placa</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {datos && datos.length > 0 ? (
                datos.map((dato, index) => (
                  <tr key={dato.id}>
                    <td>{dato.id}</td>
                    <td>{getDateFromTimestamp(dato.createdAt)}</td>
                    <td>{getTimeFromTimestamp(dato.createdAt)}</td>
                    <td>{dato.name}</td>
                    <td>{dato.vehicleModel.licensePlate}</td>
                    <td>
                      <Button style={{ width: "80%", backgroundColor: "#007bff", border: "none" }} onClick={() => navigate(`/ver-cl/${dato.id}`)}>
                        Ver
                        <FaEye style={{ marginLeft: "8px" }} /> {/* Ícono a la derecha del texto */}
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No hay registros disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Controles de paginación */}
        <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
