import axios from "axios";

export async function deleteItem(url) {
  try {
    const token = localStorage.getItem("token");
    return await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error al actualizar el elemento:", error);
  }
}
