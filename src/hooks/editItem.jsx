import axios from "axios";

// Función para editar un elemento con un objeto JSON completo
export async function editItem(url, requestData, setError) {
  try {
    const token = localStorage.getItem("token");
    return await axios.put(url, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error al actualizar el elemento:", error);
    setError(error);
  }
}

// Función para editar un solo valor
export async function editSingleValue(url,key, value) {
  try {
    const token = localStorage.getItem("token");
    const requestUrl = `${url}?${key}=${value}`;

    await axios.put(requestUrl, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    // Manejo de errores
    console.error("Error al actualizar el valor:", error);
  }
}

export async function editVehicleOptions(url, type, status) {
  try {
    const token = localStorage.getItem("token");
    const requestUrl = `${url}?type=${type}&status=${status}`;

    await axios.put(requestUrl, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    // Manejo de errores
    console.error("Error al actualizar el valor:", error);
  }
}


