import React, { useState, useEffect } from "react";
import { Box, Fab, Grid, Tooltip } from "@mui/material";
import { useApiStore } from "../state/apiStore";
import { VeterinaryAppointment } from "../models/VeterinaryAppointment";
import { useSnackBarStore } from "../state/snackBarStore";
import AddIcon from "@mui/icons-material/Add";
import AppointmentCard from "../components/cards/AppointmentCard";
import AddAppointmentDialog from "../components/dialogs/AddAppointmentDialog";

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<VeterinaryAppointment[]>([]);
  const [addAppointmentDialogOpen, setAddAppointmentDialogOpen] = useState(false);

  const { getAllAppointments } = useApiStore();
  const { openAlert } = useSnackBarStore();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getAllAppointments();

        switch (response.status) {
          case 200:
            if (Array.isArray(response.data)) {
              setAppointments(response.data);
            } else {
              openAlert("Unexpected data format received from server.", "error");
            }
            break;

          case 204:
            break;

          case 400:
            openAlert("Invalid user ID provided. Please try again.", "error");
            break;

          case 404:
            openAlert("No appointments found for the specified user ID.", "error");
            break;

          case 500:
            openAlert("Server encountered an error. Please try again later.", "error");
            break;

          default:
            openAlert("An unexpected error occurred. Please try again.", "error");
            break;
        }
      } catch (error) {
        openAlert("Network error or server is unreachable.", "error");
      }
    };

    fetchAppointments();
  }, [getAllAppointments]);

  const handleAddClick = () => setAddAppointmentDialogOpen(true);
  const handleCloseDialog = () => setAddAppointmentDialogOpen(false);

  const handleAddAppointment = (appointment: VeterinaryAppointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, appointment]);
    setAddAppointmentDialogOpen(false);
  };

  const handleDeleteAppointment = (appointmentId: number) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== appointmentId)
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Tooltip title="Add New Appointment">
        <Fab
          color="primary"
          onClick={handleAddClick}
          sx={{
            position: "fixed",
            bottom: "2em",
            right: "2em",
            color: "white",
            padding: 1,
            borderRadius: "50%",
            cursor: "pointer",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.2)",
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <AddIcon fontSize="large" />
        </Fab>
      </Tooltip>

      <Grid container spacing={4} mt={3}>
        {appointments.map((appointment) => (
          <Grid item xs={12} key={appointment.id}>
            <AppointmentCard appointment={appointment} onDelete={handleDeleteAppointment} />
          </Grid>
        ))}
      </Grid>

      <AddAppointmentDialog
        open={addAppointmentDialogOpen}
        onClose={handleCloseDialog} onSubmit={handleAddAppointment} />
    </Box>
  );
};

export default AppointmentsPage;
