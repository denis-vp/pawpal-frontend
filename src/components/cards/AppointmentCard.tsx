import React from "react";
import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import { VeterinaryAppointment } from "../../models/VeterinaryAppointment";
import { AppointmentStatus } from "../../models/AppointmentStatus";

interface AppointmentCardProps {
  appointment: VeterinaryAppointment;

}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return new Date(date).toLocaleDateString('en-US', options);
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
    <Card sx={{ width: 300, margin: 2, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Appointment for {appointment.pet.name}
        </Typography>
        <Typography variant="body2">
          Date: {formatDate(new Date(appointment.date))}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Duration: {appointment.duration} mins
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Cost: €{appointment.cost.toFixed(2)}
        </Typography>
        <Chip label={getStatusLabel(appointment.status)} color="primary" sx={{ marginTop: 1 }} />
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
      </Box>
    </Card>
  );
};

export default AppointmentCard;
