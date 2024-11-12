import React from "react";
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
import {useApiStore} from "../../state/apiStore";
import { Pet } from "../../models/Pet";

interface AddPetDialogProps {
  open: boolean;
  onClose: () => void;
  onAddPet: (pet: Pet) => void;
}

const AddPetDialog: React.FC<AddPetDialogProps> = ({
  open,
  onClose,
  onAddPet,
}) => {
  const { addPet } = useApiStore();
  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [age, setAge] = React.useState("");
  const [breed, setBreed] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [image, setImage] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const handleAddClick = async() => {
    setError(null);
    try {
      const response = await addPet({ name, gender, age, breed, weight, image });
      onAddPet(response.data);
      onClose();
    } catch (err) {
      setError("Failed to add pet. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="body1">Add Pet</Typography>
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
          InputProps={{ sx: { typography: "body2" } }}
          InputLabelProps={{ sx: { typography: "body2" } }}
        />

        <TextField
          margin="dense"
          label="Image"
          type="text"
          fullWidth
          value={image}
          onChange={(e) => setImage(e.target.value)}
          InputProps={{ sx: { typography: "body2" } }}
          InputLabelProps={{ sx: { typography: "body2" } }}
        />

        <TextField
          margin="dense"
          label="Gender"
          type="text"
          fullWidth
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          InputProps={{ sx: { typography: "body2" } }}
          InputLabelProps={{ sx: { typography: "body2" } }}
        />

        <TextField
          margin="dense"
          label="Age"
          type="text"
          fullWidth
          value={age}
          onChange={(e) => setAge(e.target.value)}
          InputProps={{ sx: { typography: "body2" } }}
          InputLabelProps={{ sx: { typography: "body2" } }}
        />

        <TextField
          margin="dense"
          label="Breed"
          type="text"
          fullWidth
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          InputProps={{ sx: { typography: "body2" } }}
          InputLabelProps={{ sx: { typography: "body2" } }}
        />

        <TextField
          margin="dense"
          label="Weight"
          type="text"
          fullWidth
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          InputProps={{ sx: { typography: "body2" } }}
          InputLabelProps={{ sx: { typography: "body2" } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ typography: "body2" }}>
          Cancel
        </Button>
        <Button
          onClick={handleAddClick}
          color="primary"
          sx={{ typography: "body2" }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPetDialog;
