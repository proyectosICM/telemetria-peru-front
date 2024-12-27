import axios from "axios";

export async function deleteItem(url) {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token no encontrado. Por favor, inicia sesión.");
    throw new Error("Token not available. Please log in.");
  }

  try {
    return await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}
