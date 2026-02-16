import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor global para erros
api.interceptors.response.use(
  response => response,
  error => Promise.reject(error.response?.data?.message || "Erro inesperado")
);

export default api;
