import { type Navigation } from "@toolpad/core/AppProvider";
import DashboardIcon from "@mui/icons-material/Dashboard"; // Dashboard
import PersonIcon from "@mui/icons-material/Person"; // Trải nghiệm người dùng
import StoreIcon from "@mui/icons-material/Store"; // Hoạt động vendor
import BusinessIcon from "@mui/icons-material/Business"; // Hoạt động kinh doanh
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"; // Khác
import { useTranslation } from "react-i18next";

export function useNavigation(): Navigation {
  const { t } = useTranslation();

  return [
    {
      segment: "dashboard",
      title: t("dashboard"),
      icon: <DashboardIcon />,
      children: [
        {
          segment: "user_experience",
          title: t("user_experience"),
          icon: <PersonIcon />,
        },
        {
          segment: "vendor_activity",
          title: t("vendor_activity"),
          icon: <StoreIcon />,
        },
        {
          segment: "business_activity",
          title: t("business_activity"),
          icon: <BusinessIcon />,
        },
      ],
    },
    {
      segment: "other",
      title: t("other"),
      icon: <MoreHorizIcon />,
    },
  ];
}
