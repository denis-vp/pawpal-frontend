import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  CircularProgress,
  CssBaseline,
  Grid,
  ThemeProvider,
} from "@mui/material";
import { useApiStore } from "../state/apiStore";
import { useSnackBarStore } from "../state/snackBarStore";
import theme from "../utils/theme";

interface UserProfile {
  photo: string;
  firstName: string;
  lastName: string;
  email: string;
}

const ProfilePage: React.FC = () => {
  const { getDetails } = useApiStore();
  const { openAlert } = useSnackBarStore();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getDetails();
        switch (response.status) {
          case 200:
            setUser(response.data);
            break;
          case 400:
            openAlert("Invalid request. Please try again.", "error");
            break;
          case 404:
            openAlert("User not found.", "error");
            break;
          case 500:
            openAlert(
              "Server encountered an error. Please try again later.",
              "error"
            );
            break;
          default:
            openAlert(
              "An unexpected error occurred. Please try again.",
              "error"
            );
        }
      } catch (error) {
        openAlert("Network error or server is unreachable.", "error");
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [getDetails, openAlert]);

  const handleChangePassword = () => {
    // Implement password change logic here
    console.log("Change password clicked");
  };

  if (loading) {
  }

  return user ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Box
        sx={{
          flex: 1,
          p: 4,
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <Box sx={{ maxWidth: 1000, width: "100%" }}>
          <Grid container spacing={4}>
            <Grid
              item
              xs={12}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Avatar
                src={user.photo}
                alt={`${user.firstName} ${user.lastName}`}
                sx={{ width: 100, height: 100 }}
              />
              <Typography
                variant="h5"
                sx={{ mt: 2 }}
              >{`${user.firstName} ${user.lastName}`}</Typography>
              <Typography variant="body1">{user.email}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleChangePassword}
                sx={{ mt: 2 }}
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  ) : (
    <Typography variant="h6">User not found</Typography>
  );
};

export default ProfilePage;
