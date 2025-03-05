import React from "react";
import { Stack } from "@mui/material";
import { ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";

export default function ToolbarActionsSearch() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Stack direction="row">
      <ThemeSwitcher />
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <div
          onClick={() => changeLanguage("vi")}
          style={{
            cursor: "pointer",
            width: "32px",
            height: "32px",
            display: "flex",
            border: "1px solid gray",
            borderRadius: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Flag
            code="VN"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
        <div
          onClick={() => changeLanguage("en")}
          style={{
            cursor: "pointer",
            width: "32px",
            height: "32px",
            display: "flex",
            border: "1px solid gray",
            borderRadius: "50%",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          <Flag
            code="US"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </Stack>
  );
}
