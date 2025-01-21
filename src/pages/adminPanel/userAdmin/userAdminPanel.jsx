import React, { useState } from "react";
import { NavbarCommon } from "../../../common/navbarCommon";
import { useNavigate } from "react-router-dom";
import { ListItemsPaginated } from "../../../hooks/listItems";
import { userPagedURL } from "../../../api/apiurls";
import { Button, Table } from "react-bootstrap";
import { PaginacionUtils } from "../../../utils/paginacionUtils";
import { useUserAdminLogic } from "./useUserAdminLogic";
import { getDateFromTimestamp } from "../../../utils/formatUtils";

export function UserAdminPanel() {
  const navigate = useNavigate();
  const { data, totalPages, currentPage, setCurrentPage, setPageNumber, handleDelete } = useUserAdminLogic();


  return (
    <div className="g-background">
      <NavbarCommon />
      <div style={{ border: "2px solid white", height: "90vh", padding: "20px" }}>
        <Button onClick={() => navigate("/admin")} className="back-button" style={{ marginBottom: "20px" }}>
          Atras
        </Button>
        <h1>Panel Administractivo de Usuarios</h1>
        <Button variant="success" style={{ marginBottom: "20px" }} onClick={() => navigate("/add-user")}>
          Agregar Usuario
        </Button>

        {/* Tabla de Usuarios */}
        <Table striped bordered hover variant="dark" style={{ width: "80%", margin: "auto" }} >
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre de Usuario</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Empresa</th>
              <th>Rol</th>
              <th>Fecha de Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((user, index) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.status ? "Activo" : "Inactivo"}</td>
                  <td>{user.companyModel.name }</td>
                  <td>{user.roleModel ? user.roleModel.name : "Sin Rol"}</td>
                  <td>{getDateFromTimestamp(user.createdAt)}</td>
                  <td>
                    <Button variant="warning" onClick={() => navigate(`/edit-user/${user.id}`)}>
                      Editar
                    </Button>{" "}
                    <Button variant="danger" onClick={() => handleDelete(user.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No hay usuarios registrados
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Componente de Paginación */}
        <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
