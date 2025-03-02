import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useNavigation } from "../config/navigation";
import { demoTheme } from "../config/theme";
import ToolbarActionsSearch from "components/ToolbarActionsSearch";
import SidebarFooter from "components/SidebarFooter";
import useAuth from "../hook/useAuth";
import Dashboard from "components/Dashboard";
import { Box } from "@mui/material";

function DemoPageContent({ pathName }: { pathName: string }) {
  return (
    <Box sx={{ backgroundColor: "#fff" }}>
      <Dashboard pathName={pathName} />
    </Box>
  );
}

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function App(props: DemoProps) {
  const { window } = props;

  const { session, authentication } = useAuth();
  const router = useDemoRouter("/dashboard");

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={useNavigation()}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Logo_of_Viettel_High-Tech.svg"
            alt="VHT logo"
          />
        ),
        title: "Dashboard",
        homeUrl: "/dashboard",
      }}
      session={session}
      authentication={authentication}
      notifications={[]}
    >
      <DashboardLayout
        slots={{
          toolbarActions: ToolbarActionsSearch,
          sidebarFooter: SidebarFooter,
        }}
      >
        <DemoPageContent pathName={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
