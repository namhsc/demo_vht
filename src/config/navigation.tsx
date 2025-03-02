import { type Navigation } from "@toolpad/core/AppProvider";
import LayersIcon from "@mui/icons-material/Layers";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
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
          segment: "1",
          title: t("user_experience"),
          icon: <DescriptionIcon />,
        },
        {
          segment: "2",
          title: t("vendor_activity"),
          icon: <DescriptionIcon />,
        },
        {
          segment: "3",
          title: t("business_activity"),
          icon: <DescriptionIcon />,
        },
        { segment: "4", title: t("users"), icon: <DescriptionIcon /> },
        {
          segment: "5",
          title: t("smarthome_subscribers"),
          icon: <DescriptionIcon />,
        },
      ],
    },
    {
      segment: "Other",
      title: t("other"),
      icon: <LayersIcon />,
    },
  ];
}
