import { useNavigate } from "react-router-dom";
import { handleRecordsMessage } from "../../../utils/handleRecordsMessage";
import { FaClipboardCheck } from "react-icons/fa";

export function ChecklistInfo({ showAlert = true }) {
  const navigate = useNavigate();

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    padding: "10px",
    margin: "20% auto ",  
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    color: "#fff",
    backgroundColor: "#007BFF",
  };

  const iconStyle = {
    fontSize: "2.2em",
    marginBottom: "10px",
  };
  return (
    <div className="g-option-item" onClick={() => handleRecordsMessage(navigate, showAlert, "/checklist-panel")}>
      <div style={cardStyle}>
        <FaClipboardCheck style={iconStyle} />
        <p>Realizar/Ver los checklist</p>
      </div>
    </div>
  );
}
