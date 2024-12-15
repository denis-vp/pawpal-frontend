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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { useApiStore } from "../../state/apiStore";
import { useSnackBarStore } from "../../state/snackBarStore";
import { Pet } from "../../models/Pet";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { AnimalType } from "../../models/AnimalType";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface EditPetDialogProps {
  open: boolean;
  onClose: () => void;
  pet: Pet | null;
  onUpdatePet: (updatePetId: number) => void;
}

const EditPetDialog: React.FC<EditPetDialogProps> = ({
  open,
  onClose,
  pet,
  onUpdatePet,
}) => {
  const { updatePet } = useApiStore();
  const [name, setName] = useState("");
  const [isMale, setIsMale] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState<string | null>(null);
  const [type, setAnimalType] = useState<AnimalType | "">("");
  const { openAlert } = useSnackBarStore();

  useEffect(() => {
    if (pet) {
      setName(pet.name);
      setImage(pet.image);
      setIsMale(pet.isMale);
      setDateOfBirth(pet.dateOfBirth.toString());
      setBreed(pet.breed);
      setWeight(pet.weight.toString());
      setAnimalType(pet.type);
    }
  }, [pet]);

  const handleUpdateClick = () => {
    if (!type) {
      openAlert("Animal type is required.", "error");
      return;
    }
    console.log("Selected Type:", type);
    const parsedWeight = parseInt(weight);
    const date = new Date(dateOfBirth);
    if (pet) {
      const imageType = image.split(";")[0].split(":")[1];
      updatePet(pet.id, { name, isMale, dateOfBirth: date, breed, weight: parsedWeight, image, imageType, type })
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

  const handleFileUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="body1" sx={{ justifySelf: "center", fontWeight: "bold" }}>Edit Animal</Typography>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" my={2}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload New Image
            <VisuallyHiddenInput type="file" onChange={handleFileUpdate} />
          </Button>
          {imageName && (
            <Typography variant="body2" sx={{ ml: 2 }}>
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
          InputLabelProps={{ shrink: true, sx: { typography: "body2" } }}
          InputProps={{ sx: { typography: "body2" } }}
        />

        <Box display="flex" alignItems="center" my={2}>
          <Typography
            variant="body2"
            sx={{ marginRight: 4, fontWeight: "bold" }}
          >
            Gender
          </Typography>
          <Typography
            variant="body2"
            color="secondary.dark"
            sx={{ marginRight: 1, color: isMale ? "#529ff7" : "#add3ff" }}
          >
            Male
          </Typography>
          <Switch
            checked={!isMale}
            onChange={(e) => { setIsMale(!e.target.checked)}}
            sx={{
              "& .MuiSwitch-thumb": {
                backgroundColor: isMale ? "#529ff7" : "#fb6f92",
              },
              "& .MuiSwitch-track": {
                backgroundColor: isMale ? "#add3ff" : "#fcd9fa",
              },
            }}
          />
          <Typography
            variant="body2"
            sx={{ marginLeft: 1, color: isMale ? "#fb6f92" : "#fcd9fa" }}
          >
            Female
          </Typography>
        </Box>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of Birth"
            value={dayjs(dateOfBirth)}
            onChange={(newDate) => {
              if (newDate) {
                setDateOfBirth(newDate.toString()); 
              }
            }}
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

        <FormControl fullWidth margin="dense">
          {!type && <InputLabel id="animal-type-label">Animal Type</InputLabel>}
          <Select
            labelId="animal-type-label"
            value={type}
            onChange={(e) => setAnimalType(e.target.value as AnimalType)}
            fullWidth
          >
            {Object.values(AnimalType).map((animalType) => (
      <MenuItem key={animalType} value={animalType}>
        {animalType}
      </MenuItem>
    ))}
          </Select>
        </FormControl>
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
