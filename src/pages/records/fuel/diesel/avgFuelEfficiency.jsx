import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { ListItems } from "../../../../hooks/listItems";
import { fuelEfficiencyRoutes } from "../../../../api/apiurls";

export function AvgFuelEfficiency() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [error, setError] = useState(null);
  const [daily, setDaily] = useState();
  const [monthlyO, setMonthlyO] = useState();
  const [monthlyR, setMonthlyR] = useState();
  const [monthlyE, setMonthlyE] = useState();

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const [isMonthly, setIsMonthly] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState(
    String(new Date().getMonth() + 1).padStart(2, "0")
  );
  
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Helper function to handle dates
  const parseDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };
 
  const parseMonth = (dateString) => {
    const [year, month] = dateString.split("-").map(Number);
    return new Date(year, month - 1);
  };

  // Generate list of years from 2020 to the current year
  const yearsList = [];
  for (let year = new Date().getFullYear(); year >= 2020; year--) {
    yearsList.push(year);
  }

  // Load data from APIs
  useEffect(() => {
    ListItems(`${fuelEfficiencyRoutes.monthlyAverages}/${selectedVehicleId}?status=OPERACION&year=${selectedYear}`, setMonthlyO, setError);
    ListItems(`${fuelEfficiencyRoutes.monthlyAverages}/${selectedVehicleId}?status=RALENTI&year=${selectedYear}`, setMonthlyR, setError);
    ListItems(`${fuelEfficiencyRoutes.monthlyAverages}/${selectedVehicleId}?status=ESTACIONADO&year=${selectedYear}`, setMonthlyE, setError);
    ListItems(`${fuelEfficiencyRoutes.dailyAverages}/${selectedVehicleId}?month=${selectedMonth}&year=${selectedYear}`, setDaily, setError);
  }, [selectedVehicleId, selectedMonth, selectedYear]);

  // Process the data for the chart
  useEffect(() => {
    if (isMonthly) {
      if (monthlyO && monthlyR && monthlyE) {
        // Generate labels for the months
        const labels = monthlyO.map((item) => parseMonth(item.month).toLocaleString("es-ES", { month: "long", year: "numeric" }));

        // Get values ​​for each state
        const operationData = monthlyO.map((item) => (item.avgh * 0.264172).toFixed(2));
        const ralentiData = monthlyR.map((item) => (item.avgh * 0.264172).toFixed(2));
        const estacionadoData = monthlyE.map((item) => (item.avgh * 0.264172).toFixed(2));

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
        // Sort data by date
        const sortedDaily = daily.sort((a, b) => parseDate(a.day) - parseDate(b.day));

        // Generate labels and values ​​for days
        const labels = sortedDaily.map((item) => parseDate(item.day).toLocaleString("es-ES", { day: "numeric", month: "short" }));
        const operationData = sortedDaily.map((item) => (item.avgh * 0.264172).toFixed(2)); 

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
            <select id="yearSelect" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
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
            <select id="monthSelect" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
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
            <label htmlFor="yearSelect" style={{ marginLeft: "20px" }}>
              Selecciona un año:
            </label>
            <select id="yearSelect" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
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
