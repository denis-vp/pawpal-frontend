import { ThemeProvider } from "@emotion/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "./utils/theme";
import { CssBaseline } from "@mui/material";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import AlertSnackBar from "./components/AlertSnackBar";
import { useSnackBarStore } from "./state/snackBarStore";
import Layout from "./components/Layout";
import PetsPage from "./pages/PetsPage";
import PetProfile from "./components/pet-profile/PetProfile";
import ProfilePage from "./pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogInPage />,
  },
  {
    path: "/login",
    element: <LogInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/pets",
    element: <Layout children={<PetsPage/>} />,
  },
  {
    path: "/appointments",
    element: <Layout children={<></>} />,
  },
  {
    path: "/profile",
    element: <Layout children={<ProfilePage/>} />,
  },
  {
    path: "/notifications",
    element: <Layout children={<></>} />,
  },
  {
    path: "/:id",
    element: <Layout children={<PetProfile />} />,
  },
]);

function App() {
  const { isOpenAlert, alertText, severity, setIsOpenAlert } =
    useSnackBarStore();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
      <AlertSnackBar
        open={isOpenAlert}
        severity={severity}
        text={alertText}
        setIsOpenAlert={setIsOpenAlert}
      />
    </ThemeProvider>
  );
}

export default App;
