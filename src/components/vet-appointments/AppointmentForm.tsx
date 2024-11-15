import {
  Button,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import type { } from "@mui/x-date-pickers-pro/themeAugmentation";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import type { } from "@mui/x-date-pickers/themeAugmentation";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { AppointmentStatus } from "../../models/AppointmentStatus";
import { useApiStore } from "../../state/apiStore";
import { Pet } from "../dialogs/EditPetDialog";

const APPOINTMENT_DURATION = 30;
const APPOINTMENT_BASE_COST = 25.0;

const AppointmentForm: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [showPetDropdown, setShowPetDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

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
    setShowPetDropdown(false);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setShowTimeDropdown(false);
  };

  // HARDCODED TIMES
  const availableTimes = ["13:30", "14:00", "14:30", "15:00", "15:30"];

  const handleSubmit = () => {
    if (!selectedPet || !selectedDate || !selectedTime) {
      alert("Please fill out all required fields.");
      return;
    }

    // Combine date and time for localDateTime field
    const dateTimeString = `${selectedDate.toISOString().split("T")[0]}T${selectedTime}:00`;
    // Create the request body
    const appointmentData = {
      id: 0,
      userId: 1,
      petId: pets[selectedPet-1].id,
      status: AppointmentStatus.SCHEDULED,
      localDateTime: dateTimeString,
      duration: APPOINTMENT_DURATION,
      cost: APPOINTMENT_BASE_COST,
    };

    addVeterinaryAppointment(appointmentData)
      .then(response => {
        if(response.status === 201){
          console.log("Appointment created: ", response.data);
          alert("Appointment created successfully!");
        }
      })
      .catch(error => {
        if(error.response.status === 404){
          alert("There was an error creating the appointment");
        } else {
          alert("The server is down.")
        }
      })
  };

  return (
    <div
      style={{
        width: "100vw",
        paddingLeft: "200px",
        paddingRight: "200px",
      }}
    >
      <Typography variant="h1" align="left" sx={{ fontWeight: "bold" }}>
        Make a Veterinary Appointment
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px",
          backgroundColor: "#1A80E580",
          borderRadius: "10px",
          height: "35vw",
        }}
      >
        {/* Pet Dropdown */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <div style={{ width: "200px" }}>
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
              Pet *
            </Typography>
            <Select
              value={selectedPet || ""}
              onClick={() => setShowPetDropdown(!showPetDropdown)}
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

          {/* Date Picker */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div style={{ width: "200px" }}>
              <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                Date *
              </Typography>
              {/* <ThemeProvider theme={theme} > */}
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
              {/* </ThemeProvider> */}
            </div>
          </LocalizationProvider>

          {/* Time Dropdown */}
          <div style={{ width: "200px" }}>
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
              Time *
            </Typography>
            <Select
              value={selectedTime}
              onClick={() => setShowTimeDropdown(!showTimeDropdown)}
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
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* Important Information */}
          <div
            style={{
              backgroundColor: "white",
              padding: "8px",
              borderRadius: "20px",
              textAlign: "center",
              width: "350px",
            }}
          >
            <Typography
              variant="body2"
              style={{ fontWeight: "bold", color: "red", fontSize: "30px" }}
            >
              IMPORTANT INFORMATION!
            </Typography>
            <br></br>
            <div style={{ paddingRight: "30px", paddingLeft: "30px" }}>
              <Typography
                variant="body2"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                The starting cost for any consultancy is 25 euros. For any
                supplementary investigation, there will be extra charges.
              </Typography>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={() => {
              handleSubmit();
            }}
            className="appointment_form_submit_button"
            variant="contained"
            style={{
              marginTop: "10px",
              backgroundColor: "#1A80E5",
              padding: "10px",
              fontSize: "20px",
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              width: "140px",
              height: "50px",
              alignSelf: "flex-end",
            }}
          >
            Submit
            <FaCheck></FaCheck>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;
