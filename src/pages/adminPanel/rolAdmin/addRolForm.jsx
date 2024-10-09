import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../../common/navbarCommon";
import { useNavigate, useParams } from "react-router-dom";
import { ListItems } from "../../../hooks/listItems";
import { rolesURL } from "../../../api/apiurls";
import { Button, Form } from "react-bootstrap";
import { alertMessageError, alertMessageValidated } from "../../../messages/apiResponseMessages";
import { useSaveItem } from "../../../hooks/useSaveCRUDItem";

export function AddRolForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [roleData, setRoleData] = useState({ id: "", name: "" });
  const { saveItem } = useSaveItem(rolesURL, "/roles-admin");

  useEffect(() => {
    if (id) {
      ListItems(`${rolesURL}/${id}`, (data) => {
        setRoleData({ ...data });
      });
    }
  }, [id]);

  const handleSaveRole = async () => {
    try {
      alertMessageValidated(roleData.name, "El nombre del rol no puede estar vacío");
      await saveItem(id, { name: roleData.name });
    } catch (error) {
      alertMessageError(error);
      return;
    }
  };

  return (
    <div>
      <NavbarCommon />
      <div style={{ border: "2px solid white", height: "90vh", padding: "20px" }}>
        <Button onClick={() => navigate("/roles-admin")} className="back-button">
          Atrás
        </Button>

        <h1 style={{ color: "white" }}>{id ? "Editar Rol" : "Agregar Rol"}</h1>

        {/* Contenedor para que el ID y el Nombre estén en la misma línea */}
        <div style={{ display: "flex", width: "80%", margin: "20px auto", gap: "20px" }}>
          {/* Campo para mostrar el ID (deshabilitado) */}
          {id && (
            <Form.Group controlId="id" style={{ flexBasis: "20%" }}>
              <Form.Label style={{ color: "white" }}>Id</Form.Label>
              <Form.Control type="text" style={{ backgroundColor: "white", color: "black" }} value={roleData.id} disabled />
            </Form.Group>
          )}

          {/* Input para nombre del rol */}
          <Form.Group controlId="username" style={{ flexBasis: id ? "80%" : "100%" }}>
            <Form.Label style={{ color: "white" }}>Nombre del rol</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del rol"
              style={{ backgroundColor: "white", color: "black" }}
              value={roleData.name}
              onChange={(e) => setRoleData({ ...roleData, name: e.target.value })}
            />
          </Form.Group>
        </div>

        <Button variant="primary" style={{ backgroundColor: "#007bff", border: "none" }} onClick={handleSaveRole}>
          Guardar Rol
        </Button>
      </div>
    </div>
  );
}
