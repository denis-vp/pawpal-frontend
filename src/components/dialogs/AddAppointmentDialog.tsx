import React, { useEffect, useState } from "react";
import {
  Button,
  MenuItem,
  Select,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FaCheck } from "react-icons/fa";
import { AppointmentStatus } from "../../models/AppointmentStatus";
import { useApiStore } from "../../state/apiStore";
import { Pet } from "../../models/Pet";
import { useSnackBarStore } from "../../state/snackBarStore";
import { VeterinaryAppointment } from "../../models/VeterinaryAppointment";


const APPOINTMENT_DURATION = 30;
const APPOINTMENT_BASE_COST = 25.0;

interface AddAppointmentDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (appointment: VeterinaryAppointment) => void;
}

const AddAppointmentDialog: React.FC<AddAppointmentDialogProps> = ({ open, onClose, onSubmit }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const { openAlert } = useSnackBarStore();
  const { addVeterinaryAppointment, getAllPetsByUserId } = useApiStore();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await getAllPetsByUserId();

        switch (response.status) {
          case 200:
            if (Array.isArray(response.data)) {
              setPets(response.data);
            } else {
              alert("Unexpected data format received from server.");
            }
            break;

          case 400:
            alert("Invalid user ID provided. Please try again.");
            break;

          case 404:
            alert("No pets found for the specified user ID.");
            break;

          case 500:
            alert("Server encountered an error. Please try again later.");
            break;

          default:
            alert("An unexpected error occurred. Please try again.");
            break;
        }
      } catch (error) {
        alert("Network error or server is unreachable.");
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, [getAllPetsByUserId]);

  const handlePetSelect = (id: number) => {
    setSelectedPet(id);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const availableTimes = ["13:30", "14:00", "14:30", "15:00", "15:30"];

  const handleSubmit = () => {
    if (!selectedPet || !selectedDate || !selectedTime) {
      alert("Please fill out all required fields.");
      return;
    }

    const selectedDateTime = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(":").map(Number);
    selectedDateTime.setHours(hours + 2, minutes, 0, 0);
    const dateTimeString = selectedDateTime.toISOString();

    const pet = pets.find((pet) => pet.id === selectedPet);
    if (!pet) {
      alert("Selected pet not found.");
      return;
    }
    const appointmentData = {
      userId: 1,
      petId: pet.id,
      status: AppointmentStatus.SCHEDULED,
      localDateTime: dateTimeString,
      duration: APPOINTMENT_DURATION,
      cost: APPOINTMENT_BASE_COST,
    };

    addVeterinaryAppointment(appointmentData)
      .then((response) => {
        if (response.status === 201) {
          onSubmit(response.data);
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Make a Veterinary Appointment</DialogTitle>
      <DialogContent>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
              Pet *
            </Typography>
            <Select
              value={selectedPet || ""}
              onChange={(e) => handlePetSelect(Number(e.target.value))}
              displayEmpty
              fullWidth
              style={{ backgroundColor: "#ffffff" }}
            >
              <MenuItem value="" disabled>
                Select your pet
              </MenuItem>
              {pets.map((pet) => (
                <MenuItem key={pet.id} value={pet.id}>
                  {pet.name}
                </MenuItem>
              ))}
            </Select>
          </div>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div>
              <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                Date *
              </Typography>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                minDate={new Date(Date.now())}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: "white",
                  },
                }}
              />
            </div>
          </LocalizationProvider>

          <div>
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
              Time *
            </Typography>
            <Select
              value={selectedTime}
              onChange={(e) => handleTimeSelect(e.target.value as string)}
              displayEmpty
              fullWidth
              style={{ backgroundColor: "#ffffff" }}
            >
              <MenuItem value="" disabled>
                Select the time
              </MenuItem>
              {availableTimes.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "8px",
              borderRadius: "10px",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <Typography
              variant="body2"
              style={{ fontWeight: "bold", color: "red", fontSize: "16px" }}
            >
              IMPORTANT INFORMATION!
            </Typography>
            <div style={{ padding: "10px" }}>
              <Typography variant="body2" style={{ fontSize: "14px" }}>
                The starting cost for any consultancy is 25 euros. Additional charges may apply for supplementary investigations.
              </Typography>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit}
          variant="contained"
          style={{
            backgroundColor: "#1A80E5",
            fontSize: "16px",
            padding: "10px",
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            height: "50px",
          }}
        >
          Submit
          <FaCheck />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAppointmentDialog;