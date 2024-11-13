import Header from "./components/Header";
import PetProfile from "./components/pet-profile/PetProfile";
import petPicture from "../src/assets/pet-picture.jpg";
import PetsList from "./components/pet-list/PetsList";
import AddPetDialog from "./components/dialogs/AddPetDialog";
import EditPetDialog from "./components/dialogs/EditPetDialog";
import { ThemeProvider } from "@emotion/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "./theme";
import { CssBaseline } from "@mui/material";
import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";

const petsData = [
  {
    id: 1,
    name: "Buddy",
    image: petPicture,
    gender: "Male",
    age: "2 years",
    breed: "Golden Retriever",
    weight: "25 kg",
  },
  {
    id: 2,
    name: "Bella",
    image: petPicture,
    gender: "Female",
    age: "3 years",
    breed: "Labrador",
    weight: "22 kg",
  },
  {
    id: 3,
    name: "Bella",
    image: petPicture,
    gender: "Female",
    age: "3 years",
    breed: "Labrador",
    weight: "22 kg",
  },
  {
    id: 4,
    name: "Bella",
    image: petPicture,
    gender: "Female",
    age: "3 years",
    breed: "Labrador",
    weight: "22 kg",
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <PetsList />
      </>
    ),
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/:id",
    element: (
      <>
        <Header />
        <PetProfile />
      </>
    ),
  },
  {
    path: "/pets",
    element: (
      <>
        <Header />
        <PetsList />
      </>
    ),
  },
  {
    path: "/add-pet",
    element: (
      <>
        <Header />
        <AddPetDialog open={true} onClose={() => {}} onAddPet={() => {}} />
      </>
    ),
  },
  {
    path: "/edit-pet",
    element: (
      <>
        <Header />
        <EditPetDialog
          open={true}
          onClose={() => {}}
          pet={petsData[0]}
          onUpdatePet={() => {}}
        />
      </>
    ),
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
