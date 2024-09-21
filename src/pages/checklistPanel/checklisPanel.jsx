import React, { useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { useNavigate } from "react-router-dom";
import { FaClipboardCheck, FaTruckLoading, FaTruckMoving, FaCheckSquare } from "react-icons/fa"; // Importando íconos
import { Button, Table, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa Bootstrap

export function ChecklistPanel() {
  const navigate = useNavigate();

  // Estado para manejar el valor seleccionado en el ComboBox
  const [selectedChecklist, setSelectedChecklist] = useState("todos");

  const handleAddChecklist = (type) => {
    console.log(`Agregar checklist: ${type}`);
  };

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

  return (
    <div className="g-background">
      <NavbarCommon />
      <Button onClick={() => navigate("/")} className="back-button">
        Atras
      </Button>
      <div style={{ border: "2px solid #d1d0cc", margin: "5px 10%" }}>
        <h1>Checklist</h1>

        {/* Sección de "cards" para agregar nuevos checklists */}
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
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
            <p> Inspección diaria de unidades (retorno)</p>
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
        </div>

        <h1>Registros</h1>

        {/* ComboBox estilizado con Bootstrap */}
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
        {/* Contenedor centrado para la tabla */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Table striped bordered hover variant="dark" style={{ width: "90%" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>2024-09-20</td>
                <td>08:00</td>
                <td>Revisión de neumáticos</td>
                <td>
                  <Button variant="primary">Ver</Button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>2024-09-19</td>
                <td>14:30</td>
                <td>Revisión de frenos</td>
                <td>
                  <Button variant="primary">Ver</Button>
                </td>
              </tr>
              {/* Otros registros */}
            </tbody>
          </Table>
        </div>

        {/* Controles de paginación */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "20px" }}>
          <Button>Atras</Button>
          <p style={{ margin: "0" }}>Pagina 1 de 3</p>
          <Button>Siguiente</Button>
        </div>
      </div>
    </div>
  );
}
