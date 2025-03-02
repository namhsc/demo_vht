import React from "react";
import { Typography } from "@mui/material";
import { SidebarFooterProps } from "@toolpad/core/DashboardLayout";

export default function SidebarFooter({ mini }: SidebarFooterProps) {
  return (
    <Typography
      variant="caption"
      sx={{ m: 1, whiteSpace: "nowrap", overflow: "hidden" }}
    >
      {mini ? "© VHT" : `© ${new Date().getFullYear()} Viettel High Tech`}
    </Typography>
  );
}
