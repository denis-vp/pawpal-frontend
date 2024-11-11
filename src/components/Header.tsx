import { Box, CssBaseline, IconButton, Typography} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Notifications } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import theme from "../theme";
import pawpalLogo from "../assets/pawpal.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Header = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          backgroundColor: 'secondary.main',
          borderBottom: "2px solid black",
          minHeight: '100px',
          
        }}
      >
        <Box
          component="header"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
            mr: 3,
            ml: 3
          }}
        >
          {/* Logo and PawPal Title */}
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                backgroundColor: 'secondary.dark',
                borderRadius: "40px",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={pawpalLogo} alt="PawPal Logo" style={{ height: "60px", width: "55px" }} />
            </Box>
            <Typography
              variant="h1"
              color="textPrimary"
              sx={{ fontStyle: 'oblique' }}
            >
              PawPal
            </Typography>
          </Box>

          {/* Navigation */}
          <Box display="flex" alignItems="center" gap={1.5}>
            {["Pets", "Appointments"].map(text => (
              <Link to={`/${text.toLowerCase()}`} key={text} style={{ textDecoration: 'none' }}>
                <Typography variant="h3" color="textPrimary">
                  {text}
                </Typography>
              </Link>
            ))}
            <IconButton>
              <AccountCircleIcon fontSize="large"/>
            </IconButton>
            <IconButton>
              <Notifications fontSize="large"/>
            </IconButton>
            <IconButton>
              <LogoutIcon fontSize="large"/>
            </IconButton>
          </Box>
        </Box>
      </Box>

    </ThemeProvider>
  );
};

export default Header;
