import api from "../axiosConfig";

const endpoint = "/gas-records";

export const getById = async (id) => {
  try {
    const response = await api.get(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching gas records by ID:", error);
    throw error;
  }
};

export const getByVehicleId = async (vehicleId) => {
  try {
    const response = await api.get(`${endpoint}/by-vehicle/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching gas records by vehicle ID:", error);
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
    console.error("Error fetching gas records by vehicle ID with pagination:", error);
    throw error;
  }
};

export const getByVehicleToday = async (vehicleId) => {
  try {
    const response = await api.get(`${endpoint}/by-vehicle-today/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching today's gas records by vehicle ID:", error);
    throw error;
  }
};

export const getByDate = async (params) => {
  try {
    const response = await api.post(`${endpoint}/by-date`, params);
    return response.data;
  } catch (error) {
    console.error("Error fetching gas records by date:", error);
    throw error;
  }
};
