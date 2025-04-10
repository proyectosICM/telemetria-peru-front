import api from "../axiosConfig";

const endpoint = "/vehicles";

export const getAllVehicles = async () => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw error;
  }
};

export const getVehicleById = async (id) => {
  try {
    const response = await api.get(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    throw error;
  }
};

export const getByCompanyId = async (companyId) => {
  try {
    const response = await api.get(`${endpoint}/by-company/${companyId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicles by company ID:", error);
    throw error;
  }
};

export const getByCompanyIdPaged = async (companyId, page, size) => {
  alert("hola")
  try {
    const response = await api.get(`${endpoint}/by-company-paged/${companyId}`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicles by company ID with pagination:", error);
    throw error;
  }
};

export const getByStatus = async (status) => {
  try {
    const response = await api.get(`${endpoint}/by-status/${status}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicles by status:", error);
    throw error;
  }
};

export const getByStatusPaged = async (status, page, size) => {
  try {
    const response = await api.get(`${endpoint}/by-status-paged/${status}`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicles by status with pagination:", error);
    throw error;
  }
};

export const getOptionsData = async (vehicleId) => {
  try {
    const response = await api.get(`${endpoint}/options-data/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching options data:", error);
    throw error;
  }
};

export const createVehicle = async (vehicleData) => {
  try {
    const response = await api.post(endpoint, vehicleData);
    return response.data;
  } catch (error) {
    console.error("Error creating vehicle:", error);
    throw error;
  }
};

export const updateVehicle = async (id, vehicleData) => {
  try {
    const response = await api.put(`${endpoint}/${id}`, vehicleData);
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle:", error);
    throw error;
  }
};

export const updateOptions = async (vehicleId, optionsData) => {
  try {
    const response = await api.put(`${endpoint}/options-update/${vehicleId}`, optionsData);
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle options:", error);
    throw error;
  }
};

export const updateStatus = async (vehicleId) => {
  try {
    const response = await api.put(`${endpoint}/status-toggle/${vehicleId}` );
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle status:", error);
    throw error;
  }
};

export const updateDriver = async (vehicleId, driverId) => {
  try {
    const response = await api.put(`${endpoint}/update-driver/${vehicleId}`, { driverId });
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle driver:", error);
    throw error;
  }
};

export const deleteVehicle = async (id) => {
  try {
    const response = await api.delete(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    throw error;
  }
};
