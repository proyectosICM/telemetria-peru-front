import React, { useState } from "react";
import { NavbarCommon } from "./../../../common/navbarCommon";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ListItemsPaginated } from "../../../hooks/listItems";
import { companiesPageURL, companiesURL } from "../../../api/apiurls";
import { PaginacionUtils } from "../../../utils/paginacionUtils";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../../utils/formatUtils";
import Swal from "sweetalert2";
import { deleteItem } from "../../../hooks/deleteItem";
import { alertDeleteConfirmation, alertFailedfulDeleted, alertSuccessfulDeleted } from "../../../messages/apiResponseMessages";

export function CompanyAdminPanel() {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const { datos, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(`${companiesPageURL}`, pageNumber);

  const handleDelete = async (id) => {
    try {
      const result = await alertDeleteConfirmation();
      if (result.isConfirmed) {
        await deleteItem(`${companiesURL}/${id}`);
        alertSuccessfulDeleted();
      }
    } catch (error) {
      alertFailedfulDeleted();
    }
  };

  return (
    <div className="g-background">
      <NavbarCommon />
      <div style={{ border: "2px solid white", height: "90vh", padding: "20px" }}>
        <Button onClick={() => navigate("/admin")} className="back-button" style={{ marginBottom: "20px" }}>
          Atras
        </Button>
        <h1>Panel Administractivo de Empresas</h1>
        <Button onClick={() => navigate("/add-company")} variant="success" style={{ marginBottom: "20px" }}>
          Agregar Empresa
        </Button>

        {/* Tabla de Empresas */}
        <Table striped bordered hover variant="dark" style={{ width: "80%", margin: "auto" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Fecha de Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos && datos.length > 0 ? (
              datos.map((company, index) => (
                <tr key={company.id}>
                  <td>{index + 1 + currentPage * 10}</td>
                  <td>{company.name}</td>
                  <td>{company.status ? "Activo" : "Inactivo"}</td>
                  <td>{getDateFromTimestamp(company.createdAt)}</td>
                  <td>
                    <Button variant="warning" onClick={() => navigate(`/edit-company/${company.id}`)}>
                      Editar
                    </Button>{" "}
                    <Button variant="danger" onClick={() => handleDelete(company.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No hay empresas registradas
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
