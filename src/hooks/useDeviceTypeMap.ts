import { useTranslation } from "react-i18next";

export default function useDeviceTypeMap() {
  const { t } = useTranslation();

  return new Map([
    [1, t("device_types.1")],
    [2, t("device_types.2")],
    [3, t("device_types.3")],
    [4, t("device_types.4")],
    [5, t("device_types.5")],
    [6, t("device_types.6")],
    [7, t("device_types.7")],
    [8, t("device_types.8")],
    [9, t("device_types.9")],
    [10, t("device_types.10")],
  ]);
}
