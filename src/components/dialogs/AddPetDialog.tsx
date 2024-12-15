import React, { useEffect } from "react";
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
  const [isMale, setIsMale] = React.useState(false);
  const [dateOfBirth, setDateOfBirth] = React.useState<Date | null>(null);
  const [breed, setBreed] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [image, setImage] = React.useState<string | null>(null);
  const [imageName, setImageName] = React.useState<string | null>(null);
  const [type, setAnimalType] = React.useState<AnimalType | "">("");
  const { openAlert } = useSnackBarStore();

  // Reset form fields when dialog is closed
  useEffect(() => {
    if (!open) {
      setName("");
      setIsMale(true);
      setDateOfBirth(null);
      setBreed("");
      setWeight("");
      setImage(null);
      setImageName(null);
      setAnimalType("");
    }
  }, [open]);

  const handleAddClick = () => {
    if (!name || !dateOfBirth || !breed || !weight || !type) {
      openAlert("Please fill all the fields.", "error");
      return;
    }

    const parsedWeight = parseInt(weight, 10);
    const imageType = image ? image.split(";")[0].split(":")[1] : null;

    addPet({
      name,
      isMale: isMale,
      dateOfBirth,
      breed,
      weight: parsedWeight,
      image,
      imageType,
      type,
    })
      .then((response) => {
        if (response.status === 201) {
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
        <Typography
          variant="body1"
          sx={{ justifySelf: "center", fontWeight: "bold" }}
        >
          Add New Animal
        </Typography>
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
          InputProps={{ sx: { typography: "body2" } }}
          InputLabelProps={{ sx: { typography: "body2" } }}
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
            onChange={(e) => {
              const newState = !e.target.checked;
              console.log("isMale updated:", newState); 
              setIsMale(newState);
            }}
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
          type="number"
          fullWidth
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          InputProps={{ sx: { typography: "body2" } }}
          InputLabelProps={{ sx: { typography: "body2" } }}
        />

        <FormControl fullWidth margin="dense">
          {!type && <InputLabel id="animal-type-label">Animal Type</InputLabel>}
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
