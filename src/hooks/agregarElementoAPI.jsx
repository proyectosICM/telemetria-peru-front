import axios from "axios";

export function agregarElementoAPI(url, requestData, setError) {
  const token = localStorage.getItem("token");

  return axios
    .post(url, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      setError(error.response.data);
      throw error;
    });
}

export async function agregarElementoConRespuestaAPI(url, requestData) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(url, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    console.log(error);
    throw error; 
  }
}

export async function agregarImagenAPI(url, formData) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al enviar la imagen:", error);
    throw error;
  }
}