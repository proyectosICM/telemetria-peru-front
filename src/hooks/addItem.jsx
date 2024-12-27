import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "",
});

// Function to get authentication headers
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  
  if (!token) {
    throw new Error("Token not available. Please log in.");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

export function addElementAPI(url, requestData) {
  return axiosInstance
    .post(url, requestData, { headers: getAuthHeaders() })
    .catch((error) => {
      console.error("Error in addElementAPI:", error);
      throw error;
    });
}

export async function addElementWithResponseAPI(url, requestData) {
  try {
    const response = await axiosInstance.post(url, requestData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error in addElementWithResponseAPI:", error);
    throw error;
  }
}

export async function addImageAPI(url, formData) {
  try {
    const response = await axiosInstance.post(url, formData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in addImageAPI:", error);
    throw error;
  }
}
