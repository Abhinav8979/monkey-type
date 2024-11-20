import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: apiBaseUrl || "http://localhost:5173",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/api/login", { email, password });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error: any) {
    console.error(
      "Error logging in:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const RegisterUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const response = await apiClient.post("/api/register", {
      email,
      password,
      name,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Registration failed");
    }
  } catch (error: any) {
    console.error(
      "Error logging in:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
