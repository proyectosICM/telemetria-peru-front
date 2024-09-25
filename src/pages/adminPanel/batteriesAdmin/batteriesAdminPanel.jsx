import React, { useState } from "react";
import { NavbarCommon } from "./../../../common/navbarCommon";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ListItemsPaginated } from "../../../hooks/listItems";
import { batteryPagedURL } from "../../../api/apiurls";
import { PaginacionUtils } from "../../../utils/paginacionUtils";
import { getDateFromTimestamp } from "../../../utils/formatUtils";

export function BatteriesAdminPanel() {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const { datos, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(`${batteryPagedURL}`, pageNumber);

  return (
    <div className="g-background">
      <NavbarCommon />
      <div style={{ border: "2px solid white", height: "90vh", padding: "20px" }}>
        <Button onClick={() => navigate("/admin")} className="back-button" style={{ marginBottom: "20px" }}>
          Atras
        </Button>
        <h1>Panel Administractivo de Baterías</h1>
        <Button variant="success" style={{ marginBottom: "20px" }} onClick={() => navigate("/add-battery")}>
          Agregar Batería
        </Button>

        {/* Tabla de Baterías */}
        <Table striped bordered hover variant="dark" style={{ width: "80%", margin: "auto" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Voltaje</th>
              <th>Estado</th>
              <th>Fecha de Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos && datos.length > 0 ? (
              datos.map((battery, index) => (
                <tr key={battery.id}>
                  <td>{index + 1 + currentPage * 10}</td>
                  <td>{battery.name}</td>
                  <td>{battery.voltaje ? battery.voltaje : "N/A"}</td>
                  <td>{battery.status ? "Activo" : "Inactivo"}</td>
                  <td>{getDateFromTimestamp(battery.createdAt)}</td>
                  <td>
                    <Button variant="warning" onClick={() => navigate(`/edit-battery/${battery.id}`)}>
                      Editar
                    </Button>{" "}
                    {/*<Button variant="danger" onClick={() => handleDelete(battery.id)}>Eliminar</Button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No hay baterías registradas
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
