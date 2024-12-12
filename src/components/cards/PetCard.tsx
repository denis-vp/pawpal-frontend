import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  useTheme,
  CardMedia,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { Pet } from "../../models/Pet";
import PetsIcon from "@mui/icons-material/Pets";
import { addDataUrlPrefix } from "../../utils/imageUtils";

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleCardClick = () => {
    navigate(`/${pet.id}`);
  };

  function calculateAge(dateOfBirth: Date) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  const petImage = pet.image ? addDataUrlPrefix(pet.image, "png") : null;

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: theme.spacing(2),
        cursor: "pointer",
        transition: "transform 0.3s, background-color 0.3s",
        borderRadius: 4,
        maxWidth: 900,
        margin: `auto`,
        boxShadow: 3,
        "&:hover": {
          transform: "scale(1.05)",
          backgroundColor: theme.palette.primary.light,
          boxShadow: theme.shadows[6],
        },
      }}
    >
      {/* Image and Details Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
        {petImage ? (
          <CardMedia
            component="img"
            image={petImage}
            alt={`${pet.name}'s picture`}
            sx={{
              width: "6em",
              height: "6em",
              borderRadius: "50%",
              objectFit: "cover ",
            }}
          />
        ) : (
          <PetsIcon sx={{ fontSize: "6em" }} />
        )}

        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {pet.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${pet.type}, ${pet.breed}, ${pet.isMale ? "Male" : "Female"}, ${calculateAge(pet.dateOfBirth)} years, ${pet.weight} kg`}
          </Typography>
        </CardContent>
      </Box>

      {/* Action Section */}
      <Box display="flex" alignItems="center">
        <Typography variant="body2" fontWeight="bold" mr={1}>
          View Profile
        </Typography>
        <IconButton size="large">
          <ArrowForwardIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </Card>
  );
};

export default PetCard;
