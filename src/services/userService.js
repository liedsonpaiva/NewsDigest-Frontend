import api from "../api/axios";

export const userService = {
  register: (data) => api.post("/users", data),

  login: (data) => api.post("/auth/login", data),

  getProfile: () => api.get("/users/me"),
};