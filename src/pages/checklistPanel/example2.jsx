import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { handleSeleccionCL, PreguntaCL } from "../../common/preguntaCL";
import preguntas from "../../data/trucks-T1-CL/p-mf.json";
import { checklistRecordsRoutes } from "../../api/apiurls";
import { useTimer } from "../../hooks/useTimer";
import { useImageHandler } from "../../hooks/useImageHandler";
import { addElementAPI } from "../../hooks/addItem";

export function Example2() {
  const navigate = useNavigate();
  const { type } = useParams();

  // Variables de local Storage
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const companyId = localStorage.getItem("companyId");

  // Estado para guardar la informacion de cabecera
  const [nombreConductor, setNombreConductor] = useState("");
  const [kilometraje, setKilometraje] = useState("");

  // Estado para guardar las respuestas y observaciones
  const [respuestas, setRespuestas] = useState({});
  const [observaciones, setObservaciones] = useState("");

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
    const requiredSections = ["implementosSeguridadCalidad", "lucesElementosSonoros", "neumaticos", "capacidadCarga", "nivelLiquidos"];

    const allAnswered = requiredSections.every((section) => {
      return preguntas[section].every((pregunta) => respuestas[section]?.[pregunta.texto]);
    });

    setIsFormValid(allAnswered && nombreConductor && kilometraje);
  }, [respuestas, nombreConductor, kilometraje]);

  //handleSeleccionCL(categoria, pregunta, opcion)

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
        timer: seconds,
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
    addElementAPI(`${checklistRecordsRoutes.base}`, requestData);
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
        {/* Cronómetro */}
        <div style={{ margin: "20px 0", border: "2px solid white", borderRadius: "10px" }}>
          <h2>Tiempo transcurrido {`${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}`}</h2>
          <p></p>
        </div>

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
          <h1>Inspección diaria de unidad MOTOFURGON ({type})</h1>
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
                  descripcion={pregunta.descripcion}
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

        {/* Muestra las imágenes seleccionadas con opción para eliminar */}

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
