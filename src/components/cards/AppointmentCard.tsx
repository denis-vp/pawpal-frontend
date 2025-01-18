import React, { useEffect, useState } from "react";
import { Card, Typography, Chip, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, CircularProgress } from "@mui/material";
import { VeterinaryAppointment } from "../../models/VeterinaryAppointment";
import { AppointmentStatus } from "../../models/AppointmentStatus";
import theme from "../../utils/theme";
import { useApiStore } from "../../state/apiStore";
import DeleteIcon from "@mui/icons-material/Delete";

interface AppointmentCardProps {
  appointment: VeterinaryAppointment;
  onDelete: (appointmentId: number) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onDelete }) => {
  const [petName, setPetName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { getPetById, deleteAppointment } = useApiStore();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAppointment(appointment.id);
      onDelete(appointment.id);
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchPetName = async () => {
      setLoading(true);
      try {
        const response = await getPetById(appointment.petId);
        setPetName(response.data.name);
      } catch (error) {
        console.error("Error fetching pet data:", error);
        setPetName(null);
      }
      setLoading(false);
    };

    if (appointment.petId) {
      fetchPetName();
    }
  }, [appointment.petId]);

  const formatDate = (date: string | Date) => {
    if (date == null) return "Date not available";

    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) {
      return "Invalid Date";
    }

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return dateObj.toLocaleDateString("en-US", options);
  };

  const getStatusLabel = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.SCHEDULED:
        return "Scheduled";
      case AppointmentStatus.COMPLETED:
        return "Completed";
      case AppointmentStatus.CANCELED:
        return "Canceled";
      default:
        return "Unknown";
    }
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: theme.spacing(2),
          borderRadius: 4,
          maxWidth: 900,
          margin: `auto`,
          boxShadow: 3,
          marginBottom: theme.spacing(1),
          transition: "transform 0.3s, background-color 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
            backgroundColor: theme.palette.primary.light,
            boxShadow: theme.shadows[6],
          },
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={9}>
            <Typography variant="h6" fontWeight="bold">
              Appointment for{" "}
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                petName || "Unknown Pet"
              )}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {formatDate(appointment.localDateTime)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Duration: {appointment.duration} mins
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Cost: €{appointment.cost.toFixed(2)}
            </Typography>
          </Grid>

          <Grid item xs={3} container alignItems="center" justifyContent="flex-end">
            <Chip
              label={getStatusLabel(appointment.status)}
              color={appointment.status === AppointmentStatus.CANCELED ? "error" : "primary"}
              sx={{ marginRight: theme.spacing(1) }}
            />
            <IconButton onClick={handleDeleteClick} color="error">
              <DeleteIcon sx={{ fontSize: "1.25em" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this appointment?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppointmentCard;
