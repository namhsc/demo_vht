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
    return axiosClient.get(`${path}/feedback-rating-platform`);
  },
  getDataListFeedback: ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    return axiosClient.post(`${path}/feedback`, {
      page: page + 1 || 1,
      pageSize: pageSize || 10,
    });
  },
};

export default userExperienceAPI;
