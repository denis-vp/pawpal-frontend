import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";

interface AddVaccineLogDialogProps {
  open: boolean;
  onClose: () => void;
  onAddLog: (
    id: number,
    type: string,
    date: string,
    description: string
  ) => void;
}

const AddVaccineLogDialog: React.FC<AddVaccineLogDialogProps> = ({
  open,
  onClose,
  onAddLog,
}) => {
  const [id, setId] = React.useState(0);
  const [type, setType] = React.useState("");
  const [date, setDate] = React.useState("");
  const [renewDate, setRenewDate] = React.useState("");

  const handleAddClick = () => {
    onAddLog(id, type, date, renewDate);
    setId(0);
    setType("");
    setDate("");
    setRenewDate("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="body1">Add Vaccine Log</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Type"
          type="text"
          fullWidth
          value={type}
          onChange={(e) => setRenewDate(e.target.value)}
          InputLabelProps={{ shrink: true, sx: { typography: "body2" } }}
          InputProps={{ sx: { typography: "body2" } }}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true, sx: { typography: "body2" } }}
          InputProps={{ sx: { typography: "body2" } }}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Renew Date"
          type="date"
          fullWidth
          value={renewDate}
          onChange={(e) => setRenewDate(e.target.value)}
          InputLabelProps={{ shrink: true, sx: { typography: "body2" } }}
          InputProps={{ sx: { typography: "body2" } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddClick} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddVaccineLogDialog;
