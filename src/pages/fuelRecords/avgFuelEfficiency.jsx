import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { ListItems } from "../../hooks/listItems";
import { fuelEfficiencyByDailyAVGURL, fuelEfficiencyByMothAVGURL } from "../../api/apiurls";

export function AvgFuelEfficiency() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  // Estados para los datos de las API
  const [daily, setDaily] = useState();
  const [monthlyO, setMonthlyO] = useState();
  const [monthlyR, setMonthlyR] = useState();
  const [monthlyE, setMonthlyE] = useState();

  // Estado para los datos procesados del gráfico
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // Estado para alternar entre mensual y diario
  const [isMonthly, setIsMonthly] = useState(false);

  // Estado para el mes y año seleccionado
  const [selectedMonth, setSelectedMonth] = useState("12");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Año actual por defecto

  // Función auxiliar para manejar fechas
  const parseDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // Ajustar el mes (0 indexado en JavaScript)
  };

  const parseMonth = (dateString) => {
    const [year, month] = dateString.split("-").map(Number);
    return new Date(year, month - 1); // Ajustar el mes (0 indexado en JavaScript)
  };

  // Generar lista de años de 2020 hasta el año actual
  const yearsList = [];
  for (let year = new Date().getFullYear(); year >= 2020; year--) {
    yearsList.push(year);
  }

  // Carga los datos desde las APIs
  useEffect(() => {
    ListItems(`${fuelEfficiencyByMothAVGURL}/${selectedVehicleId}?status=OPERACION&year=${selectedYear}`, setMonthlyO);
    ListItems(`${fuelEfficiencyByMothAVGURL}/${selectedVehicleId}?status=RALENTI&year=${selectedYear}`, setMonthlyR);
    ListItems(`${fuelEfficiencyByMothAVGURL}/${selectedVehicleId}?status=ESTACIONADO&year=${selectedYear}`, setMonthlyE);
    ListItems(`${fuelEfficiencyByDailyAVGURL}/${selectedVehicleId}?month=${selectedMonth}&year=${selectedYear}`, setDaily);
  }, [selectedVehicleId, selectedMonth, selectedYear]);

  // Procesa los datos para el gráfico
  useEffect(() => {
    if (isMonthly) {
      if (monthlyO && monthlyR && monthlyE) {
        // Generar etiquetas para los meses
        const labels = monthlyO.map((item) =>
          parseMonth(item.month).toLocaleString("es-ES", { month: "long", year: "numeric" })
        );

        // Obtener valores para cada estado
        const operationData = monthlyO.map((item) => item.avgh);
        const ralentiData = monthlyR.map((item) => item.avgh);
        const estacionadoData = monthlyE.map((item) => item.avgh);

        setChartData({
          labels,
          datasets: [
            {
              label: "Operación",
              data: operationData,
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              tension: 0.4,
            },
            {
              label: "Ralenti",
              data: ralentiData,
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              tension: 0.4,
            },
            {
              label: "Estacionado",
              data: estacionadoData,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.4,
            },
          ],
        });
      }
    } else {
      if (daily) {
        // Ordenar los datos por fecha
        const sortedDaily = daily.sort((a, b) => parseDate(a.day) - parseDate(b.day));

        // Generar etiquetas y valores para días
        const labels = sortedDaily.map((item) =>
          parseDate(item.day).toLocaleString("es-ES", { day: "numeric", month: "short" })
        );
        const operationData = sortedDaily.map((item) => item.avgh);

        setChartData({
          labels,
          datasets: [
            {
              label: "Operación",
              data: operationData,
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              tension: 0.4,
            },
          ],
        });
      }
    }
  }, [isMonthly, daily, monthlyO, monthlyR, monthlyE]);

  // Opciones del gráfico
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Promedio de Combustible (${isMonthly ? "Mensual" : "Diario"}) por Estado`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: isMonthly ? "Meses" : "Días",
        },
      },
      y: {
        title: {
          display: true,
          text: "Valor Promedio",
        },
      },
    },
  };

  return (
    <div
      style={{
        margin: "10px",
        width: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button onClick={() => setIsMonthly(!isMonthly)} style={{ marginBottom: "20px" }}>
        Cambiar a {isMonthly ? "Vista Diaria" : "Vista Mensual"}
      </Button>

      {/* Combobox de Meses y Años */}
      <div style={{ marginBottom: "20px" }}>
        {isMonthly && (
          <>
            <label htmlFor="yearSelect">Selecciona un año:</label>
            <select
              id="yearSelect"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {yearsList.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </>
        )}
        {!isMonthly && (
          <>
            <label htmlFor="monthSelect">Selecciona un mes:</label>
            <select
              id="monthSelect"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="01">Enero</option>
              <option value="02">Febrero</option>
              <option value="03">Marzo</option>
              <option value="04">Abril</option>
              <option value="05">Mayo</option>
              <option value="06">Junio</option>
              <option value="07">Julio</option>
              <option value="08">Agosto</option>
              <option value="09">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
            <label htmlFor="yearSelect" style={{ marginLeft: "20px" }}>Selecciona un año:</label>
            <select
              id="yearSelect"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {yearsList.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "90%", padding: "10px" }}>
          <Line data={chartData} options={lineChartOptions} />
        </div>
      </div>
    </div>
  );
}
