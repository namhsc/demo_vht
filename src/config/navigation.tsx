import { type Navigation } from "@toolpad/core/AppProvider";
import PersonIcon from "@mui/icons-material/Person"; // Trải nghiệm người dùng
import StoreIcon from "@mui/icons-material/Store"; // Hoạt động vendor
import BusinessIcon from "@mui/icons-material/Business"; // Hoạt động kinh doanh
import { useTranslation } from "react-i18next";

export function useNavigation(): Navigation {
  const { t } = useTranslation();

  return [
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
  ];
}
