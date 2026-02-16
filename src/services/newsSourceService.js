import api from "../api/axios";

export const newsSourceService = {
  getAll: () => api.get("/news-sources").then(res => res.data),

  getById: (id) => api.get(`/news-sources/${id}`).then(res => res.data),
};
