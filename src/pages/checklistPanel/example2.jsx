import React, { useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { PreguntaCL } from "../../common/preguntaCL"; // Reutiliza este componente para mostrar las preguntas.
import preguntas from "../../data/trucks-T1-CL/p-mf-salida.json"; // Importa el archivo JSON de preguntas.
import { agregarElementoAPI } from "../../hooks/agregarElementoAPI";
import { checklistRecordsURL } from "../../api/apiurls";

export function Example2() {
  const navigate = useNavigate();
  const { type } = useParams();

  // Estado para guardar las respuestas y observaciones
  const [respuestas, setRespuestas] = useState({});
  const [observaciones, setObservaciones] = useState("");
  const [nombreConductor, setNombreConductor] = useState(""); // Estado para el nombre del conductor
  const [kilometraje, setKilometraje] = useState(""); // Estado para el kilometraje
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const companyId = localStorage.getItem("companyId");

  // Función para actualizar la respuesta de una pregunta
  const handleSeleccion = (categoria, pregunta, opcion) => {
    setRespuestas((prevState) => ({
      ...prevState,
      [categoria]: {
        ...prevState[categoria],
        [pregunta]: opcion,
      },
    }));
  };

  // Enviar las respuestas
  const handleSubmit = () => {
    const respuestasFinales = {
      info: {
        nombreConductor,
        kilometraje,
        Observaciones: observaciones,
      },
      implementosSeguridadCalidad: {
        ...respuestas["implementosSeguridadCalidad"],
      },
      lucesElementosSonoros: {
        ...respuestas["lucesElementosSonoros"],
      },
      neumaticos: {
        ...respuestas["neumaticos"],
      },
      capacidadCarga: {
        ...respuestas["capacidadCarga"],
      },
      nivelLiquidos: {
        ...respuestas["nivelLiquidos"],
      },

    };

    // Estructura del objeto que necesitas enviar
    const requestData = {
      checklistRecordModel: {
        name: `Motorfurgon (${type})`,
        vehicleModel: {
          id: selectedVehicleId,
        },
        checklistTypeModel: {
          id: 2,
        },
        companyModel: {
          id: companyId,
        },
      },
      jsonData: respuestasFinales,
    };

    // Llamada a la API
    agregarElementoAPI(`${checklistRecordsURL}`, requestData);
    console.log("Respuestas finales: ", respuestasFinales);
    navigate("/checklist-panel");
  };

  return (
    <div className="g-background">
      <NavbarCommon />
      <Button onClick={() => navigate("/checklist-panel")} className="back-button">
        Atras
      </Button>

      <div style={{ margin: "2px 10%", padding: "2px 10%", border: "2px solid white" }}>
        {/* Sección para el nombre del conductor */}
        <div style={{ margin: "20px 0" }}>
          <h2>Nombre del conductor:</h2>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre del conductor"
            value={nombreConductor}
            onChange={(e) => setNombreConductor(e.target.value)} // Actualiza el estado del nombre
          />
        </div>

        {/* Kilometraje de la unidad */}
        <div style={{ margin: "20px 0" }}>
          <h2>Kilometraje de la unidad:</h2>
          <Form.Control
            type="text"
            placeholder="Ingrese el kilometraje de la unidad"
            value={kilometraje}
            onChange={(e) => setKilometraje(e.target.value)} // Actualiza el estado del kilometraje
          />
        </div>

        {/* Título de Inspección vehicular de salida */}
        <div style={{ margin: "20px 0" }}>
          <h1>Inspección diaria de unidad ({type})</h1>
        </div>

        {/* Sección de preguntas basadas en JSON */}
        {Object.keys(preguntas).map((categoria) => (
          <div
            key={categoria}
            style={{
              margin: "20px 0",
              backgroundColor: "black",
              color: "white",
              padding: "20px",
              border: "2px solid white",
              borderRadius: "10px",
            }}
          >
            <h3>{categoria}</h3>
            <div className="row">
              {preguntas[categoria].map((pregunta) => (
                <PreguntaCL
                  key={pregunta.texto}
                  numero={pregunta.numero}
                  texto={pregunta.texto}
                  opciones={pregunta.opciones}
                  seleccion={respuestas[categoria]?.[pregunta.texto]}
                  onSeleccion={(opcion) => handleSeleccion(categoria, pregunta.texto, opcion)}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Observaciones */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>Observaciones</h3>
          <Form.Group controlId="observaciones">
            <Form.Label>Observaciones:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Escribe tus observaciones aquí..."
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            />
          </Form.Group>
        </div>

        {/* Botón para enviar */}
        <Button onClick={handleSubmit}>Enviar</Button>
      </div>
    </div>
  );
}
