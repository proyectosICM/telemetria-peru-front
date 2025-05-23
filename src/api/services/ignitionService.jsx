import api from "../axiosConfig";

const endpoint = "/vehicle-ignition";

export const getAllignitionRecords = async () => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching ignition records:", error);
    throw error;
  }
};

export const getAllIgnitionRecordsPaged = async (page, size) => {
  try {
    const response = await api.get(`${endpoint}/paged`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching ignition records:", error);
    throw error;
  }
};

export const getIgnitionRecordsByVehicle = async (vehicleId) => {
  try {
    const response = await api.get(`${endpoint}/by-vehicle/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ignition records:", error);
    throw error;
  }
};

export const getIgnitionRecordsByVehiclePaged = async (vehicleId, page, size) => {
  try {
    const response = await api.get(`${endpoint}/by-vehicle-paged/${vehicleId}`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching ignition records:", error);
    throw error;
  }
};

export const getIgnitionRecordsCount = async (vehicleId) => {
  try {
    const response = await api.get(`${endpoint}/count/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ignition records count:", error);
    throw error;
  }
};

export const getIgnitionRecordsCountsAllMonths = async (vehicleId) => {
  try {
    const response = await api.get(`${endpoint}/counts-all-months/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ignition records counts all months:", error);
    throw error;
  }
};

export const getIgnitionRecordsCountsAllDays = async (vehicleId) => {
  try {
    const response = await api.get(`${endpoint}/counts-all-days/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ignition records counts all days:", error);
    throw error;
  }
};