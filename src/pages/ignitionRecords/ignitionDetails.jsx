import React, { useEffect, useState } from "react";
import { BackButton } from "../../common/backButton";
import { NavbarCommon } from "../../common/navbarCommon";
import { Form, Table } from "react-bootstrap";
import { ListItems } from "../../hooks/listItems";
import { ignitionAllDayURL, ignitionAllMothURL, ignitionRoutes } from "../../api/apiurls";
import { tr } from "date-fns/locale";
import { getDateFromTimestamp } from "../../utils/formatUtils";

export function IgnitionDetails() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [dataYear, setDataYear] = useState([]);
  const [dataMoth, setDataMoth] = useState([]);
  const [errorMoth, setErrorMoth] = useState(null);
  const [errorYear, setErrorYear] = useState(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2021 }, (_, i) => currentYear - i);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    if (selectedVehicleId) {
      ListItems(`${ignitionRoutes.countsAllDays}/${selectedVehicleId}?year=${selectedYear}&month=${selectedMonth}`, setDataMoth, setErrorMoth);
      ListItems(`${ignitionRoutes.countsAllMonths}/${selectedVehicleId}?year=${selectedYear}&month=${selectedMonth}`, setDataYear, setErrorYear);
    }
  }, [selectedVehicleId, selectedYear, selectedMonth]);

  const monthNames = {
    1: "Enero",
    2: "Febrero",
    3: "Marzo",
    4: "Abril",
    5: "Mayo",
    6: "Junio",
    7: "Julio",
    8: "Agosto",
    9: "Septiembre",
    10: "Octubre",
    11: "Noviembre",
    12: "Diciembre",
  };

  const renderTableRowsMonth = () => {
    if (!dataMoth || dataMoth.length === 0 || errorMoth) {
      return (
        <tr>
          <td colSpan="2" style={{ textAlign: "center" }}>
            No hay datos disponibles.
          </td>
        </tr>
      );
    }

    return dataMoth.map((item, index) => (
      <tr key={index}>
        <td>{item.day && getDateFromTimestamp(item.day)}</td>
        <td>{item.counts}</td>
      </tr>
    ));
  };

  // Genera meses del 1 al 12
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div>
      <NavbarCommon />
      <BackButton path={-1} />
      <div style={{ border: "2px solid #d1d0cc", margin: "5px 5%", padding: "20px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Ignition Details</h1>

        <Form.Group style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "300px" }}>
            <Form.Label style={{ fontWeight: "bold", fontSize: "18px" }}>Seleccione año:</Form.Label>
            <Form.Select
              value={selectedYear}
              onChange={handleYearChange}
              style={{
                border: "2px solid #6c757d",
                borderRadius: "8px",
                padding: "10px",
                fontSize: "16px",
                color: "#495057",
                backgroundColor: "#f8f9fa",
              }}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Form.Select>
          </div>
        </Form.Group>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3>Año seleccionado: {selectedYear}</h3>
        </div>

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Mes</th>
              <th>Conteo</th>
            </tr>
          </thead>
          <tbody>
            {dataYear && !errorYear && dataYear.length > 0 ? (
              dataYear.map((year, index) => (
                <tr key={index}>
                  <td>{monthNames[year.month] || "N/A"}</td>
                  <td>{year.count || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  No hay datos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <Form.Group style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <div style={{ width: "300px" }}>
            <Form.Label style={{ fontWeight: "bold", fontSize: "18px" }}>Seleccione mes:</Form.Label>
            <Form.Select
              value={selectedMonth}
              onChange={handleMonthChange}
              style={{
                border: "2px solid #6c757d",
                borderRadius: "8px",
                padding: "10px",
                fontSize: "16px",
                color: "#495057",
                backgroundColor: "#f8f9fa",
              }}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {monthNames[month]}
                </option>
              ))}
            </Form.Select>

            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <h3>Mes seleccionado: {monthNames[selectedMonth]}</h3>
            </div>
          </div>
        </Form.Group>

        <Table striped bordered hover variant="dark" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Día</th>
              <th>Cantidad de arranques</th>
            </tr>
          </thead>
          <tbody>{renderTableRowsMonth()}</tbody>
        </Table>
      </div>
    </div>
  );
}
