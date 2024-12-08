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
import { useSnackBarStore } from "../../state/snackBarStore";

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
  const { openAlert } = useSnackBarStore();

  const handleAddClick = () => {

    const parsedAge = parseInt(age, 10);
    const parsedWeight = parseInt(weight, 10);

    addPet({ name, gender, age: parsedAge, breed, weight: parsedWeight, image })
      .then((response) => {
        if (response.status === 200) {
          onAddPet(response.data);
          onClose();
        } else {
          openAlert("Unexpected response status. Please try again.", 'error');
        }
      })
      .catch((error) => {
        if (!error.response) {
          openAlert("Network error. Please check your connection.", 'error');
          return;
        }

        switch (error.response.status) {
          case 400:
            openAlert("Bad request. Please check the pet details.", 'error');
            break;
          case 401:
            openAlert("Unauthorized access. Please log in.", 'error');
            break;
          case 500:
            openAlert("Server error. Please try again later.", 'error');
            break;
          default:
            openAlert("Failed to add pet. Please try again.", 'error');
        }
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="body1">Add New Animal</Typography>
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

        <Box display="flex" alignItems="center" my={2}>
          <Typography variant="body2" color="secondary.dark" sx={{ fontWeight: "bold", mr: 1 }}>
            Male
          </Typography>
          <Switch
            checked={!gender} // When false/female, the switch is toggled to the right
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
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleAddClick}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPetDialog;
