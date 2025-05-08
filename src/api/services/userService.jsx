import api from "../axiosConfig";

const endpoint = "/users";

export const getInfoUser = async (username) => {
    try {
        const response = await api.get(`${endpoint}/info/${username}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
}