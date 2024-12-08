import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { Pet } from "../../models/Pet";
import PetsIcon from '@mui/icons-material/Pets';

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/${pet.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        cursor: "pointer",
        transition: "transform 0.3s",
        "&:hover": { 
          transform: "scale(1.05)",
          backgroundColor: "primary.main",
        },
        width: "90%",
        maxWidth: "900px", 
        mx: "auto",
        height: 110,
        borderRadius: "20px",
      }}
    >
      <Box display="flex" alignItems="center">
        <PetsIcon
          fontSize="large"
          sx={{ fontSize: 60, margin: 2 }}
        />

        <CardContent>
          <Box display={"flex"} alignItems="center">
            <Typography variant="body1" fontWeight="bold" mt={1}>
              {pet.name}
            </Typography>
            <Box
              display={"flex"}
              alignItems="center"
              color={"text.secondary"}
              ml={2}
              mt={5}
            >
              <Typography variant="body2">
                {pet.gender ? "Male" : "Female"}, {pet.breed}, {pet.age} years, {pet.weight} kg
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Box>
      <Box display={"flex"} alignItems="center" color={"text.secondary"}>
        <Typography variant="body2" fontWeight="bold" mr={2}>
          View Profile
        </Typography>
        <IconButton>
          <ArrowForwardIcon fontSize="large" />
        </IconButton>
      </Box>
    </Card>
  );
};

export default PetCard;
