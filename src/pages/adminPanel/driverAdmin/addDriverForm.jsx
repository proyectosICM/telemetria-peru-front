import React, { useEffect, useState } from "react"; 
import { NavbarCommon } from "../../../common/navbarCommon";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ListItems } from "../../../hooks/listItems";
import { batteryURL, companiesURL, driverURL, vehiclesByCompanyURL } from "../../../api/apiurls";
import Select from "react-select";
import { agregarElementoAPI } from "../../../hooks/agregarElementoAPI";
import { editItem } from "../../../hooks/editItem";

export function AddDriverForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const rolId = localStorage.getItem("rolId");
  const companyId = localStorage.getItem("companyId");

  const [driverData, setDriverData] = useState();
  const [companies, setCompanies] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [driverName, setDriverName] = useState("");
  const [driverLastName, setDriverLastName] = useState("");
  const [rfid, setRfid] = useState("");
  const [driverLicense, setDriverLicense] = useState("");
  const [licenseIssueDate, setLicenseIssueDate] = useState({ year: "", month: "", day: "" }); // Estado para la fecha de emisión
  const [licenseExpireDate, setLicenseExpireDate] = useState({ year: "", month: "", day: "" }); // Estado para la fecha de expiración

  useEffect(() => {
    if (id != null || id !== undefined) {
      ListItems(`${driverURL}/${id}`, setDriverData);
      console.log(`${driverURL}/${id}`);
    }
  }, [id]);

  useEffect(() => {
    if (driverData) {
      setDriverName(driverData.name);
      setDriverLastName(driverData.lastName);
      setRfid(driverData.rfid);
      setDriverLicense(driverData.driverLicense);
      setLicenseIssueDate({ year: driverData.licenseIssueDate[0], month: driverData.licenseIssueDate[1], day: driverData.licenseIssueDate[2] }); // Establecer fecha de emisión
      setLicenseExpireDate({ year: driverData.licenseExpireDate[0], month: driverData.licenseExpireDate[1], day: driverData.licenseExpireDate[2] }); // Establecer fecha de expiración
      setSelectedCompany({ value: driverData.companyModel.id, label: driverData.companyModel.name });
    }
  }, [driverData]);

  useEffect(() => {
    ListItems(`${companiesURL}`, setCompanies);
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      ListItems(`${vehiclesByCompanyURL}/${selectedCompany.value}`, setVehicles);
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (rolId !== "1" && companyId) {
      const selectedCompany = companies.find((company) => company.id === companyId);
      setSelectedCompany({ value: selectedCompany.id, label: selectedCompany.name });
    }
  }, [rolId, companyId, companies]);

  const companyOptions = companies.map((company) => ({
    value: company.id,
    label: company.name,
  }));

  const handleSaveDriver = async () => {
    const requestData = {
      name: driverName,
      lastName: driverLastName,
      rfid,
      driverLicense,
      licenseIssueDate: [licenseIssueDate.year, licenseIssueDate.month, licenseIssueDate.day], // Incluir fecha de emisión en la solicitud
      licenseExpireDate: [licenseExpireDate.year, licenseExpireDate.month, licenseExpireDate.day], // Incluir fecha de expiración en la solicitud
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
        await editItem(`${driverURL}/${id}`, requestData);
      } else {
        await agregarElementoAPI(driverURL, requestData);
      }
      navigate("/driver-admin");
    } catch (error) {
      console.error("Error al guardar el conductor:", error);
    }
  };

  return (
    <div className="g-background">
      <NavbarCommon />
      <div style={{ border: "2px solid white", height: "90vh", padding: "20px" }}>
        <Button onClick={() => navigate("/driver-admin")} className="back-button">
          Atras
        </Button>
        <h1 style={{ color: "white" }}>Agregar Conductor</h1>
        <div style={{ width: "80%", margin: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <Form.Group controlId="driverName" style={{ flex: 1, marginRight: "10px" }}>
              <Form.Label style={{ color: "white" }}>Nombre del Conductor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del conductor"
                style={{ backgroundColor: "white", color: "black" }}
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="driverLastName" style={{ flex: 1 }}>
              <Form.Label style={{ color: "white" }}>Apellido del Conductor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el apellido del conductor"
                style={{ backgroundColor: "white", color: "black" }}
                value={driverLastName}
                onChange={(e) => setDriverLastName(e.target.value)}
              />
            </Form.Group>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <Form.Group controlId="rfid" style={{ flex: 1, marginRight: "10px" }}>
              <Form.Label style={{ color: "white" }}>RFID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el RFID"
                style={{ backgroundColor: "white", color: "black" }}
                value={rfid}
                onChange={(e) => setRfid(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="driverLicense" style={{ flex: 1 }}>
              <Form.Label style={{ color: "white" }}>Licencia de Conductor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la Licencia de Conductor"
                style={{ backgroundColor: "white", color: "black" }}
                value={driverLicense}
                onChange={(e) => setDriverLicense(e.target.value)}
              />
            </Form.Group>
          </div>

          {/* Contenedor flex para fecha de emisión y expiración de licencia */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            {/* Input para Fecha de Emisión de Licencia */}
            <Form.Group controlId="licenseIssueDate" style={{ flex: 1, marginRight: "10px" }}>
              <Form.Label style={{ color: "white" }}>Fecha de Emisión</Form.Label>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Form.Control
                  type="number"
                  placeholder="Año"
                  style={{ backgroundColor: "white", color: "black", marginRight: "5px", flex: 1 }}
                  value={licenseIssueDate.year}
                  onChange={(e) => setLicenseIssueDate({ ...licenseIssueDate, year: e.target.value })}
                />
                <Form.Control
                  type="number"
                  placeholder="Mes"
                  style={{ backgroundColor: "white", color: "black", marginRight: "5px", flex: 1 }}
                  value={licenseIssueDate.month}
                  onChange={(e) => setLicenseIssueDate({ ...licenseIssueDate, month: e.target.value })}
                />
                <Form.Control
                  type="number"
                  placeholder="Día"
                  style={{ backgroundColor: "white", color: "black", flex: 1 }}
                  value={licenseIssueDate.day}
                  onChange={(e) => setLicenseIssueDate({ ...licenseIssueDate, day: e.target.value })}
                />
              </div>
            </Form.Group>

            {/* Input para Fecha de Expiración de Licencia */}
            <Form.Group controlId="licenseExpireDate" style={{ flex: 1 }}>
              <Form.Label style={{ color: "white" }}>Fecha de Expiración</Form.Label>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Form.Control
                  type="number"
                  placeholder="Año"
                  style={{ backgroundColor: "white", color: "black", marginRight: "5px", flex: 1 }}
                  value={licenseExpireDate.year}
                  onChange={(e) => setLicenseExpireDate({ ...licenseExpireDate, year: e.target.value })}
                />
                <Form.Control
                  type="number"
                  placeholder="Mes"
                  style={{ backgroundColor: "white", color: "black", marginRight: "5px", flex: 1 }}
                  value={licenseExpireDate.month}
                  onChange={(e) => setLicenseExpireDate({ ...licenseExpireDate, month: e.target.value })}
                />
                <Form.Control
                  type="number"
                  placeholder="Día"
                  style={{ backgroundColor: "white", color: "black", flex: 1 }}
                  value={licenseExpireDate.day}
                  onChange={(e) => setLicenseExpireDate({ ...licenseExpireDate, day: e.target.value })}
                />
              </div>
            </Form.Group>
          </div>

          <Form.Group controlId="company" style={{ marginBottom: "20px" }}>
            <Form.Label style={{ color: "white" }}>Compañía</Form.Label>
            <Select
              options={companyOptions}
              onChange={(selected) => setSelectedCompany(selected)}
              value={selectedCompany}
            />
          </Form.Group>

          <Form.Group controlId="vehicle" style={{ marginBottom: "20px" }}>
            <Form.Label style={{ color: "white" }}>Vehículo</Form.Label>
            <Select
              options={vehicles.map((vehicle) => ({
                value: vehicle.id,
                label: vehicle.licensePlate,
              }))}
              onChange={(selected) => setSelectedVehicle(selected)}
              value={selectedVehicle}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleSaveDriver}>
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
}
