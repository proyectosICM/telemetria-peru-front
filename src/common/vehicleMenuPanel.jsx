import React, { useEffect, useState } from "react";
import { FaTruck } from "react-icons/fa"; // Importa el ícono de camión
import { ListItems } from "../hooks/listItems";
import { vehicleRoutes, vehiclesTypesRoutes } from "../api/apiurls";
import { useMemo } from "react";

export function VehicleMenuPanel({ onSelectVehicle }) {
  const [data, setData] = useState([]);
  const [dataTypes, setDataTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [error, setError] = useState(null);

  const companyId = localStorage.getItem("tp_companyId");

  useEffect(() => {
    ListItems(`${vehicleRoutes.byCompany}/${companyId}`, setData, setError);
  }, [companyId]);

  useEffect(() => {
    ListItems(`${vehiclesTypesRoutes.base}`, setDataTypes, setError);
  }, []);

  const handleSelectVehicle = (id, type) => {
    onSelectVehicle(id);
    localStorage.setItem("selectedTypeVehicleId", type);
  };

  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) && (selectedType ? item.vehicletypeModel.name === selectedType : true)
    );
  }, [data, searchTerm, selectedType]);

  return (
    <div className="vmp-container">
      <h1 className="vmp-title">Unidades</h1>

      <div className="vmp-search-bar">
        <input
          type="text"
          placeholder="Buscar por matrícula..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="vmp-search-input"
        />
      </div>

      <div className="vmp-filter-bar">
        <select className="vmp-filter-select" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="">Todos los tipos</option>
          {dataTypes.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="vmp-panel">
        {filteredData.map((item, index) => (
          <div className="vmp-item" key={index} onClick={() => handleSelectVehicle(item.id, item.vehicleTypeId)}>
            <div className="vmp-item-details">
              <FaTruck className="vmp-truck-icon" />
              <p className="vmp-license">
                <strong>Placa:</strong> {item.licensePlate}
              </p>
              <p className="vmp-type">
                <strong>Tipo:</strong> {item.vehicleTypeName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
