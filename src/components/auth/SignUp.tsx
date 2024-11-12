import { Alert, Box, Link, Snackbar } from "@mui/material";
import Button from "@mui/material/Button/Button";
import Container from "@mui/material/Container/Container";
import Paper from "@mui/material/Paper/Paper";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiStore } from "../../state/apiStore";
import theme from "../../theme";

const LOG_IN = "/login";

function SignUp() {
  const navigate = useNavigate();

  const { register } = useApiStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async (
    firstName: string,
    lastName: string,
    email: string
  ) => {
    register(firstName, lastName, email)
      .then((response) => {
        if (response.status === 200) {
          navigate(LOG_IN);
        } else {
          setError("Registration failed. Please try again.");
          setSnackbarOpen(true);
        }
      })
      .catch((error) => {
        if (!error.response) {
          setError("Network error. Please try again later.");
          setSnackbarOpen(true);
          return;
        }

        if (error.response.status === 409) {
          setError("User already exists.");
        } else {
          setError("Registration failed. Please try again.");
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
            if (firstName && lastName && email) {
              handleSubmit(firstName, lastName, email);
            }
          }}
          noValidate
        >
          <Typography variant="h5" align="left">
            Create your PawPal Account
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <TextField
              label="FirsName"
              type="firstName"
              placeholder="John"
              required
              autoComplete="given-name"
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="LastName"
              type="firstName"
              placeholder="Snow"
              required
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
          <TextField
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained">
            Register
          </Button>
          <Link
            href="#"
            variant="body2"
            onClick={() => navigate(LOG_IN)}
            sx={{ alignSelf: "start" }}
          >
            Already have an account? Log In
          </Link>
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

export default SignUp;
