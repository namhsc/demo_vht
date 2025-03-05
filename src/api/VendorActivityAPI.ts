import axiosClient from "./axiosClient";

const path = "/vendor";

const vendorAPI = {
  getTyeDistributionDevice: () => {
    return axiosClient.get(`${path}/type-distribution-device`);
  },
  getNewDevice: (day?: number) => {
    return axiosClient.get(`${path}/new-devices-days?day=${day || 7}`);
  },
  tableVendorAndDevice: ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    return axiosClient.post(`${path}/vendor-and-device`, {
      page: page || 1,
      pageSize: pageSize || 10,
      sortBy: "",
      sortOder: "",
    });
  },
  countDeviceByVendor: () => {
    return axiosClient.get(`${path}/count-device-by-vendor`);
  },
};

export default vendorAPI;
