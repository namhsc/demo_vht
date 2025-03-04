import axiosClient from "./axiosClient";

const path = "/customer-experience";

const userExperienceAPI = {
  getStatusDistribution: () => {
    return axiosClient.get(`${path}/status-code-distribution`);
  },
  getTimeDistribution: () => {
    return axiosClient.get(`${path}/response-time-distribution`);
  },
  getPlatformStats: () => {
    return axiosClient.get(`${path}/platform-stats`);
  },
  getFeedbackRating: () => {
    return axiosClient.get(`${path}/feedback-rating`);
  },
};

export default userExperienceAPI;
