import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../../common/navbarCommon";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ListItems } from "../../../hooks/listItems";
import { editItem } from "../../../hooks/editItem";
import Swal from "sweetalert2";
import { userRoutes, UserURL } from "../../../api/apiurls";
import { addElementAPI } from "../../../hooks/addItem";

export function AddUserForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Para editar un usuario si es que hay un id en la URL

  // Inicializamos el estado del usuario
  const [userData, setUserData] = useState({ username: "", password: "", email: "" });
  const [error, setError] = useState();
  
  useEffect(() => {
    if (id) {
      // Cargamos los datos del usuario si estamos en modo edición
      ListItems(`${userRoutes.base}/${id}`, setUserData, setError);
    }
  }, [id]);

  const handleSaveUser = async () => {
    const requestData = {
      username: userData.username,
      password: userData.password, 
      email: userData.email,
      roleModel: {
        id: 2,
      },
      companyModel: {
        id: 1,
      },
    };

    try {
      if (id) {
        const response = await editItem(`${userRoutes.base}/${id}`, requestData);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Usuario editado con éxito",
          });
        }
      } else {
        const response = await addElementAPI(userRoutes.base, requestData);
        if (response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Usuario guardado con éxito",
          });
        }
      }
      await navigate("/user-admin"); // Cambiar la navegación según sea necesario
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
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
        <Button onClick={() => navigate("/user-admin")} className="back-button">
          Atrás
        </Button>
        <h1 style={{ color: "white" }}>{id ? "Editar Usuario" : "Agregar Usuario"}</h1>
        <div style={{ width: "80%", margin: "auto" }}>
          {/* Input para nombre de usuario */}
          <Form.Group controlId="username" style={{ marginBottom: "20px" }}>
            <Form.Label style={{ color: "white" }}>Nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de usuario"
              style={{ backgroundColor: "white", color: "black" }}
              value={userData.username}
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            />
          </Form.Group>

          {/* Input para correo electrónico */}
          <Form.Group controlId="email" style={{ marginBottom: "20px" }}>
            <Form.Label style={{ color: "white" }}>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese el correo electrónico"
              style={{ backgroundColor: "white", color: "black" }}
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
          </Form.Group>

          {/* Input para contraseña */}
          <Form.Group controlId="password" style={{ marginBottom: "20px" }}>
            <Form.Label style={{ color: "white" }}>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese la contraseña"
              style={{ backgroundColor: "white", color: "black" }}
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
          </Form.Group>
        </div>

        <Button variant="primary" style={{ backgroundColor: "#007bff", border: "none" }} onClick={handleSaveUser}>
          Guardar Usuario
        </Button>
      </div>
    </div>
  );
}
