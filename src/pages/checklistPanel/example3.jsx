import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { PreguntaCL } from "../../common/preguntaCL";
import { addImageAPI, addElementWithResponseAPI } from "../../hooks/addItem";
import { checklistRecordsRoutes, imageChecklistRoutes } from "../../api/apiurls";

import preguntas from "../../data/forklift-CL/preguntas-forklift.json";
import { useTimer } from "../../hooks/useTimer";
import { useImageHandler } from "../../hooks/useImageHandler";

export function Example3() {
  const navigate = useNavigate();
  const { type } = useParams();
  const { licensePlate } = useParams();

  // Variables de local Storage
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const companyId = localStorage.getItem("companyId");

  // Estado para guardar la informacion de cabecera
  const [nombreOperador, setNombreOperador] = useState("");
  const [lecturaHorometro, setLecturaHorometro] = useState("");
  const [numeroMontacargas, setNumeroMontacargas] = useState(licensePlate ? licensePlate : "");

  // Estados para guardar las respuestas y observaciones
  const [respuestas, setRespuestas] = useState({});
  const [observaciones1, setObservaciones1] = useState("");
  const [observaciones2, setObservaciones2] = useState("");
  const [observaciones3, setObservaciones3] = useState("");
  const [observaciones4, setObservaciones4] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  const { seconds, isActive, setIsActive } = useTimer(true);
  const { imagenes, handleImageChange, handleRemoveImage } = useImageHandler();

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

  useEffect(() => {
    const requiredSections = ["montacargasApagadoN/A", "montacargasApagado", "montacargasEncendido", "montacargasGolpesRayaduras"];

    const allAnswered = requiredSections.every((section) => {
      return preguntas[section].every((pregunta) => respuestas[section]?.[pregunta.texto]);
    });

    setIsFormValid(allAnswered && nombreOperador && lecturaHorometro && numeroMontacargas);
  }, [respuestas, nombreOperador, lecturaHorometro, numeroMontacargas]);

  const handleSubmit = async () => {
    setIsActive(false);
    const respuestasFinales = {
      Info: {
        Operador: nombreOperador,
        Horometro: lecturaHorometro,
        MontacargasNumero: numeroMontacargas,
      },
      MontacargasApagadoNA: {
        ...respuestas["montacargasApagadoN/A"],
        Observaciones: observaciones1,
      },
      MontacargasApagado: {
        ...respuestas["montacargasApagado"],
        Observaciones: observaciones2,
      },
      MontacargasEncendido: {
        ...respuestas["montacargasEncendido"],
        Observaciones: observaciones3,
      },
      MontacargasGolpesRayaduras: {
        ...respuestas["montacargasGolpesRayaduras"],
        ObservacionesAdicionales: observaciones4,
      },
    };

    // Estructura del objeto que necesitas enviar para el checklist
    const requestData = {
      checklistRecordModel: {
        name: "Revisión Diaria",
        timer: seconds,
        driver: null,
        vehicleModel: {
          id: selectedVehicleId,
        },
        checklistTypeModel: {
          id: 1,
        },
        companyModel: {
          id: companyId,
        },
      },
      jsonData: respuestasFinales,
    };

    try {
      const clid = await addElementWithResponseAPI(`${checklistRecordsRoutes.base}`, requestData);
      for (const imagen of imagenes) {
        const formData = new FormData();
        formData.append("file", imagen);
        await addImageAPI(`${imageChecklistRoutes.base}/${clid.id}`, formData);
      }
      navigate("/checklist-panel");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div className="g-background">
      <NavbarCommon />
      <Button onClick={() => navigate("/checklist-panel")} className="back-button">
        Atras
      </Button>

      <div style={{ margin: "2px 10%", padding: "2px 10%", border: "2px solid white" }}>
        {/* Cronómetro */}
        <div style={{ margin: "20px 0", border: "2px solid white", borderRadius: "10px" }}>
          <h2>Tiempo transcurrido {`${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}`}</h2>
          <p></p>
        </div>

        {/* Sección para el nombre del conductor */}
        <div style={{ margin: "20px 0" }}>
          <h2>Operador Asignado al Equipo:</h2>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre del conductor"
            value={nombreOperador}
            onChange={(e) => setNombreOperador(e.target.value)}
          />
        </div>

        {/* Lectura Horómetro */}
        <div style={{ margin: "20px 0" }}>
          <h2>Lectura Horómetro:</h2>
          <Form.Control
            type="text"
            placeholder="Ingrese la lectura del horómetro"
            value={lecturaHorometro}
            onChange={(e) => setLecturaHorometro(e.target.value)}
          />
        </div>

        {/* Montacargas Nro. */}
        <div style={{ margin: "20px 0" }}>
          <h2>Montacargas Nro.:</h2>
          <Form.Control
            type="text"
            placeholder="Ingrese el número del montacargas"
            value={numeroMontacargas}
            onChange={(e) => setNumeroMontacargas(e.target.value)}
            readOnly={!!licensePlate} // Si licensePlate existe, el campo será de solo lectura
          />
        </div>

        {/* Título de Inspección vehicular */}
        <h1>Check List Montacargas</h1>

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

        {/* Sección para agregar fotos */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>Agregar Fotos</h3>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Sube las fotos de inspección</Form.Label>
            <Form.Control type="file" multiple onChange={handleImageChange} />
          </Form.Group>

          {/* Muestra las imágenes seleccionadas con opción para eliminar */}
          <div>
            {imagenes.length > 0 && <h4>Imágenes seleccionadas:</h4>}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {imagenes.map((imagen, index) => (
                <div key={index} style={{ position: "relative", display: "inline-block" }}>
                  <img src={URL.createObjectURL(imagen)} alt={`preview-${index}`} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                  <Button
                    variant="danger"
                    size="sm"
                    style={{ position: "absolute", top: "5px", right: "5px" }}
                    onClick={() => handleRemoveImage(index)}
                  >
                    X
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botón para enviar */}
        <Button variant="primary" style={{ width: "100%", margin: "20px 0" }} onClick={handleSubmit} disabled={!isFormValid}>
          Enviar
        </Button>
      </div>
    </div>
  );
}
