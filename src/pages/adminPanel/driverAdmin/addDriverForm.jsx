import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../../common/navbarCommon";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ListItems } from "../../../hooks/listItems";
import { batteryURL, companyRoutes, driverURL } from "../../../api/apiurls";
import Select from "react-select";
import { agregarElementoAPI } from "../../../hooks/addItem";
import { editItem } from "../../../hooks/editItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useSaveItem } from "../../../hooks/useSaveCRUDItem";
import { alertMessageError } from "../../../messages/apiResponseMessages";

export function AddDriverForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const rolId = localStorage.getItem("rolId");
  const companyId = localStorage.getItem("companyId");

  const [driverData, setDriverData] = useState();
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [driverName, setDriverName] = useState("");
  const [driverLastName, setDriverLastName] = useState("");
  const [rfid, setRfid] = useState("");
  const [driverLicense, setDriverLicense] = useState("");
  const [driverPhoneNumber, setDriverPhoneNumber] = useState("");
  const [licenseIssueDate, setLicenseIssueDate] = useState(null);
  const [licenseExpireDate, setLicenseExpireDate] = useState(null);
  const { saveItem } = useSaveItem(driverURL, "/driver-admin");

  useEffect(() => {
    if (id != null || id !== undefined) {
      ListItems(`${driverURL}/${id}`, setDriverData);
    }
  }, [id]);

  useEffect(() => {
    if (driverData) {
      setDriverName(driverData.name);
      setDriverLastName(driverData.lastName);
      setRfid(driverData.rfid);
      setDriverLicense(driverData.driverLicense);
      setDriverPhoneNumber(driverData.driverPhoneNumber);
      setLicenseIssueDate(new Date(driverData.licenseIssueDate));
      setLicenseExpireDate(new Date(driverData.licenseExpireDate));
      setSelectedCompany({ value: driverData.companyModel.id, label: driverData.companyModel.name });
    }
  }, [driverData]);

  useEffect(() => {
    ListItems(`${companyRoutes.base}`, setCompanies);
  }, []);

  useEffect(() => {
    if (rolId !== "1" && companyId && companies.length > 0) {
      const selectedCompany = companies.find((company) => company.id === parseInt(companyId));
      setSelectedCompany({ value: selectedCompany.id, label: selectedCompany.name });
    }
  }, [rolId, companyId, companies]);

  const companyOptions = companies.map((company) => ({
    value: company.id,
    label: company.name,
  }));

  const handleSaveDriver = async () => {
    if (
      !driverName ||
      !driverLastName ||
      !rfid ||
      !driverLicense ||
      !driverPhoneNumber ||
      !selectedCompany ||
      !licenseIssueDate ||
      !licenseExpireDate
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos requeridos.",
      });
      return;
    }

    const requestData = {
      name: driverName,
      lastName: driverLastName,
      driverPhoneNumber: driverPhoneNumber,
      rfid: rfid,
      driverLicense,
      licenseIssueDate: [licenseIssueDate.getFullYear(), licenseIssueDate.getMonth() + 1, licenseIssueDate.getDate()],
      licenseExpireDate: [licenseExpireDate.getFullYear(), licenseExpireDate.getMonth() + 1, licenseExpireDate.getDate()],
      companyModel: {
        id: selectedCompany?.value,
      },
    };
    console.log(requestData);
    try {
      await saveItem(id, requestData);
    } catch (error) {
      alertMessageError(error);
      return;
    }
  };

  // Función para validar solo letras, permitiendo mayúsculas y tildes
  const handleTextInput = (setState) => (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*$/; // Regex que permite letras, tildes y espacios
    if (regex.test(value)) {
      setState(value); // Solo actualiza el estado si es válido
    }
  };

  // Función para validar el RFID (suponiendo que debe ser alfanumérico)
  const handleRfidInput = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9]*$/; // Regex que permite letras y números
    if (regex.test(value)) {
      setRfid(value);
    }
  };

  // Función para validar la licencia de conductor
  const handleDriverLicenseInput = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9-]*$/; // Regex que permite letras, números y guiones
    if (regex.test(value)) {
      setDriverLicense(value);
    }
  };

  // Función para validar el número de celular
  const handleDriverPhoneNumberInput = (e) => {
    const value = e.target.value;
    const regex = /^[+\d-\s]*$/; // Regex que permite dígitos, +, - y espacios
    if (regex.test(value)) {
      setDriverPhoneNumber(value);
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
                maxLength="50"
                onChange={handleTextInput(setDriverName)} // Llama a la función de validación
              />
            </Form.Group>

            <Form.Group controlId="driverLastName" style={{ flex: 1 }}>
              <Form.Label style={{ color: "white" }}>Apellido del Conductor</Form.Label>
              <Form.Control
                type="text"
                maxLength="50"
                placeholder="Ingrese el apellido del conductor"
                style={{ backgroundColor: "white", color: "black" }}
                value={driverLastName}
                onChange={handleTextInput(setDriverLastName)} // Llama a la función de validación
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
                maxLength="10"
                onChange={handleRfidInput} // Llama a la función de validación
              />
            </Form.Group>

            <Form.Group controlId="driverLicense" style={{ flex: 1 }}>
              <Form.Label style={{ color: "white" }}>Licencia de Conductor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la Licencia de Conductor"
                style={{ backgroundColor: "white", color: "black" }}
                value={driverLicense}
                maxLength="20"
                onChange={handleDriverLicenseInput} // Llama a la función de validación
              />
            </Form.Group>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <Form.Group controlId="driverPhoneNumber" style={{ flex: 1, marginRight: "10px" }}>
              <Form.Label style={{ color: "white" }}>Número de Celular</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el número de celular"
                style={{ backgroundColor: "white", color: "black" }}
                value={driverPhoneNumber}
                maxLength="15"
                onChange={handleDriverPhoneNumberInput} // Llama a la función de validación
              />
            </Form.Group>

            <Form.Group controlId="company" style={{ flex: 1 }}>
              <Form.Label style={{ color: "white" }}>Compañía</Form.Label>
              <Select options={companyOptions} value={selectedCompany} onChange={setSelectedCompany} placeholder="Seleccione una compañía" />
            </Form.Group>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <Form.Group controlId="licenseIssueDate" style={{ flex: 1, marginRight: "10px" }}>
              <Form.Label style={{ color: "white" }}>Fecha de Emisión de Licencia</Form.Label>
              <DatePicker
                selected={licenseIssueDate}
                onChange={(date) => setLicenseIssueDate(date)}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                placeholderText="Seleccione la fecha"
              />
            </Form.Group>

            <Form.Group controlId="licenseExpireDate" style={{ flex: 1 }}>
              <Form.Label style={{ color: "white" }}>Fecha de Vencimiento de Licencia</Form.Label>
              <DatePicker
                selected={licenseExpireDate}
                onChange={(date) => setLicenseExpireDate(date)}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                placeholderText="Seleccione la fecha"
              />
            </Form.Group>
          </div>

          <Button onClick={handleSaveDriver} style={{ marginTop: "20px" }}>
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
}
