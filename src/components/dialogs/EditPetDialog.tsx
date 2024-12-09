import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Switch,
} from "@mui/material";
import { useApiStore } from "../../state/apiStore";
import { useSnackBarStore } from "../../state/snackBarStore";

interface EditPetDialogProps {
  open: boolean;
  onClose: () => void;
  pet: Pet | null;
  onUpdatePet: (updatePet: Pet) => void;
}

export interface Pet {
  id: number;
  name: string;
  image: string;
  gender: boolean;
  age: string;
  breed: string;
  weight: string;
}

const EditPetDialog: React.FC<EditPetDialogProps> = ({
  open,
  onClose,
  pet,
  onUpdatePet,
}) => {
  const { updatePet } = useApiStore();
  const [name, setName] = useState("");
  const [gender, setGender] = useState(false);
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState("");
  const { openAlert } = useSnackBarStore();

  useEffect(() => {
    if (pet) {
      setName(pet.name);
      setImage(pet.image);
      setGender(pet.gender);
      setAge(pet.age);
      setBreed(pet.breed);
      setWeight(pet.weight);
    }
  }, [pet]);

  const handleUpdateClick = () => {
    const parsedAge = parseInt(age);
    const parsedWeight = parseInt(weight)
    if (pet) {
      updatePet(pet.id, { name, isMale: gender, dateOfBirth: parsedAge, breed, weight: parsedWeight, image })
        .then((response) => {
          if (response.status === 200) {
            onUpdatePet(response.data);
            onClose();
          } else {
            openAlert("Unexpected response status. Please try again.", "error");
          }
        })
        .catch((error) => {
          if (!error.response) {
            openAlert("Network error. Please check your connection.", "error");
            return;
          }

          switch (error.response.status) {
            case 400:
              openAlert("Bad request. Please check the pet details.", "error");
              break;
            case 401:
              openAlert("Unauthorized access. Please log in.", "error");
              break;
            case 404:
              openAlert("Pet not found. It may have been deleted.", "error");
              break;
            case 500:
              openAlert("Server error. Please try again later.", "error");
              break;
            default:
              openAlert("Failed to update pet. Please try again.", "error");
          }
        });
    }
  };


  if (!pet) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="body1">Edit Pet</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputLabelProps={{ shrink: true, sx: { typography: "body2" } }}
          InputProps={{ sx: { typography: "body2" } }}
        />

        <TextField
          margin="dense"
          label="Image URL"
          type="text"
          fullWidth
          value={image}
          onChange={(e) => setImage(e.target.value)}
          InputLabelProps={{ shrink: true, sx: { typography: "body2" } }}
          InputProps={{ sx: { typography: "body2" } }}
        />

        <Box display="flex" alignItems="center" my={2}>
          <Typography variant="body2" color="secondary.dark" sx={{ fontWeight: "bold", mr: 1 }}>
            Male
          </Typography>
          <Switch
            checked={!gender} 
            onChange={(e) => setGender(!e.target.checked)}
            sx={{
              "& .MuiSwitch-thumb": {
                backgroundColor: gender ? "#529ff7" : "#fb6f92",
              },
              "& .MuiSwitch-track": {
                backgroundColor: gender ? "#add3ff" : "#fcd9fa",
              },
            }}
          />
          <Typography variant="body2" color="#fb6f92" sx={{ fontWeight: "bold", ml: 1 }}>
            Female
          </Typography>
        </Box>

        <TextField
          margin="dense"
          label="Age"
          type="text"
          fullWidth
          value={age}
          onChange={(e) => setAge(e.target.value)}
          InputLabelProps={{ shrink: true, sx: { typography: "body2" } }}
          InputProps={{ sx: { typography: "body2" } }}
        />

        <TextField
          margin="dense"
          label="Breed"
          type="text"
          fullWidth
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          InputLabelProps={{ shrink: true, sx: { typography: "body2" } }}
          InputProps={{ sx: { typography: "body2" } }}
        />

        <TextField
          margin="dense"
          label="Weight"
          type="text"
          fullWidth
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          InputLabelProps={{ shrink: true, sx: { typography: "body2" } }}
          InputProps={{ sx: { typography: "body2" } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ typography: "body2" }}>
          Cancel
        </Button>
        <Button
          onClick={handleUpdateClick}
          color="primary"
          sx={{ typography: "body2" }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPetDialog;
