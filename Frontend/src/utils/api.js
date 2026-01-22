import axios from "axios";

const BASE_URL = "http://localhost:3000"; // backend port

export const apiCall = async (method, endpoint, data = {}) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      data,
      headers: { "Content-Type": "application/json" },
    });

    return {
      success: true,
      ...response.data, // include access_token, user, etc.
    };
  } catch (error) {
    console.error("API call error:", error);

    return {
      success: false,
      message: error.response?.data?.message || "Server unreachable",
    };
  }
};

