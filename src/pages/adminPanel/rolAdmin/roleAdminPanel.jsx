import React, { useEffect, useState } from "react";
import { NavbarCommon } from "./../../../common/navbarCommon";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ListItems } from "../../../hooks/listItems";
import { roleRoutes } from "../../../api/apiurls";
import { PaginacionUtils } from "../../../utils/paginacionUtils";
import { getDateFromTimestamp } from "../../../utils/formatUtils";

export function RoleAdminPanel() {
  const navigate = useNavigate();
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    ListItems(`${roleRoutes.base}`, setDatos);
  }, []);

  return (
    <div className="g-background">
      <NavbarCommon />
      <div style={{ border: "2px solid white", height: "90vh", padding: "20px" }}>
        <Button onClick={() => navigate("/admin")} className="back-button" style={{ marginBottom: "20px" }}>
          Atras
        </Button>
        <h1>Panel Administractivo de Roles</h1>
        <Button variant="success" style={{ marginBottom: "20px" }} onClick={() => navigate("/add-role")}>
          Agregar Roles
        </Button>

        {/* Tabla de Roles */}
        <Table striped bordered hover variant="dark" style={{ width: "80%", margin: "auto" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Fecha de Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos && datos.length > 0 ? (
              datos.map((role, index) => (
                <tr key={role.id}>
                  <td>{index + 1}</td>
                  <td>{role.name}</td>
                  <td>{getDateFromTimestamp(role.createdAt)}</td>
                  <td>
                    <Button variant="warning" onClick={() => navigate(`/edit-role/${role.id}`)}>
                      Editar
                    </Button>{" "}
                    {/*<Button variant="danger" onClick={() => handleDelete(role.id)}>Eliminar</Button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No hay roles registrados
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
