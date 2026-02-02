import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const apiCall = async (method, endpoint, data = {}) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      data,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return { success: true, ...response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Server unreachable" };
  }
};

// Admin API
export const getAllUsers = async () => await apiCall("get", "/api/admin/users");
export const deleteUser = async (id) => await apiCall("delete", `/api/admin/user/${id}`);
