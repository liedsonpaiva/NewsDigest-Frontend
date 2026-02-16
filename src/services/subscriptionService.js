import api from "../api/axios";

export const subscriptionService = {
  subscribe: (userId, data) =>
    api.post(`/users/${userId}/subscriptions`, data).then(res => res.data),

  getUserSubscriptions: (userId) =>
    api.get(`/users/${userId}/subscriptions`).then(res => res.data),

  remove: (userId, newsSourceId) =>
    api.delete(`/users/${userId}/subscriptions/${newsSourceId}`).then(res => res.data),
};
