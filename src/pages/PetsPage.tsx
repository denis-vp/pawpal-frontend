import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useApiStore } from "../state/apiStore";
import { Pet } from "../models/Pet";
import PetCard from "../components/pets-page/PetCard";
import AddPetDialog from "../components/dialogs/AddPetDialog";
import { useSnackBarStore } from "../state/snackBarStore";

const PetsPage: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [addPetDialogOpen, setAddPetDialogOpen] = useState(false);

  const { getAllPetsByUserId, getPetById } = useApiStore();
  const { openAlert } = useSnackBarStore();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await getAllPetsByUserId();

        switch (response.status) {
          case 200:
            if (Array.isArray(response.data)) {
              setPets(response.data);
            } else {
              openAlert(
                "Unexpected data format received from server.",
                "error"
              );
            }
            break;

          case 400:
            openAlert("Invalid user ID provided. Please try again.", "error");
            break;

          case 404:
            openAlert("No pets found for the specified user ID.", "error");
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
            break;
        }
      } catch (error) {
        openAlert("Network error or server is unreachable.", "error");
      }
    };

    fetchPets();
  }, [getAllPetsByUserId]);

  const handleAddClick = () => setAddPetDialogOpen(true);
  const handleCloseDialog = () => setAddPetDialogOpen(false);

  const handleAddPet = (petId: number) => {
    getPetById(petId).then((response) => {
      if (response.status === 200) {
        setPets((prevPets) => [...prevPets, response.data]);
      } else {
        openAlert("Unexpected response status. Please try again.", "error");
      }
    });
    setAddPetDialogOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
      }}
    >
      <Button
        variant="contained"
        disableElevation
        onClick={handleAddClick}
        sx={{
          fontSize: "1.25rem",
          color: "primary.contrastText",
        }}
      >
        Add Pet Profile
      </Button>

      <Grid container spacing={4} mt={3}>
        {pets.map((pet) => (
          <Grid item xs={12} key={pet.id}>
            <PetCard pet={pet} />
          </Grid>
        ))}
      </Grid>

      <AddPetDialog
        open={addPetDialogOpen}
        onClose={handleCloseDialog}
        onAddPet={handleAddPet}
      />
    </Box>
  );
};

export default PetsPage;
