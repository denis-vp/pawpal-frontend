import React, { useState } from "react";
import { Grid, Typography, Box, CardMedia, Tooltip, IconButton } from "@mui/material";
import { Pet } from "../../models/Pet";
import EditPetDialog from "../dialogs/EditPetDialog";
import PetsIcon from '@mui/icons-material/Pets';
import { addDataUrlPrefix } from "../../utils/imageUtils";
import EditNoteIcon from '@mui/icons-material/EditNote';

interface ProfileDetailsProps {
  petDetails: Pet;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ petDetails }) => {
  const [editPetDialogOpen, setEditPetDialogOpen] = useState(false);

  const handleEditClick = () => {
    setEditPetDialogOpen(true);
  };

  const handleDialogClose = () => {
    setEditPetDialogOpen(false);
  };

  const handleUpdatePet = (updatedPet: Pet) => {
    console.log("Updated pet details:", updatedPet);
    setEditPetDialogOpen(false);
  };

  const petImage = petDetails.image ? addDataUrlPrefix(petDetails.image, petDetails.imageType) : null;

  function calculateAge(dateOfBirth: Date) {
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
  }

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
      {/* Image Section */}
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
              /></IconButton></Tooltip>
        </Box>

        {/* Grid for details */}
        <Grid container spacing={2}>
          {/* Type and Breed */}
          <Grid item xs={6} display="flex" alignItems="left">
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "text.secondary", mr: 2 }}>
              Type:
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                fontWeight: "bold",
                bgcolor: "primary.light",
                px: 1.5,
                py: 0.5,
                borderRadius: 20,
              }}
            >
              {petDetails.type}
            </Typography>
          </Grid>
          <Grid item xs={6} display="flex" alignItems="left">
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "text.secondary", mr: 2 }}>
              Breed:
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                fontWeight: "bold",
                bgcolor: "primary.light",
                px: 1.5,
                py: 0.5,
                borderRadius: 20,
              }}
            >
              {petDetails.breed}
            </Typography>
          </Grid>

          {/* Gender and Weight */}
          <Grid item xs={6} display="flex" alignItems="left">
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "text.secondary", mr: 2 }}>
              Gender:
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                fontWeight: "bold",
                bgcolor: "primary.light",
                px: 1.5,
                py: 0.5,
                borderRadius: 20,
              }}
            >
              {petDetails.isMale ? "Male" : "Female"}
            </Typography>
          </Grid>
          <Grid item xs={6} display="flex" alignItems="left">
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "text.secondary", mr: 2 }}>
              Weight:
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                fontWeight: "bold",
                bgcolor: "primary.light",
                px: 1.5,
                py: 0.5,
                borderRadius: 20,
              }}
            >
              {petDetails.weight} kg
            </Typography>
          </Grid>
          {/* Date of Birth and Age */}
          <Grid item xs={6} display="flex" alignItems="left">
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "text.secondary", mr: 2 }}>
              Date of Birth:
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                fontWeight: "bold",
                bgcolor: "primary.light",
                px: 1.5,
                py: 0.5,
                borderRadius: 20,
              }}
            >
              {petDetails.dateOfBirth
                ? formatDateWithOrdinal(petDetails.dateOfBirth)
                : "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6} display="flex" alignItems="left">
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "text.secondary", mr: 2 }}>
              Age:
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                fontWeight: "bold",
                bgcolor: "primary.light",
                px: 1.5,
                py: 0.5,
                borderRadius: 20,
              }}
            >
              {calculateAge(petDetails.dateOfBirth)}
            </Typography>
          </Grid>

        </Grid>

      </Grid>

      {/* EditPetDialog Component */}
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
