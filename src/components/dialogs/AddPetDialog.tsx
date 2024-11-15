import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Switch,
  Box,
} from "@mui/material";
import { useApiStore } from "../../state/apiStore";

interface AddPetDialogProps {
  open: boolean;
  onClose: () => void;
  onAddPet: (id: number) => void;
}

const AddPetDialog: React.FC<AddPetDialogProps> = ({
  open,
  onClose,
  onAddPet,
}) => {
  const { addPet } = useApiStore();
  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState(false); // false for female, true for male
  const [age, setAge] = React.useState("");
  const [breed, setBreed] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [image, setImage] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const handleAddClick = () => {
    setError(null);

    const parsedAge = parseInt(age, 10);
    const parsedWeight = parseInt(weight, 10);

    addPet({ name, gender, age: parsedAge, breed, weight: parsedWeight, image })
      .then((response) => {
        if (response.status === 200) {
          onAddPet(response.data);
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
          case 500:
            setError("Server error. Please try again later.");
            break;
          default:
            setError("Failed to add pet. Please try again.");
        }
      });
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

        <Box display="flex" alignItems="center" my={2}>
          <Typography variant="body2" color="secondary.dark" sx={{ fontWeight: "bold", mr: 1 }}>
            Male
          </Typography>
          <Switch
            checked={!gender} // When false/female, the switch is toggled to the right
            onChange={(e) => setGender(!e.target.checked)}
            sx={{
              "& .MuiSwitch-thumb": {
                backgroundColor: gender ? "primary.main" : "#fb6f92"
              },
              "& .MuiSwitch-track": {
                backgroundColor: gender ? "secondary.light" : "#ffc2d1"
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
