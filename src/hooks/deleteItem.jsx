import axios from "axios";

export async function deleteItem(url) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      // Manejo de errores, por ejemplo, mostrar un mensaje de error
      console.error("Error al actualizar el elemento:", error);
    }
  }