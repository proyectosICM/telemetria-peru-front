import api from "../axiosConfig";

const endpoint = "/tire-sensor";

export const getById = async (id) => {
  try {
    const response = await api.get(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tire sensor by ID:", error);
    throw error;
  }
};

export const getByIdentificationCode = async (identificationCode) => {
  try {
    const response = await api.get(`${endpoint}/by-identification/${identificationCode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tire sensor by identification code:", error);
    throw error;
  }
};

export const getByCompanyId = async (companyId) => {
  try {
    const response = await api.get(`${endpoint}/by-company/${companyId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tire sensors by company ID:", error);
    throw error;
  }
};

export const getByCompanyIdPaged = async (companyId, page, size) => {
  try {
    const response = await api.get(`${endpoint}/by-company-paged/${companyId}`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tire sensors by company ID (paged):", error);
    throw error;
  }
};

export const getByVehicleId = async (vehicleId) => {
  try {
    const response = await api.get(`${endpoint}/by-vehicle/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tire sensors by vehicle ID:", error);
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
    console.error("Error fetching tire sensors by vehicle ID (paged):", error);
    throw error;
  }
};

export const getByStatus = async (status) => {
  try {
    const response = await api.get(`${endpoint}/by-status/${status}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tire sensors by status:", error);
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
    console.error("Error fetching tire sensors by status (paged):", error);
    throw error;
  }
};

export const saveTireSensor = async (tireSensor) => {
  try {
    const response = await api.post(`${endpoint}/save`, tireSensor);
    return response.data;
  } catch (error) {
    console.error("Error saving tire sensor:", error);
    throw error;
  }
};
