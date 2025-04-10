import { NavbarCommon } from "../../common/navbarCommon";
import { LogoutToken } from "../../hooks/logoutToken";
import { FaBuilding, FaUser, FaTruck, FaBatteryHalf, FaTachometerAlt, FaUserShield } from "react-icons/fa"; // Importar los iconos
import "./adminPanel.css";
import { AdminPanelItem } from "./adminPanelItem";

export function AdminPanel() {
  LogoutToken();

  const rolId = localStorage.getItem("rolId");

  return (
    <div className="g-background">
      <NavbarCommon />
      <div className="admin-panel-container" style={{ height: "90vh" }}>
        {rolId === "1" && <AdminPanelItem icon={FaBuilding} title="Empresas" route={"/company-admin"} />}
        {rolId === "1" && <AdminPanelItem icon={FaUser} title="Usuarios" route={"/user-admin"} />}
        <AdminPanelItem icon={FaTruck} title="Vehiculos" route={"/manage-vehicles"} />
        <AdminPanelItem icon={FaTruck} title="Conductores" route={"/driver-admin"} />
        <AdminPanelItem icon={FaBatteryHalf} title="Baterías" route={"/batteries-admin"} />
        <AdminPanelItem icon={FaTachometerAlt} title="Sensor de Neumáticos" route={"/tire-admin"} />
        {rolId === "1" && <AdminPanelItem icon={FaUserShield} title="Roles" route={"/roles-admin"} />}
      </div>
    </div>
  );
}
