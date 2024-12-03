import { Box, styled } from "@mui/material";
import SideDrawer from "./SideDrawer";

const Page = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const drawerWidth = 300;

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <SideDrawer drawerWidth={drawerWidth} />
      <Page sx={{ maxWidth: `calc(100% - ${drawerWidth}px)` }}>{children}</Page>
    </Box>
  );
}

export default Layout;
