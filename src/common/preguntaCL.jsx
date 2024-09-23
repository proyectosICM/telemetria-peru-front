import { useState } from "react";
import { Button } from "react-bootstrap";

export function PreguntaCL({ numero, texto, opciones, seleccion, onSeleccion }) {
  // Cambiamos el estado a un único valor para la opción seleccionada
  const [selectedOption, setSelectedOption] = useState(seleccion);

  const handleButtonClick = (opcionLabel) => {
    // Actualizamos el estado para reflejar la opción seleccionada
    setSelectedOption(opcionLabel);
    onSeleccion(opcionLabel);
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <h4>{`${numero}| ${texto}`}</h4>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {opciones.map((opcion, index) => (
          <Button
            key={index}
            variant={selectedOption === opcion.label ? "primary" : opcion.variant}
            style={{ flex: 1, padding: "10px 20px" }}
            onClick={() => handleButtonClick(opcion.label)}
          >
            {opcion.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
// Opciones para los botones
export const opcionesGeneralesB = [
  { label: "Bueno", variant: "success" },
  { label: "Malo", variant: "danger" },
  { label: "N/A", variant: "secondary" },
];

export const opcionesCriticasB = [
  { label: "Bueno", variant: "success" },
  { label: "Malo", variant: "danger" },
];
