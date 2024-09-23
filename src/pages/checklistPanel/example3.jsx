import React, { useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { opcionesCriticasB, opcionesGeneralesB, PreguntaCL } from "../../common/preguntaCL";
import preguntas from "../../data/forklift-CL/preguntas-forklift.json";
// Componente para cada pregunta

export function Example3() {
  const navigate = useNavigate();
  const { type } = useParams();

  // Estado para guardar las respuestas
  const [respuestas, setRespuestas] = useState({});
  const [observaciones, setObservaciones] = useState("");

  // Función para actualizar la respuesta de una pregunta
  const handleSeleccion = (pregunta, opcion) => {
    setRespuestas((prevState) => ({ ...prevState, [pregunta]: opcion }));
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
                seleccion={respuestas[pregunta.texto]}
                onSeleccion={(opcion) => handleSeleccion(pregunta.texto, opcion)}
              />
            ))}
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
                seleccion={respuestas[pregunta.texto]}
                onSeleccion={(opcion) => handleSeleccion(pregunta.texto, opcion)}
              />
            ))}
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
                seleccion={respuestas[pregunta.texto]}
                onSeleccion={(opcion) => handleSeleccion(pregunta.texto, opcion)}
              />
            ))}
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
                seleccion={respuestas[pregunta.texto]}
                onSeleccion={(opcion) => handleSeleccion(pregunta.texto, opcion)}
              />
            ))}
        </div>

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
      </div>
    </div>
  );
}
