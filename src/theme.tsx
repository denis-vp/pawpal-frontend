import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#111811" },
    secondary: { main: "#cde0cc", light: '#f0f4f0', dark: '#4b704b' },
    text: {
      primary: "#111811",
      secondary: "#535453",
    },
    tonalOffset: {
      light: 0.1,
      dark: 0.9,
    },
  },

  typography: {
    fontFamily: ["Inter", "Noto Sans", "sans-serif"].join(","),
    h1: { fontWeight: 700, fontSize: "3rem", fontFamily: 'cursive' },
    h2: { fontWeight: 700, fontSize: "1.75rem" },
    h3: { fontWeight: 700, fontSize: "1.5rem", fontFamily: 'cursive' },
    body1: { fontWeight: 700, fontSize: "2rem", fontFamily: 'cursive' },
    body2: { fontWeight: 700, fontSize: "1.125rem" },
    button: { fontWeight: 700, textTransform: "none" },
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
  },
});

export default theme;
