import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../utils/storageUtils";
import {
  FaHome,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUserShield,
  FaClipboardCheck,
  FaCarCrash,
  FaCircleNotch,
} from "react-icons/fa";

export function NavbarCommon() {
  const navigation = useNavigate();

  const handleLogout = () => {
    clearLocalStorage();
    navigation("/login");
  };

  const iconStyle = {
    marginRight: 8,
    color: "#0d6efd", // azul primary Bootstrap
  };

  const linkStyle = {
    color: "#f1f1f1",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    paddingInline: 12,
    paddingBlock: 6,
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      style={{
        backgroundColor: "#080808",
        borderBottom: "1px solid #222",
        boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
      }}
    >
      {/* Brand */}
      <Navbar.Brand
        className="d-flex align-items-center ms-3"
        style={{ cursor: "pointer", color: "#fff", fontWeight: 600 }}
        onClick={() => navigation("/")}
      >
        <FaHome style={iconStyle} />
        <span>Inicio</span>
      </Navbar.Brand>

      {/* Toggle mobile */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-3" />

      {/* Contenido colapsable */}
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="mt-2 mt-lg-0 justify-content-lg-between"
      >
        {/* Links centro */}
        <Nav className="mx-lg-auto flex-column flex-lg-row align-items-stretch align-items-lg-center">
          <Nav.Link onClick={() => navigation("/")} style={linkStyle}>
            <FaTachometerAlt style={iconStyle} />
            <span>Panel principal</span>
          </Nav.Link>

          <Nav.Link onClick={() => navigation("/checklist")} style={linkStyle}>
            <FaCarCrash style={iconStyle} />
            <span>Registros de incidentes</span>
          </Nav.Link>

          <Nav.Link
            onClick={() => navigation("/checklist-panel")}
            style={linkStyle}
          >
            <FaClipboardCheck style={iconStyle} />
            <span>Checklist</span>
          </Nav.Link>

{ /*         <Nav.Link
            onClick={() => navigation("/tire-sensors-details")}
            style={linkStyle}
          >
            <FaCircleNotch style={iconStyle} />
            <span>Neumáticos</span>
          </Nav.Link>
*/}
          <Nav.Link onClick={() => navigation("/admin")} style={linkStyle}>
            <FaUserShield style={iconStyle} />
            <span>Administración</span>
          </Nav.Link>
        </Nav>

        {/* Botón logout */}
        <div className="d-flex justify-content-lg-end px-3 px-lg-0">
          <Button
            onClick={handleLogout}
            variant="outline-light"
            className="mt-3 mt-lg-0 ms-lg-3 w-100"
            style={{
              fontWeight: 500,
              borderColor: "#0d6efd",
              color: "#fff",
            }}
          >
            <FaSignOutAlt style={iconStyle} />
            Cerrar sesión
          </Button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
