import { Alert, Box, Link, Snackbar } from "@mui/material";
import Button from "@mui/material/Button/Button";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import Container from "@mui/material/Container/Container";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Paper from "@mui/material/Paper/Paper";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiStore } from "../../state/apiStore";
import theme from "../../theme";

const SIGN_UP = "/signup";

function LogIn() {
  const navigate = useNavigate();

  const { login } = useApiStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async (email: string, password: string) => {
    login(email, password)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          localStorage.setItem("jwtToken", data.jwt);
          localStorage.setItem("userFirstName", data.firstName);
          localStorage.setItem("userLastName", data.lastName);
        
          navigate("/");
        } else {
          setError("Login failed. Please try again.");
          setSnackbarOpen(true);
        }
      })
      .catch((error) => {
        if (!error.response) {
          setError("Network error. Please try again later.");
          setSnackbarOpen(true);
          return;
        }

        if (error.response.status === 401) {
          setError("Invalid email or password.");
        } else {
          setError("Login failed. Please try again.");
        }
        setSnackbarOpen(true);
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
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "16px",
          gap: 8,
          padding: 10,
          backgroundColor: "primary.light",
          border: `2px solid ${theme.palette.primary.main}`,
        }}
      >
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
            }
          }}
          noValidate
        >
          <Typography variant="h5" align="left">
            Log In to PawPal
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
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
            <Link href="#" variant="body2" onClick={() => navigate(SIGN_UP)}>
              Don't have an account? Sign Up
            </Link>
          </Box>
        </Container>
        <img
          src="https://placehold.co/400x400"
          alt="PawPal Logo"
          style={{ borderRadius: "16px" }}
        />
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => {
          setSnackbarOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setSnackbarOpen(false);
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default LogIn;
