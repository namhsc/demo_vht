import React from "react";
import DashboardPage from "pages/DashboardPage";
import VendorActivityPage from "pages/VendorActivityPage";
import BusinessActivityPage from "pages/BusinessActivityPage";

export const ROUTES: {
  [key: string]: (props: {
    setLayoutDefault: React.Dispatch<React.SetStateAction<any>>;
    pathName: string;
  }) => JSX.Element;
} = {
  "/dashboard": (props) => <DashboardPage {...props} />,
  "/user_experience": (props) => <DashboardPage {...props} />,
  "/vendor_activity": (props) => <VendorActivityPage {...props} />,
  "/business_activity": (props) => <BusinessActivityPage {...props} />,
};
