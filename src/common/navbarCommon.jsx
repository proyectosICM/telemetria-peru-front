import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../utils/storageUtils";

export function NavbarCommon() {
  const navigation = useNavigate();

  const handleLogout = () => {
    clearLocalStorage();
    navigation("/login");
  };
 
  return (
    <Navbar bg="dark" variant="dark" className="justify-content-between">
      <Navbar.Brand style={{ marginLeft: "25px", cursor: "pointer" }} onClick={() => navigation("/")}>
        Inicio
      </Navbar.Brand>

      <Nav>
        <Nav.Link onClick={() => navigation("/")}>Panel Principal</Nav.Link>
        <Nav.Link onClick={() => navigation("/admin")}>Administracion</Nav.Link>
      </Nav>

      <Button style={{ marginRight: "25px" }} onClick={handleLogout} variant="outline-light">
        Cerrar Sesión
      </Button>
    </Navbar>
  );
}
