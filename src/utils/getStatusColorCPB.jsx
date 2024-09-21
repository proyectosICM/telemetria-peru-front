export const getStatusColor = (status) => {
    switch (status) {
      case "Óptimo":
        return "rgba(0, 128, 0, 1)"; // Verde
      case "Regular":
        return "rgba(255, 165, 0, 1)"; // Naranja
      case "Bajo":
        return "rgba(255, 215, 0, 1)"; // Amarillo
      case "Muy Bajo":
        return "rgba(255, 0, 0, 1)"; // Rojo
      default:
        return "rgba(62, 152, 199, 1)"; // Color base
    } 
  };
  