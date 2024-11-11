import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {default: "#f2f7ff"},
    primary: { main: "#111811", light: "#edf2fb" },
    secondary: { main: "#bde0fe", light: '#e2eafc', dark: '#1b263b' },
    text: {
      primary: "#000000",
      secondary: "#3E3D3E",
    },
    tonalOffset: {
      light: 0.1,
      dark: 0.9,
    },
  },

  typography: {
    fontFamily: ["Inter", "Noto Sans", "sans-serif"].join(","),
    h1: { fontWeight: 500, fontSize: "2.5rem" },
    h2: { fontWeight: 500, fontSize: "2rem" },
    h3: { fontWeight: 500, fontSize: "1.75rem" },
    body1: { fontWeight: 400, fontSize: "1rem" },
    body2: { fontWeight: 400, fontSize: "0.875rem" },
    button: { fontWeight: 500, textTransform: "none" },
  },

  shape: { borderRadius: 8 },
  
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:focus': {
            outline: 'none',
          },
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
          },
        },
      },
      defaultProps: {
        size: 'small',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:focus': {
            outline: 'none',
          },
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
          },
        },
      },
      defaultProps: {
        size: 'large',
      },
    },
  },
});

export default theme;
