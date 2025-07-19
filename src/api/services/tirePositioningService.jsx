import api from "../axiosConfig";

const endpoint = "/tire-positioning";

export const getByVehicleId = async (vehicleId) => {
  try {
    const response = await api.get(`${endpoint}/by-vehicle/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tire positioning by vehicle ID:", error);
    throw error;
  }
};

export const getByVehicleIdPaged = async (vehicleId, page, size) => {
  try {
    const response = await api.get(`${endpoint}/by-vehicle-paged/${vehicleId}`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tire positioning by vehicle ID (paged):", error);
    throw error;
  }
};

export const saveTirePositioning = async (vehicleId, tirePositioning) => {
  try {
    const response = await api.post(`${endpoint}/save/${vehicleId}`, tirePositioning);
    return response.data;
  } catch (error) {
    console.error("Error saving tire positioning:", error);
    throw error;
  }
};

export const updateTirePositioning = async (vehicleId, tirePositioning) => {
  try {
    const response = await api.put(`${endpoint}/${vehicleId}`, tirePositioning);
    return response.data;
  } catch (error) {
    console.error("Error updating tire positioning:", error);
    throw error;
  }
};