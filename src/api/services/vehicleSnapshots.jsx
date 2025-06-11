import api from "../axiosConfig";

const endpoint = "/vehicle-snapshots";

export const getByCompanyId = async (id) => {
  try {
    const response = await api.get(`${endpoint}/by-company/${id}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching snapshot reports:", error);
    throw error;
  }
};
