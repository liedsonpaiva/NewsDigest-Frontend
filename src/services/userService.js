import api from "../api/axios";

const USER_ID = 1;

export const userService = {
  register: (data) =>
    api.post("/users", data),

  updateHorario: (data) =>
    api.put(`/users/${USER_ID}/horario`, data),

  deactivate: () =>
    api.delete(`/users/${USER_ID}`),

  getById: () =>
    api.get(`/users/${USER_ID}`),
};
