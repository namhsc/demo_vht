import axiosClient from "./axiosClient";

const path = "/business";

const businessAPI = {
  getUserStatistic: () => {
    return axiosClient.get(`${path}/user-statistic`);
  },
  getTypeUser: () => {
    return axiosClient.get(`${path}/type-user`);
  },
  getEvenueMonthly: () => {
    return axiosClient.get(`${path}/revenue-monthly`);
  },
  getPackagesAndService: () => {
    return axiosClient.get(`${path}/packages-and-service`);
  },
  durationTotalPerMonth: (month?: number) => {
    return axiosClient.get(
      `${path}/duration-total-permonth?month=${month || 3}`
    );
  },
  totalServiceUser: () => {
    return axiosClient.get(`${path}/packets-and-duration`);
  },
};

export default businessAPI;
