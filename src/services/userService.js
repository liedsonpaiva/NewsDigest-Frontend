import api from "../api/axios";

export const userService = {
  register: (data) =>
    api.post("/users", data).then(res => res.data),

  getById: (userId) =>
    api.get(`/users/${userId}`).then(res => res.data),

  updateHorario: (userId, data) =>
    api.put(`/users/${userId}/horario`, data).then(res => res.data),

  deactivate: (userId) =>
    api.delete(`/users/${userId}`).then(res => res.data),
};