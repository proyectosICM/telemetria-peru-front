import axios from "axios";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not available. Please log in.");
    throw new Error("Token not available. Please log in.");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function editItem(url, requestData, setError) {
  try {
    return await axios.put(url, requestData, {
      headers: getAuthHeaders(),
    });
  } catch (error) {
    console.error("Error updating item: ", error);
    setError(error);
    throw new Error("Error updating item: ", error);
  }
}

// Función para editar un solo valor
export async function editSingleValue(url,key, value) {
  try {
    const requestUrl = `${url}?${key}=${value}`;
    await axios.put(requestUrl, null, {
      headers: getAuthHeaders(),
    });
  } catch (error) {
    console.error("Error updating value:", error);
  }
}

export async function editVehicleOptions(url, type, status) {
  try {
    const requestUrl = `${url}?type=${type}&status=${status}`;

    await axios.put(requestUrl, null, {
      headers: getAuthHeaders(),
    });
  } catch (error) {
    console.error("Error updating value:", error);
  }
}


