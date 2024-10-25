import { Box, Link } from "@mui/material";
import Button from "@mui/material/Button/Button";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import Container from "@mui/material/Container/Container";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Paper from "@mui/material/Paper/Paper";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SIGN_UP = "/sign-up";

function LogIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        borderRadius: "16px",
        gap: 8,
        padding: 10,
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
  );
}

export default LogIn;
