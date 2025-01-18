import React, { useState } from "react";
import { Grid, Typography, Box, CardMedia, Tooltip, IconButton } from "@mui/material";
import { Pet } from ".././models/Pet";
import EditPetDialog from "./dialogs/EditPetDialog";
import PetsIcon from '@mui/icons-material/Pets';
import { addDataUrlPrefix } from ".././utils/imageUtils";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useApiStore } from ".././state/apiStore";
import { useSnackBarStore } from ".././state/snackBarStore";

interface ProfileDetailsProps {
  petDetails: Pet;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ petDetails: initialPetDetails }) => {
  const [petDetails, setPetDetails] = useState<Pet>(initialPetDetails);
  const [editPetDialogOpen, setEditPetDialogOpen] = useState(false);
  const { getPetById } = useApiStore();
  const { openAlert } = useSnackBarStore();

  const handleEditClick = () => {
    setEditPetDialogOpen(true);
  };

  const handleDialogClose = () => {
    setEditPetDialogOpen(false);
  };

  const handleUpdatePet = async (updatedPetId: number) => {
    try {
      const response = await getPetById(updatedPetId);

      if (response.status === 200) {
        setPetDetails(response.data);
        openAlert("Pet details updated successfully!", "success");
      } else {
        openAlert("Unexpected response status. Please try again.", "error");
      }
    } catch (error) {
      openAlert("Network error or server is unreachable.", "error");
    }

    setEditPetDialogOpen(false);
  };

  const petImage = petDetails.image ? addDataUrlPrefix(petDetails.image, petDetails.imageType) : null;

  const calculateAge = (dateOfBirth: Date) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      ageYears--;
    }

    if (ageYears === 0) {
      const ageMonths =
        monthDiff >= 0
          ? monthDiff
          : 12 + monthDiff + (today.getDate() >= birthDate.getDate() ? 0 : -1);

      return `${ageMonths} months`;
    }

    return `${ageYears} years and ${monthDiff} months`;
  };

  const getOrdinalSuffix = (day: number) => {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const formatDateWithOrdinal = (date: Date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.toLocaleString('default', { month: 'long' });
    const year = d.getFullYear();
    return `${day}${getOrdinalSuffix(day)} of ${month}, ${year}`;
  };

  return (
    <Grid container spacing={4} alignItems="center">
      <Grid item xs={12} md={4} display="flex" justifyContent="center">
        <Box
          sx={{
            width: 300,
            height: 300,
            padding: 2,
            borderRadius: "50%",
            backgroundColor: "primary.dark",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "transform 0.5s ease, box-shadow 0.5s ease",
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: 8,
            },
          }}
        >
          {petImage ? (
            <CardMedia
              component="img"
              image={petImage}
              alt={`${petDetails.name}'s picture`}
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          ) : (
            <PetsIcon sx={{ fontSize: "10em", color: "white" }} />
          )}
        </Box>
      </Grid>

      <Grid item xs={12} md={8}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h1" gutterBottom>
            {petDetails.name}
          </Typography>
          <Tooltip title="Edit Profile" arrow>
            <IconButton>
              <EditNoteIcon
                sx={{
                  fontSize: 50,
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onClick={handleEditClick}
              />
            </IconButton>
          </Tooltip>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Type:</strong> {petDetails.type}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Breed:</strong> {petDetails.breed}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Gender:</strong> {petDetails.isMale ? "Male" : "Female"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Weight:</strong> {petDetails.weight} kg
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Date of Birth:</strong>{" "}
              {petDetails.dateOfBirth ? formatDateWithOrdinal(petDetails.dateOfBirth) : "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Age:</strong> {calculateAge(petDetails.dateOfBirth)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <EditPetDialog
        open={editPetDialogOpen}
        onClose={handleDialogClose}
        pet={petDetails}
        onUpdatePet={handleUpdatePet}
      />
    </Grid>
  );
};

export default ProfileDetails;
