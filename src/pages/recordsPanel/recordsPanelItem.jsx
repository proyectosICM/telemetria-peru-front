import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importar el hook useNavigate

export function RecordsPanelItem({ icon: Icon, title, route }) {
  const navigate = useNavigate(); // Definir navigate

  return (
    <div className="panel-content">
      <Icon size={50} style={{ marginBottom: "10px" }} />
      <h1>{title}</h1>
      <Button onClick={() => navigate(`${route}`)}>Administrar</Button> 
    </div>
  );
}
 