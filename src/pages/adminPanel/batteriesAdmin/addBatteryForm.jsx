import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../../common/navbarCommon";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ListItems } from "../../../hooks/listItems";
import { batteryURL, companiesURL, vehiclesByCompanyURL } from "../../../api/apiurls";

import Select from "react-select";
import { agregarElementoAPI } from "../../../hooks/agregarElementoAPI";
import { editItem } from "../../../hooks/editItem";
 
export function AddBatteryForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const rolId = localStorage.getItem("rolId");
  const companyId = localStorage.getItem("companyId");

  const [batteryData, setBatteryData] = useState();
  const [companies, setCompanies] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [batteryName, setBatteryName] = useState("");

  useEffect(() => {
    if (id != null || id !== undefined) {
      ListItems(`${batteryURL}/${id}`, setBatteryData);
    }
  }, [id]);

  useEffect(() => {
    if (batteryData) {
      setBatteryName(batteryData.name); 
      setSelectedCompany({ value: batteryData.companyId, label: batteryData.companyName }); 
      setSelectedVehicle({ value: batteryData.vehicleId, label: batteryData.licensePlate }); 
    }
  }, [batteryData]);

  useEffect(() => {
    ListItems(`${companiesURL}`, setCompanies);
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      ListItems(`${vehiclesByCompanyURL}/${selectedCompany.value}`, setVehicles);
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (rolId !== "1" && companyId && companies.length > 0) {
      const selectedCompany = companies.find((company) => company.id === parseInt(companyId));
      setSelectedCompany({ value: selectedCompany.id, label: selectedCompany.name });
    }
  }, [rolId, companyId, companies]);

  // Formatear las opciones de empresas para react-select
  const companyOptions = companies.map((company) => ({
    value: company.id,
    label: company.name, // Asegúrate de que esta propiedad exista en tus datos
  }));

  // Formatear las opciones de vehículos para react-select
  const vehicleOptions = vehicles.map((vehicle) => ({
    value: vehicle.id,
    label: vehicle.licensePlate, // Asegúrate de que esta propiedad exista en tus datos
  }));

  const handleSaveBattery = async () => {
    const requestData = {
      name: batteryName,
      companyModel: {
        id: selectedCompany?.value,
      },
      vehicleModel: {
        id: selectedVehicle?.value,
      },
    };
    console.log(requestData);
    try {
      if (id != null || id !== undefined) {
        await editItem(`${batteryURL}/${id}`, requestData);
      } else {
        await agregarElementoAPI(batteryURL, requestData);
      }
      navigate("/batteries-admin");
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
              value={batteryName}
              isDisabled={rolId !== "1"}
              onChange={(e) => setBatteryName(e.target.value)} // Manejar el cambio en el input
            />
          </Form.Group>

          {/* Select para elegir la empresa */}
          {rolId === "1" && (
            <Form.Group controlId="associatedCompany" style={{ marginBottom: "20px" }}>
              <Form.Label style={{ color: "white" }}>Empresa Asociada</Form.Label>
              <Select
                options={companyOptions} // Opciones de empresas
                value={selectedCompany} // Valor seleccionado
                onChange={(selectedOption) => {
                  setSelectedCompany(selectedOption); // Establecer la empresa seleccionada
                  setSelectedVehicle(null); // Limpiar la selección del vehículo cuando se cambia la empresa
                }}
                placeholder="Seleccione una empresa"
                isSearchable // Habilita la barra de búsqueda
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
              options={vehicleOptions} // Opciones de vehículos
              value={selectedVehicle} // Valor seleccionado
              onChange={(selectedOption) => {
                setSelectedVehicle(selectedOption); // Establecer el vehículo seleccionado
              }}
              placeholder="Seleccione un vehículo"
              isSearchable // Habilita la barra de búsqueda
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
            onClick={handleSaveBattery} // Llamar a la función para guardar la batería
          >
            Guardar Bateria 
          </Button>
        </div>
      </div>
    </div>
  );
}
