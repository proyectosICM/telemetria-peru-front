// utils/formatUtils.js
export const getDateAndDayFromTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);

  const formattedDate = date.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // const dayOfWeek = date.toLocaleString('en-GB', { weekday: 'long' });

  // Combina la fecha y el día de la semana en una sola cadena
  // return `${formattedDate} (${dayOfWeek})`;
  
  return `${formattedDate}`;
};

// Función que entrega solo la fecha desde un timestamp
export const getDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);

  const formattedDate = date.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return `${formattedDate}`;
};

// Función que entrega solo la hora desde un timestamp
export const getTimeFromTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);

  const formattedTime = date.toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",

  });
//    second: "2-digit",
  return `${formattedTime}`;
};
export const calculateHoursDifference = (startTimestamp, endTimestamp) => {
  if (!startTimestamp || !endTimestamp) return null; // Verifica que ambos valores existan

  const start = new Date(startTimestamp * 1000);
  const end = new Date(endTimestamp * 1000);

  const diffInMilliseconds = end - start;

  // Calcular horas y minutos
  const totalMinutes = Math.floor(diffInMilliseconds / (1000 * 60)); // Total de minutos
  const hours = Math.floor(totalMinutes / 60); // Horas completas
  const minutes = totalMinutes % 60; // Minutos restantes

  // Asegurar formato de dos dígitos para horas y minutos
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};

export function formatTimeDecimal(decimalHours) {
  const hours = Math.floor(decimalHours); // Parte entera: horas
  const minutes = Math.round((decimalHours - hours) * 60); // Parte decimal: minutos
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`; // Formato HH:MM
}