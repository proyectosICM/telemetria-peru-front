import React, { useState } from "react";
import { useGetByVehicleId } from "../../../api/hooks/useTireSensor";

export function TruckWith4Tires() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const { data: tireData, isLoading, error } = useGetByVehicleId(selectedVehicleId);

  const [selectedTireIndex, setSelectedTireIndex] = useState(null);

  const handleSelectTire = (pos) => {
    console.log(pos);
    setSelectedTireIndex(pos - 1); // pos 1-4 → índice 0-3
    localStorage.setItem("tireSelected", pos);
  };

  const selectedTire = tireData?.[selectedTireIndex];

  return (
    <>
      <div style={{ margin: "auto", width: "80%", height: "65%", display: "flex", flexDirection: "row" }}>
        {/* Lado Izquierdo */}
        <div className="tck-tires-l">
          <div className="tck-tire" onClick={() => handleSelectTire(1)}></div>
          <div className="tck-blank"></div>
          <div className="tck-tire" onClick={() => handleSelectTire(3)}></div>
        </div>

        {/* Base montacargas */}
        <div className="tck-base-truck"></div>

        {/* Lado Derecho */}
        <div className="tck-tires-r">
          <div className="tck-tire" onClick={() => handleSelectTire(2)}></div>
          <div className="tck-blank"></div>
          <div className="tck-tire" onClick={() => handleSelectTire(4)}></div>
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
            <strong>Temperatura:</strong>{" "}
            {selectedTire.temperature !== null && selectedTire.temperature !== undefined ? `${selectedTire.temperature} °C` : "Sin datos"}
          </p>
          <p>
            <strong>Presión:</strong>{" "}
            {selectedTire.pressure !== null && selectedTire.pressure !== undefined ? `${selectedTire.pressure} psi` : "Sin datos"}
          </p>
          <p>
            <strong>Batería:</strong>{" "}
            {selectedTire.batteryLevel !== null && selectedTire.batteryLevel !== undefined ? `${selectedTire.batteryLevel} %` : "Sin datos"}
          </p>

          <p>
            <strong>Ubicación:</strong> {selectedTire.tirePositioningModel?.locationCode}
          </p>
        </div>
      )}
    </>
  );
}
