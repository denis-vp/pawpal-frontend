import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate, useLocation } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import pawpalLogo from "../assets/pawpal-logo.png";
import { Box } from "@mui/material";
import { useSnackBarStore } from "../state/snackBarStore";

const drawerItems = [
  {
    text: "Pets",
    icon: <PetsIcon />,
    path: "/pets",
  },
  {
    text: "Appointments",
    icon: <EventOutlinedIcon />,
    path: "/appointments",
  },
  {
    text: "Profile",
    icon: <PersonOutlineOutlinedIcon />,
    path: "/profile",
  },
  {
    text: "Notifications",
    icon: <NotificationsIcon />,
    path: "/notifications",
  },
];

type SideDrawerProps = {
  drawerWidth: number;
};

function SideDrawer({ drawerWidth }: SideDrawerProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const { openAlert } = useSnackBarStore();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <img
        src={pawpalLogo}
        alt="Pawpal Logo"
        style={{
          height: "10em",
          width: "10em",
          alignSelf: "center",
          paddingTop: "1em",
        }}
      />

      <List sx={{ padding: "1em" }}>
        {drawerItems.map((item) => (
          <ListItem key={item.text}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                bgcolor:
                  location.pathname === item.path ? "primary.main" : null,
                borderRadius: "15px",
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ margin: "auto 0 0.5em 0", padding: "1em" }}>
        <ListItem>
          <ListItemButton
            onClick={() => {
              localStorage.removeItem("jwtToken");
              localStorage.removeItem("userFirstName");
              localStorage.removeItem("userLastName");
              navigate("/login");
              openAlert("You have been logged out.");
            }}
            sx={{
              borderRadius: "15px",
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
}

export default SideDrawer;
