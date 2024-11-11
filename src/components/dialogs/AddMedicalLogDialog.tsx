import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';

interface AddMedicalLogDialogProps {
  open: boolean;
  onClose: () => void;
  onAddLog: (id: number, reason: string, diagnostic: string, treatment: string, description: string, date: string) => void;
}

const AddMedicalLogDialog: React.FC<AddMedicalLogDialogProps> = ({ open, onClose, onAddLog }) => {
  const [id, setId] = React.useState(0);
  const [reason, setReason] = React.useState('');
  const [diagnostic, setDiagnostic] = React.useState('');
  const [treatment, setTreatment] = React.useState('');
  const [date, setDate] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleAddClick = () => {
    onAddLog(id, reason, diagnostic, treatment, description, date);
    setDate('');
    setDescription('');
    setId(0);
    setReason('');
    setDiagnostic('');
    setTreatment('');
    onClose();
  };

  return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          <Typography variant="body1">Add Medical Log</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Reason"
            type="text"
            fullWidth
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            InputProps={{ sx: { typography: 'body2' } }}
            InputLabelProps={{ sx: { typography: 'body2' } }}
          />

          <TextField
            margin="dense"
            label="Diagnostic"
            type="text"
            fullWidth
            value={diagnostic}
            onChange={(e) => setDiagnostic(e.target.value)}
            InputProps={{ sx: { typography: 'body2' } }}
            InputLabelProps={{ sx: { typography: 'body2' } }}
          />

          <TextField
            margin="dense"
            label="Treatment"
            type="text"
            fullWidth
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            InputProps={{ sx: { typography: 'body2' } }}
            InputLabelProps={{ sx: { typography: 'body2' } }}
          />

          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputProps={{ sx: { typography: 'body2' } }}
            InputLabelProps={{ sx: { typography: 'body2' } }}
          />

          <TextField
            autoFocus
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true, sx: { typography: 'body2' } }}
            InputProps={{ sx: { typography: 'body2' } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} sx={{ typography: 'body2' }}>Cancel</Button>
          <Button onClick={handleAddClick} color="primary" sx={{ typography: 'body2' }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default AddMedicalLogDialog;
