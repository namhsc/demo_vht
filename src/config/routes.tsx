import React from "react";
import DashboardPage from "pages/DashboardPage";
import VendorActivityPage from "pages/VendorActivityPage";
import BusinessActivityPage from "pages/BusinessActivityPage";

export const ROUTES: {
  [key: string]: (props: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setLayoutDefault: React.Dispatch<React.SetStateAction<any>>;
    pathName: string;
  }) => JSX.Element;
} = {
  "/dashboard": (props) => <DashboardPage {...props} />,
  "/dashboard/user_experience": (props) => <DashboardPage {...props} />,
  "/dashboard/vendor_activity": (props) => <VendorActivityPage {...props} />,
  "/dashboard/business_activity": (props) => (
    <BusinessActivityPage {...props} />
  ),
  "/other": (props) => <DashboardPage {...props} />,
};
