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

  //const dayOfWeek = date.toLocaleString('en-GB', { weekday: 'long' });

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
    second: "2-digit",
  });

  return `${formattedTime}`;
};
