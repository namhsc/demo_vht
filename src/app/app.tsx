import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useNavigation } from "../config/navigation";
import { demoTheme } from "../config/theme";
import ToolbarActionsSearch from "components/ToolbarActionsSearch";
import SidebarFooter from "components/SidebarFooter";
import useAuth from "../hooks/useAuth";
import { Box } from "@mui/material";
import { ROUTES } from "../config/routes";
import DashboardPage from "../pages/DashboardPage";
import { useEffect, useState } from "react";

export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

function DemoPageContent({ pathName }: { pathName: string }) {
  const PageComponent = ROUTES[pathName] || DashboardPage;
  const [layoutDefault, setLayoutDefault] = useState<LayoutItem[]>();

  useEffect(() => {
    if (layoutDefault) {
      const filteredLayout = layoutDefault.map(({ i, x, y, w, h }) => ({
        i,
        x,
        y,
        w,
        h,
      }));

      localStorage.setItem(
        `layout_${pathName}`,
        JSON.stringify(filteredLayout)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutDefault]);

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        padding: "20px",
        minHeight: "calc(100vh - 64px)",
      }}
      className="w-full flex relative"
    >
      <PageComponent setLayoutDefault={setLayoutDefault} pathName={pathName} />
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
  const router = useDemoRouter("/user_experience");

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  const [isNavOpen, setIsNavOpen] = useState(false);

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
        title: "",
        homeUrl: "/user_experience",
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
        navigationOpen={isNavOpen} // 🔹 Điều khiển trạng thái navigation
        onNavigationOpenChange={setIsNavOpen} //
      >
        <DemoPageContent pathName={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
