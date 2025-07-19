import React, { useState } from "react";
import { useGetByVehicleId } from "../../../api/hooks/useTireSensor";

export function ForkliftWith6Tires() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const { data: tireData, isLoading, error } = useGetByVehicleId(selectedVehicleId);

  const [selectedTireIndex, setSelectedTireIndex] = useState(null);

  const handleSelectTire = (pos) => {
    console.log(pos);
    setSelectedTireIndex(pos - 1); // pos 1-6 → índice 0-5
    localStorage.setItem("tireSelected", pos);
  };

  const selectedTire = tireData?.[selectedTireIndex];

  return (
    <>
      <div style={{ margin: "auto", width: "80%", height: "65%", display: "flex", flexDirection: "row" }}>
        {/* Lado Izquierdo */}
        <div className="fkl-tires-l">
          {/* Eje delantero izquierdo */}
          <div className="fkl-tire-row">
            <div className="fkl-tire" onClick={() => handleSelectTire(1)} title="1-FL-IN"></div>
            <div className="fkl-tire" onClick={() => handleSelectTire(2)} title="1-FL-IN"></div>
          </div>

          <div className="fkl-blank"></div>
          {/* Eje trasero izquierdo */}
          <div className="fkl-tire" onClick={() => handleSelectTire(5)} title="5-RL"></div>
        </div>

        {/* Base montacargas */}
        <div className="fkl-base-forklift"></div>
 
        {/* Lado Derecho */}
        <div className="fkl-tires-r">
          {/* Eje delantero derecho */}
          <div className="fkl-tire-row">
            <div className="fkl-tire" onClick={() => handleSelectTire(3)} title="1-FL-IN"></div>
            <div className="fkl-tire" onClick={() => handleSelectTire(4)} title="1-FL-IN"></div>
          </div>

          <div className="fkl-blank"></div>
          {/* Eje trasero derecho */}
          <div className="fkl-tire" onClick={() => handleSelectTire(6)} title="6-RR"></div>
        </div>
      </div>

      {/* Información del neumático seleccionado */}
      {selectedTire && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h3>Información de la llanta seleccionada</h3>
          <p>
            <strong>ID:</strong> {selectedTire.id}
          </p>
          <p>
            <strong>Identificación:</strong> {selectedTire.identificationCode}
          </p>
          <p>
            <strong>Temperatura:</strong> {selectedTire.temperature != null ? `${selectedTire.temperature} °C` : "Sin datos"}
          </p>
          <p>
            <strong>Presión:</strong> {selectedTire.pressure != null ? `${selectedTire.pressure} psi` : "Sin datos"}
          </p>
          <p>
            <strong>Batería:</strong> {selectedTire.batteryLevel != null ? `${selectedTire.batteryLevel} %` : "Sin datos"}
          </p>
          <p>
            <strong>Ubicación:</strong> {selectedTire.tirePositioningModel?.locationCode ?? "Sin datos"}
          </p>
        </div>
      )}
    </>
  );
}
