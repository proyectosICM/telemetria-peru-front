import { useEffect, useState } from "react";

// Hook para manejar los mensajes MQTT relacionados con el mapa
const useMqttMapHandler = (messages) => {
  const [buses, setBuses] = useState([]);
  
  useEffect(() => {
    if (messages && messages.length > 0) {
      messages.forEach((message) => {
        try {
          // Buscar JSON en el mensaje
          const jsonString = message.match(/{.*}/);
          if (!jsonString) {
            console.error("El mensaje no contiene un JSON válido:", message);
            return;
          }

          const data = JSON.parse(jsonString[0]);
          const { imei, longitude, latitude, licensePlate, vehicleId, timestamp, speed } = data;

          if (imei && longitude && latitude && licensePlate) {
            setBuses((prevBuses) => {
              const busIndex = prevBuses.findIndex((bus) => bus.imei === imei);

              if (busIndex !== -1) {
                // Actualizar el bus existente
                const updatedBuses = [...prevBuses];
                updatedBuses[busIndex] = {
                  ...updatedBuses[busIndex],
                  longitude,
                  latitude,
                  licensePlate,
                  vehicleId,
                  timestamp,
                  speed
                };
                return updatedBuses;
              } else {
                // Agregar un nuevo bus
                return [...prevBuses, { imei, longitude, latitude, licensePlate, vehicleId, timestamp, speed }];
              }
            });
          }
        } catch (error) {
          console.error("Error al procesar el mensaje JSON:", error);
        }
      });
    }
  }, [messages]);

  return buses;
};

export default useMqttMapHandler;
