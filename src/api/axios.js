import axios from "axios";

const api = axios.create({
  baseURL: "", // URL do backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
