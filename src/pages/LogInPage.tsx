import { Box, Link } from "@mui/material";
import Button from "@mui/material/Button/Button";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import Container from "@mui/material/Container/Container";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pawpalLogo from "../assets/pawpal-logo.png";
import { useApiStore } from "../state/apiStore";
import { useSnackBarStore } from "../state/snackBarStore";

const SIGN_UP = "/signup";
const MAIN_PAGE = "/pets";

function LogInPage() {
  const navigate = useNavigate();

  const { login } = useApiStore();
  const { openAlert } = useSnackBarStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (email: string, password: string) => {
    login(email, password)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          localStorage.setItem("jwtToken", data.token);
          localStorage.setItem("userFirstName", data.firstName);
          localStorage.setItem("userLastName", data.lastName);

          navigate(MAIN_PAGE);
          openAlert("Login successful.", "success");
        } else {
          openAlert("Login failed. Please try again.", "error");
        }
      })
      .catch((error) => {
        if (!error.response) {
          openAlert("Network error. Please try again later.", "error");
          return;
        }

        if (error.response.status === 401) {
          openAlert("Invalid email or password.", "error");
        } else {
          openAlert("Login failed. Please try again.", "error");
        }
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "background.default",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: 2,
          padding: 10,
        }}
      >
        <img
          src={pawpalLogo}
          alt="PawPal Logo"
          style={{ width: "400px", height: "400px", border: "none" }}
        />
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 2,
            padding: 2,
            width: 400,
          }}
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            if (email && password) {
              handleSubmit(email, password);
            } else {
              openAlert("Please fill in all fields.", "error");
            }
          }}
          noValidate
        >
          <Typography
            variant="h5"
            align="left"
            sx={{
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            Log In
          </Typography>
          <TextField
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            required
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            placeholder="justASecurePassword"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Keep me logged in"
          />
          <Button type="submit" fullWidth variant="contained">
            Log In
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link href="#" variant="body2" sx={{ color: "text.primary" }}>
              Forgot password?
            </Link>
            <Link
              href="#"
              variant="body2"
              onClick={() => navigate(SIGN_UP)}
              sx={{ color: "text.primary" }}
            >
              Don't have an account? Sign Up
            </Link>
          </Box>
        </Container>
      </Container>
    </Box>
  );
}

export default LogInPage;
