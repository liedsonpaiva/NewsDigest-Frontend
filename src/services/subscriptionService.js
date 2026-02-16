import api from "../api/axios";

const USER_ID = 1;

export const subscriptionService = {
  subscribe: (data) =>
    api.post(`/users/${USER_ID}/subscriptions`, data),

  getUserSubscriptions: () =>
    api.get(`/users/${USER_ID}/subscriptions`),

  remove: (newsSourceId) =>
    api.delete(`/users/${USER_ID}/subscriptions/${newsSourceId}`),
};
