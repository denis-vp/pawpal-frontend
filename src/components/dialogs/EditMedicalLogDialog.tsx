import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";

interface EditMedicalLogDialogProps {
  open: boolean;
  onClose: () => void;
  log: {
    id: number;
    reason: string;
    diagnostic: string;
    treatment: string;
    description: string;
    date: string;
  } | null;
  onUpdateLog: (updatedLog: {
    id: number;
    reason: string;
    diagnostic: string;
    treatment: string;
    description: string;
    date: string;
  }) => void;
}

const EditMedicalLogDialog: React.FC<EditMedicalLogDialogProps> = ({
  open,
  onClose,
  log,
  onUpdateLog,
}) => {
  if (!log) return null;

  const [reason, setReason] = useState(log.reason);
  const [diagnostic, setDiagnostic] = useState(log.diagnostic);
  const [treatment, setTreatment] = useState(log.treatment);
  const [description, setDescription] = useState(log.description);
  const [date, setDate] = useState(log.date);

  const handleUpdateClick = () => {
    onUpdateLog({
      id: log.id,
      reason,
      diagnostic,
      treatment,
      description,
      date,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="body1">Edit Medical Log</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Reason"
          fullWidth
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          InputLabelProps={{ shrink: true, sx: { typography: "body2" } }}
          InputProps={{ sx: { typography: "body2" } }}
        />

        <TextField
          margin="dense"
          label="Diagnostic"
          fullWidth
          value={diagnostic}
          onChange={(e) => setDiagnostic(e.target.value)}
          InputLabelProps={{ shrink: true, sx: { typography: "body2" } }}
          InputProps={{ sx: { typography: "body2" } }}
        />

        <TextField
          margin="dense"
          label="Treatment"
          fullWidth
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          InputLabelProps={{ shrink: true, sx: { typography: "body2" } }}
          InputProps={{ sx: { typography: "body2" } }}
        />

        <TextField
          margin="dense"
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          InputLabelProps={{ shrink: true, sx: { typography: "body2" } }}
          InputProps={{ sx: { typography: "body2" } }}
        />

        <TextField
          margin="dense"
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true, sx: { typography: "body2" } }}
          InputProps={{ sx: { typography: "body2" } }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleUpdateClick} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditMedicalLogDialog;
