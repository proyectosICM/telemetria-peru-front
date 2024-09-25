import React, { useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import preguntas from "../../data/trucks-T1-CL/preguntas-t1.json";
import { PreguntaCL } from "../../common/preguntaCL";

export function Example() {
  const navigate = useNavigate();
  const { type } = useParams();

  const [respuestas, setRespuestas] = useState({});
  const [observaciones, setObservaciones] = useState("");
  const [conductor, setConductor] = useState(""); // Manejar estado para el conductor
  const [kilometraje, setKilometraje] = useState(""); // Manejar estado para el kilometraje

  const handleSeleccion = (categoria, pregunta, opcion) => {
    setRespuestas((prevState) => ({
      ...prevState,
      [categoria]: {
        ...prevState[categoria],
        [pregunta]: opcion,
      },
    }));
  };

  const descargarJSON = (contenido, nombreArchivo) => {
    const blob = new Blob([JSON.stringify(contenido, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = () => {
    const dataToDownload = {
      conductor,
      kilometraje,
      respuestas,
      observaciones,
    };

    // Imprimir por consola
    console.log(dataToDownload);

    // Descargar el JSON
    descargarJSON(dataToDownload, "inspeccion_unidades_t1.json");
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
            value={conductor} 
            onChange={(e) => setConductor(e.target.value)} // Manejar el cambio
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

        <div>
          {preguntas["Inspección diaria de unidades T1"] &&
            preguntas["Inspección diaria de unidades T1"].map((pregunta) => (
              <div
                key={pregunta.texto}
                style={{
                  margin: "20px 0",
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                }}
              >
                <PreguntaCL
                  style={{ margin: "20px 0" }}
                  numero={pregunta.numero}
                  texto={pregunta.texto}
                  descripcion={pregunta.descripcion}
                  opciones={pregunta.opciones}
                  seleccion={respuestas["Inspección diaria de unidades T1"]?.[pregunta.texto]}
                  onSeleccion={(opcion) => handleSeleccion("Inspección diaria de unidades T1", pregunta.texto, opcion)}
                />
              </div>
            ))}
        </div>

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
