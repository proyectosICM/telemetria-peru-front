import { Button } from "react-bootstrap";
import { NavbarCommon } from "../../common/navbarCommon";
import { LogoutToken } from "../../hooks/logoutToken";
import './adminPanel.css';

export function AdminPanel() {
  LogoutToken();
  
  return (
    <div>
      <NavbarCommon />
      <div className="admin-panel-container">
        <div className="panel-content">
          <h1>Camiones</h1>
          <Button>Ir</Button>
        </div>
      </div>
    </div>
  );
}
