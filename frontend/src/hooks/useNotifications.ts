import api from "./api";

export const getAllNotificationRequest = async () => {
  const response = await api.get("/notification/by-user");
  return response.data;
};
