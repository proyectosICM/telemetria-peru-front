import axios from "axios";

// Función para editar un elemento con un objeto JSON completo
export async function editItem(url, requestData) {
  try {
    const token = localStorage.getItem("token");
    await axios.put(url, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    // Manejo de errores, por ejemplo, mostrar un mensaje de error
    console.error("Error al actualizar el elemento:", error);
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

export async function editSingleValue2(url, key, value) {
    try {
      const token = localStorage.getItem("token");
      const requestData = { [key]: value };
  
      await axios.put(url, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      // Manejo de errores
      console.error("Error al actualizar el valor:", error);
    }
  }
