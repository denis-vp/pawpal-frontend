import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useApiStore } from "../../state/apiStore";

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
  gender: string;
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
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState<string | null>(null);

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
    setError(null);
  
    if (pet) {
      updatePet(pet.id, { name, gender, age, breed, weight, image })
        .then((response) => {
          if (response.status === 200) {
            onUpdatePet(response.data);
            onClose();
          } else {
            setError("Unexpected response status. Please try again.");
          }
        })
        .catch((error) => {
          if (!error.response) {
            setError("Network error. Please check your connection.");
            return;
          }
  
          switch (error.response.status) {
            case 400:
              setError("Bad request. Please check the pet details.");
              break;
            case 401:
              setError("Unauthorized access. Please log in.");
              break;
            case 404:
              setError("Pet not found. It may have been deleted.");
              break;
            case 500:
              setError("Server error. Please try again later.");
              break;
            default:
              setError("Failed to update pet. Please try again.");
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
      {error && <Typography color="error">{error}</Typography>}
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

        <TextField
          margin="dense"
          label="Gender"
          type="text"
          fullWidth
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          InputLabelProps={{ shrink: true, sx: { typography: "body2" } }}
          InputProps={{ sx: { typography: "body2" } }}
        />

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
