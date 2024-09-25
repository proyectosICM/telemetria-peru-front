import { Button } from "react-bootstrap";
import { NavbarCommon } from "../../common/navbarCommon";
import { LogoutToken } from "../../hooks/logoutToken";
import { FaBuilding, FaUser, FaTruck, FaBatteryHalf, FaTachometerAlt, FaUserShield } from "react-icons/fa"; // Importar los iconos
import "./adminPanel.css";
import { useNavigate } from "react-router-dom";
import { AdminPanelItem } from "./adminPanelItem";

export function AdminPanel() {
  LogoutToken();
  const navigate = useNavigate();

  return (
    <div className="g-background">
      <NavbarCommon />
      <div className="admin-panel-container" style={{ height: "90vh" }}>
        <AdminPanelItem icon={FaBuilding} title="Empresas" route={"/company-admin"} />
        <AdminPanelItem icon={FaUser} title="Usuarios" route={"/user-admin"} />
        <AdminPanelItem icon={FaTruck} title="Conductores" route={"/driver-admin"}/>
        <AdminPanelItem icon={FaBatteryHalf} title="Baterías" route={"/batteries-admin"} />
        <AdminPanelItem icon={FaTachometerAlt} title="Sensor de Neumáticos" route={"/tire-admin"}/>
        <AdminPanelItem icon={FaUserShield} title="Roles" route={"/roles-admin"} />
      </div>
    </div>
  );
}
