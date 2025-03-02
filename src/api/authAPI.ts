import axiosClient from "./axiosClient";

const authAPI = {
  login: (data: { email: string; password: string }) => {
    return axiosClient.post("/auth/login", data);
  },
  logout: () => {
    return axiosClient.post("/auth/logout");
  },
  getProfile: () => {
    return axiosClient.get("/auth/profile");
  },
};

export default authAPI;
