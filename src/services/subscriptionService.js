import api from "../api/axios";

export const subscriptionService = {
  subscribe: (data) => api.post("/subscriptions", data),

  getUserSubscriptions: () => api.get("/subscriptions"),
};
