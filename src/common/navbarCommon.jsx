import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../utils/storageUtils";
import {
  FaHome,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUserShield,
  FaClipboardCheck
} from "react-icons/fa";

export function NavbarCommon() {
  const navigation = useNavigate();

  const handleLogout = () => {
    clearLocalStorage();
    navigation("/login");
  };

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: "#111", // 🔹 negro elegante
        borderBottom: "1px solid #222",
        boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
      }}
      variant="dark"
    >
      {/* Brand */}
      <Navbar.Brand
        style={{
          marginLeft: "25px",
          cursor: "pointer",
          color: "#fff",
          fontWeight: "600",
        }}
        onClick={() => navigation("/")}
      >
        <FaHome style={{ marginRight: "6px", color: "#007bff" }} /> Inicio
      </Navbar.Brand>

      {/* Toggle button for mobile */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      {/* Collapsible nav */}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link
            onClick={() => navigation("/")}
            style={{ color: "#f1f1f1", fontWeight: "500" }}
          >
            <FaTachometerAlt style={{ marginRight: "6px", color: "#007bff" }} />
            Panel Principal
          </Nav.Link>

          <Nav.Link
            onClick={() => navigation("/checklist")}
            style={{ color: "#f1f1f1", fontWeight: "500" }}
          >
            <FaClipboardCheck style={{ marginRight: "6px", color: "#007bff" }} />
            Registros de incidentes de impacto
          </Nav.Link>

          <Nav.Link
            onClick={() => navigation("/checklist")}
            style={{ color: "#f1f1f1", fontWeight: "500" }}
          >
            <FaClipboardCheck style={{ marginRight: "6px", color: "#007bff" }} />
            Checklist
          </Nav.Link>

          <Nav.Link
            onClick={() => navigation("/checklist")}
            style={{ color: "#f1f1f1", fontWeight: "500" }}
          >
            <FaClipboardCheck style={{ marginRight: "6px", color: "#007bff" }} />
            Neumaticos
          </Nav.Link>

          <Nav.Link
            onClick={() => navigation("/admin")}
            style={{ color: "#f1f1f1", fontWeight: "500" }}
          >
            <FaUserShield style={{ marginRight: "6px", color: "#007bff" }} />
            Administración
          </Nav.Link>
        </Nav>

        {/* Botón logout */}
        <Button
          onClick={handleLogout}
          variant="outline-light"
          style={{
            marginRight: "25px",
            fontWeight: "500",
            borderColor: "#007bff",
            color: "#fff",
          }}
        >
          <FaSignOutAlt style={{ marginRight: "6px", color: "#007bff" }} />
          Cerrar Sesión
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
