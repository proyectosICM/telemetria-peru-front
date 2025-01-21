import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../../common/navbarCommon";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ListItems } from "../../../hooks/listItems";
import { companyRoutes } from "../../../api/apiurls";
import { alertMessageError, alertMessageValidated } from "../../../messages/apiResponseMessages";
import { useSaveItem } from "../../../hooks/useSaveCRUDItem";

export function AddCompanyForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const rolId = localStorage.getItem("rolId");

  const [error, setError] = useState();
  const [companyData, setCompanyData] = useState({ id: "", name: "" });
  const { saveItem } = useSaveItem(companyRoutes.base, "/company-admin");

  useEffect(() => {
    if (id) {
      ListItems(`${companyRoutes.base}/${id}`, setCompanyData, setError);
    }
  }, [id]);

  const handleSaveCompany = async () => {
    try {
      alertMessageValidated(companyData.name, "El nombre de la empresa no puede estar vacío");
      await saveItem(id, { name: companyData.name });
    } catch (error) {
      alertMessageError(error);
      return;
    }
  };

  return (
    <div className="g-background">
      <NavbarCommon />
      <div style={{ border: "2px solid white", height: "90vh", padding: "20px" }}>
        <Button onClick={() => navigate("/company-admin")} className="back-button">
          Atras
        </Button>
        <h1 style={{ color: "white" }}>Agregar Empresa</h1>
        <div style={{ width: "80%", margin: "auto" }}>
          {/* Input for Company name */}
          <Form.Group controlId="batteryName" style={{ marginBottom: "20px" }}>
            <Form.Label style={{ color: "white" }}>Nombre de la nueva empresa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de la batería"
              style={{ backgroundColor: "white", color: "black" }}
              value={companyData.name}
              isDisabled={rolId !== "1"}
              onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
            />
          </Form.Group>
        </div>

        <Button variant="primary" style={{ backgroundColor: "#007bff", border: "none" }} onClick={handleSaveCompany}>
          Guardar Empresa
        </Button>
      </div>
    </div>
  );
}
