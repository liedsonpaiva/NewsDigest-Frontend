import api from "../api/axios";

export const newsSourceService = {
  getAll: () => api.get("/news-sources"),

  getById: (id) => api.get(`/news-sources/${id}`),
};
