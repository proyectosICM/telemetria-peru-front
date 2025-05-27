import api from "../axiosConfig";

const endpoint = "/vehicle_fuel_report";

export const getAllFuelReports = async () => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching fuel reports:", error);
    throw error;
  }
};

export const getAllFuelReportsPaged = async (page, size) => {
  try {
    const response = await api.get(`${endpoint}/paged`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching fuel reports:", error);
    throw error;
  }
};

export const getByVehicleId = async (vehicleId) => {
  try {
    const response = await api.get(`${endpoint}/by-vehicle/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching fuel reports:", error);
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
    console.error("Error fetching fuel reports:", error);
    throw error;
  }
};

export const getSummaryByVehicle = async (vehicleId, year, month, day) => {
  try {
    const response = await api.get(`${endpoint}/summary/${vehicleId}`,
      {
        params: { year, month, day },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching fuel report summary:", error);
    throw error;
  }
}
