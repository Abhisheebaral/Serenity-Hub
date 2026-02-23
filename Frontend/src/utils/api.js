import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const apiCall = async (method, endpoint, data = {}) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Server unreachable"
    };
  }
};

// Admin APIs
export const addProfessional = (data) =>
  apiCall("post", "/api/admin/professionals", data);

export const getProfessionals = () =>
  apiCall("get", "/api/admin/professionals");

export const getProfessionalById = (id) =>
  apiCall("get", `/api/admin/professionals/${id}`);