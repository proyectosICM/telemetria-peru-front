import React, { useState } from "react";
import { NavbarCommon } from "../../../common/navbarCommon";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ListItemsPaginated } from "../../../hooks/listItems";
import { driverPagedURL } from "../../../api/apiurls";
import { PaginacionUtils } from "../../../utils/paginacionUtils";

export function DriverAdminPanel() {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const { datos, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(`${driverPagedURL}`, pageNumber);

  // Función para manejar la eliminación de conductores
  const handleDelete = (id) => {
    // Aquí puedes implementar la lógica para eliminar un conductor
    console.log("Eliminar conductor con ID:", id);
    // Llama a tu API para eliminar el conductor y luego refresca los datos
  };

  return (
    <div className="g-background">
      <NavbarCommon />
      <div style={{ border: "2px solid white", height: "90vh", padding: "20px" }}>
        <Button onClick={() => navigate("/admin")} className="back-button" style={{ marginBottom: "20px" }}>
          Atras
        </Button>
        <h1>Panel Administractivo de Conductores</h1>
        <Button variant="success" style={{ marginBottom: "20px" }} onClick={() => navigate("/add-driver")}>
          Agregar Conductor
        </Button>

        {/* Tabla de Conductores */}
        <Table striped bordered hover variant="dark" style={{ width: "80%", margin: "auto" }} >
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Número de Licencia</th>
              <th>Fecha de Emisión</th>
              <th>Fecha de Expiración</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos && datos.length > 0 ? (
              datos.map((driver, index) => (
                <tr key={driver.id}>
                  <td>{index + 1 + currentPage * 10}</td>
                  <td>{driver.name}</td>
                  <td>{driver.lastName}</td>
                  <td>{driver.driverLicense}</td>
                  <td>{new Date(driver.licenseIssueDate).toLocaleDateString()}</td>
                  <td>{new Date(driver.licenseExpireDate).toLocaleDateString()}</td>
                  <td>{driver.status ? "Activo" : "Inactivo"}</td>
                  <td>
                    <Button variant="warning" onClick={() => navigate(`/edit-driver/${driver.id}`)}>
                      Editar
                    </Button>{" "}
                    <Button variant="danger" onClick={() => handleDelete(driver.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No hay conductores registrados
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
