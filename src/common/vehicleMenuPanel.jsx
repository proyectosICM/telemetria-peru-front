import React, { useEffect, useState, useMemo } from "react";
import { FaFilter, FaSearch, FaTruck, FaBell, FaPowerOff, FaInfoCircle, FaBus } from "react-icons/fa";
import { ListItems } from "../hooks/listItems";
import { vehicleRoutes, vehiclesTypesRoutes } from "../api/apiurls";

export function VehicleMenuPanel({ onSelectVehicle }) {
  const [data, setData] = useState([]);
  const [dataTypes, setDataTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [expandedId, setExpandedId] = useState(null);
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
    setExpandedId((prev) => (prev === id ? null : id)); // expand/collapse
  };

  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedType ? item.vehicletypeModel.name === selectedType : true)
    );
  }, [data, searchTerm, selectedType]);

  return (
    <div className="vmp-container">
      <h1 className="vmp-title"><FaBus style={{ marginRight: "8px" }} /> Unidades</h1>

      {/* Barra de búsqueda */}
      <div className="vmp-search-bar">
        <FaSearch className="vmp-search-icon" />
        <input
          type="text"
          placeholder="Buscar por matrícula..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="vmp-search-input"
        />
      </div>

      {/* Filtro por tipo */}
      <div className="vmp-filter-bar">
        <FaFilter className="vmp-filter-icon" />
        <select
          className="vmp-filter-select"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Todos los tipos</option>
          {dataTypes.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      {/* 🟦 Panel de vehículos con scroll */}
      <div className="vmp-panel-scroll">
        <div className="vmp-panel">
          {filteredData.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                className={`vmp-item ${isExpanded ? "expanded" : ""}`}
                key={item.id}
                onClick={() => handleSelectVehicle(item.id, item.vehicleTypeId)}
              >
                <div className="vmp-item-header">
                  <FaTruck className="vmp-truck-icon" />
                  <p className="vmp-license">
                    <strong>{item.licensePlate}</strong>
                  </p>
                  {/* 🟦 Botón de información */}
                  <button
                    className="vmp-info-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // evitar expandir/cerrar
                      alert(`Información del vehículo: ${item.licensePlate}`);
                    }}
                  >
                    <FaInfoCircle />
                  </button>
                </div>

                <div className="vmp-item-footer">
                  <div className="vmp-footer-top">
                    <p className="vmp-type">
                      <strong>Tipo:</strong> {item.vehicleTypeName}
                    </p>
                    {/* 
                    <p className="vmp-fuel">
                      <strong>Combustible:</strong> {item.fuelLevel ?? "68 gal"}%
                    </p>
                     */}
                  </div>
                  {/*
                  <p className="vmp-last-conn">
                    <strong>Última conexión:</strong>{" "}
                    {item.lastConnection ?? "03:05 PM 22/05/2025"}
                  </p>
                  */}
                </div>

                {isExpanded && (
                  <div className="vmp-extra">
                    <button className="vmp-action-btn">
                      <FaBell /> Ver registros de alarmas
                    </button>
                    <button className="vmp-action-btn">
                      <FaPowerOff /> Ver registros de encendido
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
