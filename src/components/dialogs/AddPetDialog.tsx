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
  styled,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useApiStore } from "../../state/apiStore";
import { useSnackBarStore } from "../../state/snackBarStore";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AnimalType } from "../../models/AnimalType";

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
  const [dateOfBirth, setDateOfBirth] = React.useState<Date | null>(null);
  const [breed, setBreed] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [image, setImage] = React.useState<string | null>(null);
  const [imageName, setImageName] = React.useState<string | null>(null);
  const [type, setAnimalType] = React.useState<AnimalType | "">("");
  const { openAlert } = useSnackBarStore();

  const handleAddClick = () => {
    if (!image) {
      openAlert("Please upload an image of the pet.", "error");
      return;
    }

    const parsedWeight = parseInt(weight, 10);

    addPet({ name, gender, dateOfBirth, breed, weight: parsedWeight, image, type })
      .then((response) => {
        if (response.status === 200) {
          onAddPet(response.data);
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
          case 500:
            openAlert("Server error. Please try again later.", "error");
            break;
          default:
            openAlert("Failed to add pet. Please try again.", "error");
        }
      });
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="body1">Add New Animal</Typography>
      </DialogTitle>
      <DialogContent>
        
        <Box display="flex" alignItems="center" my={2}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload Image
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
          </Button>
          {imageName && (
            <Typography
              variant="body2"
              sx={{ ml: 2 }}
            >
              {imageName}
            </Typography>
          )}
        </Box>

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

        <Box display="flex" alignItems="center" my={2}>
          <Typography
            variant="body2"
            sx={{ marginRight: 4 }}
          >
            Gender
          </Typography>
          <Typography
            variant="body2"
            color="secondary.dark"
            sx={{ fontWeight: "bold", marginRight: 1 }}
          >
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
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", marginLeft: 1 }}
          >
            Female
          </Typography>
        </Box>


        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of Birth"
            value={dateOfBirth}
            onChange={(newDate) => setDateOfBirth(newDate)}
            slotProps={{
              textField: {
                margin: "dense",
                fullWidth: true,
                InputProps: { sx: { typography: "body2" } },
                InputLabelProps: { sx: { typography: "body2" } },
              },
            }}
          />
        </LocalizationProvider>

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

        <FormControl fullWidth margin="dense">
          {!type && (
            <InputLabel id="animal-type-label">Animal Type</InputLabel>)}
          <Select
            labelId="animal-type-label"
            value={type}
            onChange={(e) => setAnimalType(e.target.value as AnimalType)}
            fullWidth
          >
            {Object.values(AnimalType).map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddClick}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPetDialog;
