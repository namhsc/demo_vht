import React from "react";
import { Stack, Tooltip, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { useTranslation } from "react-i18next";

export default function ToolbarActionsSearch() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Stack direction="row">
      <Tooltip title="Tìm kiếm" enterDelay={1000}>
        <div>
          <IconButton
            type="button"
            aria-label="search"
            sx={{ display: { xs: "inline", md: "none" } }}
          />
        </div>
      </Tooltip>
      <TextField
        label="Tìm kiếm"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 },
          },
        }}
        sx={{ display: { xs: "none", md: "inline-block" }, mr: 1 }}
      />
      <ThemeSwitcher />
      <div style={{ display: "flex", gap: 6 }}>
        <div onClick={() => changeLanguage("vi")}>VI</div>
        <div onClick={() => changeLanguage("en")}>EN</div>
      </div>
    </Stack>
  );
}
