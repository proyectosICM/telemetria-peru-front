import React, { useState } from "react";
import { NavbarCommon } from "../../../common/navbarCommon";
import { useGetFuelTypes, useGetVehiclesByCompanyIdPaged, useUpdateVehicle } from "../../../api/hooks/useVehicle";
import { Button, Pagination, Table } from "react-bootstrap";
import { VehiclesModal } from "./vehiclesModal";
import { getFuelTypes } from "../../../api/services/vehicleService";
import { useCreateVehicle } from "../../../api/hooks/useVehicle";
import { BackButton } from "../../../common/backButton";
import { FaHashtag, FaCar, FaMicrochip, FaListAlt, FaGasPump, FaTachometerAlt, FaTools, FaPlus, FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";

const ManageVehicles = () => {
  const companyId = localStorage.getItem("tp_companyId");
  const [page, setPage] = useState(0);
  const size = 10;

  const { data: vehicles, isLoading, isError } = useGetVehiclesByCompanyIdPaged(companyId, page, size);
  const { data: fuelTypes, isLoading2, isError2 } = useGetFuelTypes();

  const createVehicleMutation = useCreateVehicle();
  const updateVehicleMutation = useUpdateVehicle();

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < vehicles.totalPages) {
      setPage(newPage);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    //setOrganizationName("");
    setSelectedOrganization(null); // Reset
  };

  const [newGroup, setNewGroup] = useState({
    licensePlate: "",
    imei: "",
    fuelType: "",
    maxSpeed: "",
    vehicleTypeId: "",
    companyModel: "",
    timeOn: null,
    driverModel: null,
  });

  const handleEdit = (vehicle) => {
    setNewGroup(vehicle);
    setSelectedOrganization(vehicle);
    handleShowModal(true);
  };

  const handleSaveOrUpdate = () => {
    if (!newGroup.licensePlate || !newGroup.imei || !newGroup.fuelType || !newGroup.vehicleTypeId || !newGroup.maxSpeed) {
      alert("Por favor complete todos los campos obligatorios.");
      return;
    }

    const vehicleToSend = {
      id: newGroup.id, // necesario para update
      licensePlate: newGroup.licensePlate,
      imei: newGroup.imei,
      fuelType: newGroup.fuelType,
      maxSpeed: newGroup.maxSpeed,
      vehicletypeModel: { id: newGroup.vehicleTypeId },
      timeOn: null,
      driverModel: null,
      companyModel: { id: newGroup.companyModel || companyId },
    };

    const isEditing = !!newGroup.id;

    const mutation = isEditing ? updateVehicleMutation : createVehicleMutation;

    mutation.mutate(vehicleToSend, {
      onSuccess: () => {
        handleCloseModal();
      },
      onError: (error) => {
        console.error("Error al guardar vehículo:", error);
        alert("Hubo un error al guardar el vehículo.");
      },
    });
  };
  return (
    <div className="g-background">
      <NavbarCommon />
      <BackButton path={-1} />
      <div style={{ border: "2px solid #d1d0cc", margin: "5px 5%" }}>
        <h1>Administrar Vehículos</h1>
        <Button variant="success" onClick={handleShowModal}>
          <FaPlusCircle style={{ marginRight: "5px" }} />
          Agregar
        </Button>
        <div style={{ margin: "10px auto  ", width: "90%" }}>
          <Table striped bordered hover className="mt-4" variant="dark">
            <thead>
              <tr>
                <th>
                  <FaHashtag /> ID
                </th>
                <th>
                  <FaCar /> Placa
                </th>
                <th>
                  <FaMicrochip /> IMEI
                </th>
                <th>
                  <FaListAlt /> Tipo
                </th>
                <th>
                  <FaGasPump /> Tipo de combustible
                </th>
                <th>
                  <FaTachometerAlt /> Velocidad máxima
                </th>
                <th>
                  <FaTools /> Acciones
                </th>
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
              {vehicles && vehicles.content.length > 0 ? (
                vehicles.content.map((vehicle, index) => (
                  <tr key={vehicle.id}>
                    <td>{vehicle.id}</td>
                    <td>{vehicle.licensePlate}</td>
                    <td>{vehicle.imei}</td>
                    <td>{vehicle.vehicleTypeName}</td>
                    <td>{vehicle.fuelType}</td>
                    <td>{vehicle.maxSpeed} km/h</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button variant="primary" title="Editar" onClick={() => handleEdit(vehicle)} className="flex-fill">
                          <FaEdit /> Editar
                        </Button>
                        <Button variant="danger" title="Eliminar" onClick={() => console.log("Delete", vehicle.id)} className="flex-fill">
                          <FaTrash /> Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No hay vehículos disponibles</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

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

        <VehiclesModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          selectedGroup={selectedOrganization}
          data={newGroup}
          setData={setNewGroup}
          handleSaveOrUpdate={handleSaveOrUpdate}
        />
      </div>
    </div>
  );
};

export default ManageVehicles;
