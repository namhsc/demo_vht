import React from "react";
import DashboardPage from "pages/DashboardPage";
import VendorActivityPage from "pages/VendorActivityPage";
import BusinessActivityPage from "pages/BusinessActivityPage";
import UsersPage from "pages/UsersPage";
import SmartHomeSubscribersPage from "pages/SmartHomeSubscribersPage";
import OtherPage from "pages/OtherPage";

export const ROUTES: { [key: string]: React.ComponentType } = {
  "/dashboard": (props) => <DashboardPage {...props} />,
  "/dashboard/1": (props) => <DashboardPage {...props} />,
  "/dashboard/2": VendorActivityPage,
  "/dashboard/3": BusinessActivityPage,
  "/dashboard/4": UsersPage,
  "/dashboard/5": SmartHomeSubscribersPage,
  "/Other": OtherPage,
};
