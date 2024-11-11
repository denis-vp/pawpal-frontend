import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import PetCard from "./PetCard";
import { Pet } from "../../models/Pet";
import AddPetDialog from "../dialogs/AddPetDialog";

interface PetsListProps {
  pets: Pet[];
}

const PetsList: React.FC<PetsListProps> = ({ pets }) => {
  const [addPetDialogOpen, setAddPetDialogOpen] = useState(false);

  const handleAddClick = () => setAddPetDialogOpen(true);
  const handleCloseDialog = () => setAddPetDialogOpen(false);

  const handleAddPet = (
    id: number,
    name: string,
    gender: string,
    age: string,
    breed: string,
    weight: string,
    image: string
  ) => {
    const newPet: Pet = { id, name, gender, age, breed, weight, image };
    console.log("Adding new pet:", newPet);
    // Implement logic to add pet
    setAddPetDialogOpen(false);
  };

  return (
    <Box
      sx={{
        padding: 4,
        marginTop: "100px",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        All Pets Page
      </Typography>

      <Grid container spacing={4} mt={4}>
        {pets.map((pet) => (
          <Grid item xs={12} key={pet.id}>
            <PetCard pet={pet} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          disableElevation
          onClick={handleAddClick}
          sx={{
            mr: 20,
            mb: 2,
            mt: 2,
            ml: 20,
            fontSize: "1.25rem",
          }}
        >
          Add Pet Profile
        </Button>
      </Box>

      <AddPetDialog
        open={addPetDialogOpen}
        onClose={handleCloseDialog}
        onAddPet={handleAddPet}
      />
    </Box>
  );
};

export default PetsList;
