import React, { useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { opcionesCriticasB, opcionesGeneralesB, PreguntaCL } from "../../common/preguntaCL";
import preguntas from "../../data/forklift-CL/preguntas-forklift.json";
import { agregarElementoAPI, agregarElementoAPICL } from "../../hooks/agregarElementoAPI";
import { checklistRecordsURL } from "../../api/apiurls";
// Componente para cada pregunta

export function Example3() {
  const navigate = useNavigate();
  const { type } = useParams();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  // Estado para guardar las respuestas
  const [respuestas, setRespuestas] = useState({});
  const [observaciones1, setObservaciones1] = useState("");
  const [observaciones2, setObservaciones2] = useState("");
  const [observaciones3, setObservaciones3] = useState("");
  const [observaciones4, setObservaciones4] = useState("");

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

  // Función para descargar el archivo JSON
  const descargarJSON = (contenido, nombreArchivo) => {
    const blob = new Blob([JSON.stringify(contenido, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Función para enviar respuestas y observaciones
  const handleSubmit = () => {
    const respuestasFinales = {
      montacargasApagadoNA: {
        ...respuestas["montacargasApagadoN/A"],
        observaciones: observaciones1,
      },
      montacargasApagado: {
        ...respuestas["montacargasApagado"],
        observaciones: observaciones2,
      },
      montacargasEncendido: {
        ...respuestas["montacargasEncendido"],
        observaciones: observaciones3,
      },
      montacargasGolpesRayaduras: {
        ...respuestas["montacargasGolpesRayaduras"],
        observacionesAdicionales: observaciones4,
      },
    };

    // Estructura del objeto que necesitas enviar
    const requestData = {
      checklistRecordModel: {
        name: "Revisión Diaria",
        vehicleModel: {
          id: selectedVehicleId,
        },
        checklistTypeModel: {
          id: 1,
        },
      },
      jsonData: respuestasFinales,
    };

    // Llamada a la API
    agregarElementoAPI(`${checklistRecordsURL}`, requestData);
    navigate("/checklist-panel")
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
          <h2>Operador Asignado al Equipo:</h2>
          <Form.Control type="text" placeholder="Ingrese el nombre del conductor" />
        </div>

        {/* Lectura Horómetro */}
        <div style={{ margin: "20px 0" }}>
          <h2>Lectura Horómetro:</h2>
          <Form.Control type="text" placeholder="Ingrese la lectura del horómetro" />
        </div>

        {/* Montacargas Nro. */}
        <div style={{ margin: "20px 0" }}>
          <h2>Montacargas Nro.:</h2>
          <Form.Control type="text" placeholder="Ingrese el número del montacargas" />
        </div>

        {/* Título de Inspección vehicular */}
        <h1>Inspección diaria de unidades ({type})</h1>

        {/* Sección de preguntas Montacargas apagado N/A */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>Montacargas Apagado N/A</h3>
          <p>
            * NO operar en caso de que alguno de estos puntos críticos falle (resaltados en rojo): Extintor, claxón, cinturón, luces, alarma de
            reversa, frenos, freno de mano, ruido extraño.
          </p>
          {preguntas["montacargasApagadoN/A"] &&
            preguntas["montacargasApagadoN/A"].map((pregunta) => (
              <PreguntaCL
                key={pregunta.texto}
                numero={pregunta.numero}
                texto={pregunta.texto}
                opciones={pregunta.opciones}
                seleccion={respuestas["montacargasApagadoN/A"]?.[pregunta.texto]}
                onSeleccion={(opcion) => handleSeleccion("montacargasApagadoN/A", pregunta.texto, opcion)}
              />
            ))}
        </div>

        {/* Observaciones */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>Observaciones Montacargas Apagado N/A</h3>
          <Form.Group controlId="observaciones">
            <Form.Label>Observaciones:</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Escribe tus observaciones aquí..."
              value={observaciones1}
              onChange={(e) => setObservaciones1(e.target.value)}
            />
          </Form.Group>
        </div>

        {/* Sección de preguntas críticas */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>Montacargas Apagado</h3>
          <p>
            * NO operar en caso de que alguno de estos puntos críticos falle (resaltados en rojo): Extintor, claxón, cinturón, luces, alarma de
            reversa, frenos, freno de mano, ruido extraño.
          </p>
          {preguntas["montacargasApagado"] &&
            preguntas["montacargasApagado"].map((pregunta) => (
              <PreguntaCL
                key={pregunta.texto}
                numero={pregunta.numero}
                texto={pregunta.texto}
                opciones={pregunta.opciones}
                seleccion={respuestas["montacargasApagado"]?.[pregunta.texto]}
                onSeleccion={(opcion) => handleSeleccion("montacargasApagado", pregunta.texto, opcion)}
              />
            ))}
        </div>

        {/* Observaciones */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>Observaciones Montacargas Apagado</h3>
          <Form.Group controlId="observaciones">
            <Form.Label>Observaciones:</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Escribe tus observaciones aquí..."
              value={observaciones2}
              onChange={(e) => setObservaciones2(e.target.value)}
            />
          </Form.Group>
        </div>

        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>Montacargas Encendido</h3>
          <p>
            * NO operar en caso de que alguno de estos puntos críticos falle (resaltados en rojo): Extintor, claxón, cinturón, luces, alarma de
            reversa, frenos, freno de mano, ruido extraño.
          </p>
          {preguntas["montacargasEncendido"] &&
            preguntas["montacargasEncendido"].map((pregunta) => (
              <PreguntaCL
                key={pregunta.texto}
                numero={pregunta.numero}
                texto={pregunta.texto}
                opciones={pregunta.opciones}
                seleccion={respuestas["montacargasEncendido"]?.[pregunta.texto]}
                onSeleccion={(opcion) => handleSeleccion("montacargasEncendido", pregunta.texto, opcion)}
              />
            ))}
        </div>

        {/* Observaciones */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>Observaciones Montacargas Encendido</h3>
          <Form.Group controlId="observaciones">
            <Form.Label>Observaciones:</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Escribe tus observaciones aquí..."
              value={observaciones3}
              onChange={(e) => setObservaciones3(e.target.value)}
            />
          </Form.Group>
        </div>

        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>No presenta Golpes menores, Rayaduras o Raspones ?</h3>
          {preguntas["montacargasGolpesRayaduras"] &&
            preguntas["montacargasGolpesRayaduras"].map((pregunta) => (
              <PreguntaCL
                key={pregunta.texto}
                numero={pregunta.numero}
                texto={pregunta.texto}
                opciones={pregunta.opciones}
                seleccion={respuestas["montacargasGolpesRayaduras"]?.[pregunta.texto]}
                onSeleccion={(opcion) => handleSeleccion("montacargasGolpesRayaduras", pregunta.texto, opcion)}
              />
            ))}
        </div>

        {/* Observaciones */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>Observaciones adicionales</h3>
          <Form.Group controlId="observaciones">
            <Form.Label>Observaciones:</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Escribe tus observaciones aquí..."
              value={observaciones4}
              onChange={(e) => setObservaciones4(e.target.value)}
            />
          </Form.Group>
        </div>

        {/* Botón para enviar */}
        <Button variant="primary" style={{ width: "100%", margin: "20px 0" }} onClick={handleSubmit}>
          Enviar
        </Button>
      </div>
    </div>
  );
}
