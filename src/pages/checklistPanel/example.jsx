import React, { useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { PreguntaCL } from "../../common/preguntaCL";
import preguntas from "../../data/trucks-T1-CL/p-unidades.json";
import { agregarElementoAPI } from "../../hooks/agregarElementoAPI";
import { checklistRecordsURL } from "../../api/apiurls";
export function Example() {
  const navigate = useNavigate();
  const { type } = useParams();

  const [respuestas, setRespuestas] = useState({});
  const [observaciones, setObservaciones] = useState("");
  const [conductor, setConductor] = useState("");
  const [kilometraje, setKilometraje] = useState("");
  const [nombreConductor, setNombreConductor] = useState("");
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const companyId = localStorage.getItem("companyId");

  const handleSeleccion = (categoria, pregunta, opcion) => {
    setRespuestas((prevState) => ({
      ...prevState,
      [categoria]: {
        ...prevState[categoria],
        [pregunta]: opcion,
      },
    }));
  };

  const handleSubmit = () => {
    const respuestasFinales = {
      info: {
        nombreConductor,
        kilometraje,
        Observaciones: observaciones,
      },
      "Inspección diaria de unidades": {
        ...respuestas["Inspección diaria de unidades"],
      },
    };

    const requestData = {
      checklistRecordModel: {
        name: `Unidades (${type})`,
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
            onChange={(e) => setKilometraje(e.target.value)} // Manejar el cambio
          />
        </div>

        {/* Título de Inspección vehicular de salida */}
        <div style={{ margin: "20px 0" }}></div>
        <h1>Inspección diaria de unidades ({type})</h1>
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
                  descripcion={pregunta.descripcion}
                  opciones={pregunta.opciones}
                  seleccion={respuestas[categoria]?.[pregunta.texto]}
                  onSeleccion={(opcion) => handleSeleccion(categoria, pregunta.texto, opcion)}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Panel de Documentación del Vehículo y Operador/Conductor */}
        {/* 16 | Observaciones - si marco "NO" arriba - describir */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>16 | Observaciones - si marcó "Malo" arriba - describir</h3>
          <p>Por favor, describa el problema encontrado en el sistema de frenos:</p>
          <Form.Group controlId="observaciones">
            <Form.Label>Observaciones:</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Escribe tus observaciones aquí..."
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            />
          </Form.Group>
        </div>

        {/* Botón Enviar */}
        <div style={{ margin: "20px 0" }}>
          <Button variant="primary" style={{ width: "100%", margin: "20px 0" }} onClick={handleSubmit}>
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}
