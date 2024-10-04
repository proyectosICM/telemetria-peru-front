import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../../common/navbarCommon";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ListItems } from "../../../hooks/listItems";
import { companiesURL } from "../../../api/apiurls";
import { editItem } from "../../../hooks/editItem";
import { agregarElementoAPI } from "../../../hooks/agregarElementoAPI";
import Swal from "sweetalert2";

export function AddCompanyForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const rolId = localStorage.getItem("rolId");

  const [companiesData, setCompaniesData] = useState("");
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    if (id) {
      ListItems(`${companiesURL}/${id}`, setCompaniesData);
    }
  }, [id]);

  useEffect(() => {
    if (companiesData) {
      setCompanyName(companiesData.name);
    }
  }, [companiesData]);

  const handleSaveCompany = async () => {
    const requestData = {
      name: companyName,
    };
    try {
      if (id != null || id !== undefined) {
        const response = await editItem(`${companiesURL}/${id}`, requestData);
        console.log(response.status);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Empresa editada con éxito",
          });
        }
      } else {
        const response = await agregarElementoAPI(companiesURL, requestData);
        if (response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Empresa guardada con éxito",
          });
        }
      }
      await navigate("/company-admin");
    } catch (error) {
      console.error("Error al guardar la batería:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Hubo un error al guardar los datos. Inténtalo nuevamente. ${error.response.data}`,
      });
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
          {/* Input para nombre de la batería */}
          <Form.Group controlId="batteryName" style={{ marginBottom: "20px" }}>
            <Form.Label style={{ color: "white" }}>Nombre de la nueva empresa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de la batería"
              style={{ backgroundColor: "white", color: "black" }}
              value={companyName}
              isDisabled={rolId !== "1"}
              onChange={(e) => setCompanyName(e.target.value)}
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
