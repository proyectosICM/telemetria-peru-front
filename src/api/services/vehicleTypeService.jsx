import api from "../axiosConfig";

const endpoint = "/vehicle-type";

export const getAllVehicleTypes = async () => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle types:", error);
    throw error;
  }
};

export const getAllVehicleTypesPaged = async (page, size) => {
  try {
    const response = await api.get(`${endpoint}/paged`, {
      params: { page, size },
    });
    return response.data.content;
  } catch (error) {
    console.error("Error fetching vehicle types with pagination:", error);
    throw error;
  }
};

export const getVehicleTypeById = async (id) => {
  try {
    const response = await api.get(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle type:", error);
    throw error;
  }
};

export const createVehicleType = async (vehicleType) => {
  try {
    const response = await api.post(endpoint, vehicleType);
    return response.data;
  } catch (error) {
    console.error("Error creating vehicle type:", error);
    throw error;
  }
};

export const updateVehicleType = async (id, vehicleType) => {
  try {
    const response = await api.put(`${endpoint}/${id}`, vehicleType);
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle type:", error);
    throw error;
  }
};

export const deleteVehicleType = async (id) => {
  try {
    const response = await api.delete(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting vehicle type:", error);
    throw error;
  }
};
