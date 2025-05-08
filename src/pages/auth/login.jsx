import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";

import { useAuth } from "./useAuth";

import "./login.css";
import { LogoutToken } from "../../hooks/logoutToken";

export function Login() {
  const navigate = useNavigate();
  const token = localStorage.getItem("tp_token");

  LogoutToken();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, isLoading, error } = useAuth();

  const onSubmit = (data) => {
    login(data.username, data.password);
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url('/images/login-fondo.jpg')`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="login-form">
        <h5>TelemetriaPeru</h5>
        <h1>Iniciar sesión</h1>
        <h2>
          <FaUserCircle />
        </h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="text" placeholder="Ingresa el usuario" {...register("username", { required: true })} />
            {errors.username && <span>Este campo es obligatorio</span>}
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Ingresa la contraseña" {...register("password", { required: true })} />
            {errors.password && <span>Este campo es obligatorio</span>}
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isLoading} className="login-button">
            Iniciar sesión
          </Button>
          {error && <div>{error}</div>}
        </Form>
      </div>
    </div>
  );
}
