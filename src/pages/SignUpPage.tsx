import { Box, Link } from "@mui/material";
import Button from "@mui/material/Button/Button";
import Container from "@mui/material/Container/Container";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pawpalLogo from "../assets/pawpal-logo.png";
import { useApiStore } from "../state/apiStore";
import { useSnackBarStore } from "../state/snackBarStore";

const LOG_IN = "/login";

function SignUpPage() {
  const navigate = useNavigate();

  const { register } = useApiStore();
  const { openAlert } = useSnackBarStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

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
          openAlert("Registration failed. Please try again.", "error");
        }
      })
      .catch((error) => {
        if (!error.response) {
          openAlert("Network error. Please try again later.", "error");
          return;
        }

        if (error.response.status === 409) {
          openAlert("User already exists.", "error");
        } else {
          openAlert("Registration failed. Please try again.", "error");
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
            if (firstName && lastName && email) {
              handleSubmit(firstName, lastName, email);
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
            sx={{ alignSelf: "start", color: "text.primary" }}
          >
            Already have an account? Log In
          </Link>
        </Container>
      </Container>
    </Box>
  );
}

export default SignUpPage;
