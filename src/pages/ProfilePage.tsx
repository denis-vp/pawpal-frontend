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
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
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
  const { getDetails, updateUserImage, resetUserPassword } = useApiStore();
  const { openAlert } = useSnackBarStore();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      openAlert(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
        "error"
      );
      return;
    };

    resetUserPassword(newPassword)
      .then((response) => {
        switch (response.status) {
          case 200:
            openAlert("Password changed successfully.", "success");
            break;
          case 400:
            openAlert("Invalid request. Please try again.", "error");
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
      })
      .catch((error) => {
        openAlert("Network error or server is unreachable.", "error");
        console.error("Error changing password:", error);
      });
  };

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

  const handleImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result as string;
          const imageType = "png";
          console.log("Image type:", imageType);
          console.log("Base64 string:", base64String);
          try {
            const response = await updateUserImage(base64String, imageType);
            if (response.status === 200) {
              openAlert("Image updated successfully.", "success");
              setUser((prevUser) =>
                prevUser ? { ...prevUser, photo: base64String } : null
              );
            } else {
              openAlert("Failed to update image. Please try again.", "error");
            }
          } catch (error) {
            openAlert("Failed to update image. Please try again.", "error");
            console.error("Error updating user image:", error);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  if (loading) {
    return <CircularProgress />;
  }

  return user ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
          p: 2,
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Box
              sx={{
                width: "25em",
                height: "25em",
                padding: 2,
                borderRadius: "50%",
                backgroundColor: "primary.dark",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "transform 0.5s ease, box-shadow 0.5s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: 8,
                },
              }}
              onClick={handleImageClick}
            >
              <Avatar
                src={user.photo}
                alt={`${user.firstName} ${user.lastName}`}
                sx={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  sx={{ fontWeight: "bold" }}
                >
                  First Name
                </Typography>
                <Typography variant="body1">{user.firstName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  sx={{ fontWeight: "bold" }}
                >
                  Last Name
                </Typography>
                <Typography variant="body1">{user.lastName}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  sx={{ fontWeight: "bold" }}
                >
                  Email
                </Typography>
                <Typography variant="body1">{user.email}</Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenPasswordDialog(true)}
              >
                Change Password
              </Button>
              <Dialog
                open={openPasswordDialog}
                onClose={() => setOpenPasswordDialog(false)}
              >
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="New Password"
                    type="password"
                    fullWidth
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setOpenPasswordDialog(false);
                      setNewPassword("");
                    }}
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleChangePassword} color="primary">
                    Change
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  ) : (
    <Typography variant="h6">User not found</Typography>
  );
};

export default ProfilePage;
