import React, { useState } from "react";
import { NavbarCommon } from "../../../common/navbarCommon";
import { useGetVehiclesByCompanyIdPaged } from "../../../api/hooks/useVehicle";
import { Pagination, Table } from "react-bootstrap";

const ManageVehicles = () => {
  const companyId = localStorage.getItem("companyId");
  const [page, setPage] = useState(0);
  const size = 10;

  const { data: vehicles, isLoading, isError } = useGetVehiclesByCompanyIdPaged(companyId, page, size);
  const { data, isLoading2, isError2 } = useGetVehiclesByCompanyIdPaged(companyId, page, size);
    console.log(data)
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < vehicles.totalPages) {
      setPage(newPage);
    }
  };

  const [newGroup, setNewGroup] = useState({
    imei: "",
    licensePlate: "",
    timeOn: null,
    maxSpeed: "",
    vehicletypeModel: "",
    companyModel: "",
    fuelType: "",
  });

  return (
    <div className="g-background">
      <NavbarCommon />
      <h1>Administrar Vehículos</h1>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imei</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan="3">Cargando...</td>
            </tr>
          )}
          {isError && (
            <tr>
              <td colSpan="3">Error al cargar los datos</td>
            </tr>
          )}
          {vehicles && vehicles.length > 0 ? (
            vehicles.map((vehicle, index) => (
              <tr key={vehicle.id}>
                <td>{index + 1 + page * size}</td>
                <td>{vehicle.imei}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => console.log("Edit", vehicle.id)}>
                    Editar
                  </button>
                  <button className="btn btn-danger" onClick={() => console.log("Delete", vehicle.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay vehículos disponibles</td>
            </tr>
          )}
        </tbody>
      </Table>

      {vehicles && vehicles.totalPages && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 0} />
            {[...Array(vehicles.totalPages).keys()].map((p) => (
              <Pagination.Item key={p} active={p === page} onClick={() => handlePageChange(p)}>
                {p + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === vehicles.totalPages - 1} />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ManageVehicles;
