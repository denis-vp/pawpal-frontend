import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import PetCard from "./PetCard";
import { Pet } from "../../models/Pet";
import AddPetDialog from "../dialogs/AddPetDialog";
import { useApiStore } from "../../state/apiStore";

const PetsList: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [addPetDialogOpen, setAddPetDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { getAllPetsByUserId, getPetById } = useApiStore();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await getAllPetsByUserId();
        
        switch (response.status) {
          case 200:
            if (Array.isArray(response.data)) { 
              setPets(response.data);           
              setErrorMessage(null);
            } else {
              setErrorMessage("Unexpected data format received from server.");
            }
            break;

          case 400:
            setErrorMessage("Invalid user ID provided. Please try again.");
            break;

          case 404:
            setErrorMessage("No pets found for the specified user ID.");
            break;

          case 500:
            setErrorMessage("Server encountered an error. Please try again later.");
            break;

          default:
            setErrorMessage("An unexpected error occurred. Please try again.");
            break;
        }
      } catch (error) {
        setErrorMessage("Network error or server is unreachable.");
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, [getAllPetsByUserId]);

  const handleAddClick = () => setAddPetDialogOpen(true);
  const handleCloseDialog = () => setAddPetDialogOpen(false);

  const handleAddPet = (
    petId: number
  ) => {
    getPetById(petId)
    .then((response) => {
      if (response.status === 200) {
        setPets((prevPets) => [...prevPets, response.data]);
        setErrorMessage(null);
      } else {
        setErrorMessage("Unexpected response status. Please try again.");
      }
    })
    setAddPetDialogOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100vw',
        mt: '100px'
      }}
    >
      <Box sx={{ padding: 4, textAlign: 'center', width: '100%', maxWidth: '800px' }}>
        <Typography variant="h1" sx={{ textAlign: 'center' }}>
          All Pets Page
        </Typography>
  
        {errorMessage && (
          <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
            {errorMessage}
          </Typography>
        )}
  
        <Grid container spacing={4} mt={3}>
          {pets.map((pet) => (
            <Grid item xs={12} key={pet.id}>
              <PetCard pet={pet} />
            </Grid>
          ))}
        </Grid>
  
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            disableElevation
            onClick={handleAddClick}
            sx={{ mr: 20, mb: 2, mt: 2, ml: 20, fontSize: '1.25rem', color: 'primary.contrastText' }}
          >
            Add Pet Profile
          </Button>
        </Box>
  
        <AddPetDialog open={addPetDialogOpen} onClose={handleCloseDialog} onAddPet={handleAddPet} />
      </Box>
    </Box>
  );  
};

export default PetsList;
