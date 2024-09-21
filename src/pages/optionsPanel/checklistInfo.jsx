import { useNavigate } from "react-router-dom";
import { handleRecordsMessage } from "../../utils/handleRecordsMessage";
import { FaCheckSquare, FaClipboardCheck, FaTruckLoading, FaTruckMoving } from "react-icons/fa";
import { Button } from "react-bootstrap";

export function ChecklistInfo({ showAlert = true }) {
  const navigate = useNavigate();

  // Estilos para los "cards"
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    padding: "20px",
    margin: "2%",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    color: "#fff",
  };

  const iconStyle = { fontSize: "2em", marginBottom: "10px" };
  return (
    <div className="g-option-item" onClick={() => handleRecordsMessage(navigate, showAlert, "/checklist-panel")}>
      <h1>Checklist</h1>
      <p>Realizar/Ver los checklist</p>

      {/* Contenedor para organizar en 2 columnas */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        <div
          style={{ ...cardStyle, backgroundColor: "#28a745" }} // Color verde para checklist de salida
          onClick={() => handleRecordsMessage(navigate, showAlert, "/checklist-salida")}
        >
          <FaClipboardCheck style={iconStyle} />
          <p>Inspección diaria de unidades (salida)</p>
        </div>

        <div
          style={{ ...cardStyle, backgroundColor: "#ffc107" }} // Color amarillo para checklist de retorno
          onClick={() => handleRecordsMessage(navigate, showAlert, "/checklist-retorno")}
        >
          <FaTruckMoving style={iconStyle} />
          <p>Inspección diaria de unidad (retorno)</p>
        </div>

        <div
          style={{ ...cardStyle, backgroundColor: "#17a2b8" }} // Color azul claro para inspección de entrada
          onClick={() => handleRecordsMessage(navigate, showAlert, "/checklist-entrada")}
        >
          <FaTruckLoading style={iconStyle} />
          <p>Inspección diaria de unidad MOTOFURGON (retorno)</p>
        </div>

        <div
          style={{ ...cardStyle, backgroundColor: "#007bff" }} // Color azul oscuro para inspección de salida
          onClick={() => handleRecordsMessage(navigate, showAlert, "/checklist-salida-motofurgon")}
        >
          <FaCheckSquare style={iconStyle} />
          <p>Inspección diaria de unidades MOTOFURGON (salida)</p>
        </div>
      </div>
    </div>
  );
}
