import api from "./api";

export const getAllEmployeesRequest = async () => {
  const response = await api.get("/employee");

  return response.data;
};
