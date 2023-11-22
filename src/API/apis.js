import { axiosBase, axiosInstance } from "./axios";

export const login = (data) => axiosInstance.post("/customer/login", data);

export const signUp = (data) => axiosInstance.post("/auth/register", data);

export const getInvestor = async () => {
  const response = await axiosBase.get("/sub/getInvestor");
  return response;
};

export const getDirection = async () => {
  const response = await axiosBase.get(`/sub/getDirection`);
  return response;
};

export const getLocation = async () => {
  const response = await axiosInstance.get(`/sub/getLocation`);
  return response;
};

export const predict = (data) => axiosInstance.post(`/forecast/get`, data);

export const saveData = (data) => {
  return axiosInstance.post(`/housecus/add/${data.id}`, data.body);
};

export const addTraning = (data) => {
  console.log(data);
  return axiosInstance.post("/housetraining/addData", data);
};

export const getHouseCus = async (id) => {
  const response = await axiosInstance.get(`/housecus/gethouseCusUser/${id}`);
  return response;
};

export const backBook = (data) => axiosInstance.post("/book/back", data);

export const buyBook = (data) => axiosInstance.post("/book/sold", data);

export const deleteBook = (id) => axiosInstance.delete(`/book/${id}`);

export const editBook = (data) => axiosInstance.put("/book/update", data);

export const addBook = (data) => axiosInstance.post("/book/add", data);
