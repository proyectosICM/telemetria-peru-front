import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../../common/navbarCommon";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ListItems } from "../../../hooks/listItems";
import { batteryURL, companiesURL, vehiclesByCompanyURL } from "../../../api/apiurls";
import Select from "react-select";
import { useSaveItem } from "../../../hooks/useSaveCRUDItem";

export function AddBatteryForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const rolId = localStorage.getItem("rolId");
  const companyId = localStorage.getItem("companyId");

  const [batteryData, setBatteryData] = useState({ id: "", name: "", companyId: "", companyName: "", vehicleId: "", licensePlate: "" });
  const [companies, setCompanies] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const { saveItem } = useSaveItem(batteryURL, "/batteries-admin");

  useEffect(() => {
    if (id) {
      ListItems(`${batteryURL}/${id}`, (data) => {
        setBatteryData({ ...data });
      });
    }
  }, [id]);

  useEffect(() => {
    ListItems(`${companiesURL}`, setCompanies);
  }, []);

  useEffect(() => {
    if (rolId !== "1" && companyId && companies.length > 0) {
      const selectedCompany = companies.find((company) => company.id === parseInt(companyId));
      setBatteryData((prevData) => ({
        ...prevData,
        companyId: selectedCompany?.id || "",
        companyName: selectedCompany?.name || "",
      }));
    }
  }, [rolId, companyId, companies]);

  useEffect(() => {
    if (batteryData.companyId) {
      ListItems(`${vehiclesByCompanyURL}/${batteryData.companyId}`, setVehicles);
    }
  }, [batteryData.companyId]);

  // Formatear las opciones de empresas para react-select
  const companyOptions = companies.map((company) => ({
    value: company.id,
    label: company.name,
  }));

  // Formatear las opciones de vehículos para react-select
  const vehicleOptions = vehicles.map((vehicle) => ({
    value: vehicle.id,
    label: vehicle.licensePlate,
  }));

  const handleSaveBattery = async () => {
    const requestData = {
      name: batteryData.name,
      companyModel: { id: batteryData.companyId },
      vehicleModel: { id: batteryData.vehicleId },
    };

    try {
      await saveItem(id, requestData);
    } catch (error) {
      console.error("Error al guardar la batería:", error);
    }
  };

  return (
    <div className="g-background">
      <NavbarCommon />
      <div style={{ border: "2px solid white", height: "90vh", padding: "20px" }}>
        <Button onClick={() => navigate("/batteries-admin")} className="back-button">
          Atras
        </Button>
        <h1 style={{ color: "white" }}>Agregar Batería</h1>
        <div style={{ width: "80%", margin: "auto" }}>
          {/* Input para nombre de la batería */}
          <Form.Group controlId="batteryName" style={{ marginBottom: "20px" }}>
            <Form.Label style={{ color: "white" }}>Nombre de la Batería</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de la batería"
              style={{ backgroundColor: "white", color: "black" }}
              value={batteryData.name}
              isDisabled={rolId !== "1"}
              onChange={(e) => setBatteryData({ ...batteryData, name: e.target.value })}
            />
          </Form.Group>

          {/* Select para elegir la empresa */}
          {rolId === "1" && (
            <Form.Group controlId="associatedCompany" style={{ marginBottom: "20px" }}>
              <Form.Label style={{ color: "white" }}>Empresa Asociada</Form.Label>
              <Select
                options={companyOptions}
                value={companyOptions.find((option) => option.value === batteryData.companyId)}
                onChange={(selectedOption) => {
                  setBatteryData((prevData) => ({
                    ...prevData,
                    companyId: selectedOption?.value || "",
                    companyName: selectedOption?.label || "",
                    vehicleId: "", // Limpiar el vehículo cuando se cambia la empresa
                    licensePlate: "",
                  }));
                }}
                placeholder="Seleccione una empresa"
                isSearchable
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: "white",
                    color: "black",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 9999,
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? "#007bff" : state.isFocused ? "#555" : "#444",
                    color: "white",
                  }),
                }}
              />
            </Form.Group>
          )}

          {/* Select para elegir el vehículo asignado */}
          <Form.Group controlId="assignedVehicle" style={{ marginBottom: "20px" }}>
            <Form.Label style={{ color: "white" }}>Vehículo Asociado</Form.Label>
            <Select
              options={vehicleOptions}
              value={vehicleOptions.find((option) => option.value === batteryData.vehicleId)}
              onChange={(selectedOption) => {
                setBatteryData((prevData) => ({
                  ...prevData,
                  vehicleId: selectedOption?.value || "",
                  licensePlate: selectedOption?.label || "",
                }));
              }}
              placeholder="Seleccione un vehículo"
              isSearchable
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "white",
                  color: "black",
                }),
                menu: (provided) => ({
                  ...provided,
                  zIndex: 9999,
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? "#007bff" : state.isFocused ? "#555" : "#444",
                  color: "white",
                }),
              }}
            />
          </Form.Group>

          <Button
            variant="primary"
            style={{ backgroundColor: "#007bff", border: "none" }}
            onClick={handleSaveBattery}
          >
            Guardar Bateria
          </Button>
        </div>
      </div>
    </div>
  );
}
