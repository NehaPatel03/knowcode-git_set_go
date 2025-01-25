import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000", // Flask backend URL
});

export const predictScheme = async (data) => {
  try {
    const response = await api.post("/predict", data);
    return response.data;
  } catch (error) {
    console.error("Error predicting scheme:", error.response?.data || error.message);
    throw error;
  }
};
