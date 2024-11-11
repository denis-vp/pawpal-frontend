import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";

interface AddPetDialogProps {
  open: boolean;
  onClose: () => void;
  onAddPet: (
    id: number,
    name: string,
    gender: string,
    age: string,
    breed: string,
    weight: string,
    image: string
  ) => void;
}

const AddPetDialog: React.FC<AddPetDialogProps> = ({
  open,
  onClose,
  onAddPet,
}) => {
  const [id, setId] = React.useState(0);
  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [age, setAge] = React.useState("");
  const [breed, setBreed] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [image, setImage] = React.useState("");

  const handleAddClick = () => {
    onAddPet(id, name, gender, age, breed, weight, image);
    setId(0);
    setName("");
    setGender("");
    setAge("");
    setBreed("");
    setWeight("");
    setImage("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="body1">Add Pet</Typography>
      </DialogTitle>
      <DialogContent>
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
