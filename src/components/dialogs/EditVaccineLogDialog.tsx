import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, ThemeProvider, Typography } from '@mui/material';
import theme from '../../theme';

interface EditVaccineLogDialogProps {
  open: boolean;
  onClose: () => void;
  log: VaccineLog | null;
  onUpdateLog: (updatedLog: VaccineLog) => void;
}

export interface VaccineLog {
  id: number;
  type: string;
  date: string;
  renewDate: string;
}

const EditVaccineLogDialog: React.FC<EditVaccineLogDialogProps> = ({ open, onClose, log, onUpdateLog }) => {
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [renewDate, setRenewDate] = useState('');

  useEffect(() => {
    if (log) {
      setType(log.type);
      setDate(log.date);
      setRenewDate(log.renewDate);
    }
  }, [log]);

  const handleUpdateClick = () => {
    if (log) {
      onUpdateLog({
        id: log.id,
        type,
        date,
        renewDate,
      });
      onClose();
    }
  };

  if (!log) return null;

  return (
    <ThemeProvider theme={theme}>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle><Typography variant="body1">Edit Vaccine Log</Typography></DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Vaccine Type"
          type="text"
          fullWidth
          value={type}
          onChange={(e) => setType(e.target.value)}
          InputLabelProps={{ shrink: true, sx: { typography: 'body2' } }}
          InputProps={{ sx: { typography: 'body2' } }}
        />
        <TextField
          margin="dense"
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true, sx: { typography: 'body2' } }}
          InputProps={{ sx: { typography: 'body2' } }}
        />
        <TextField
          margin="dense"
          label="Renew Date"
          type="date"
          fullWidth
          value={renewDate}
          onChange={(e) => setRenewDate(e.target.value)}
          InputLabelProps={{ shrink: true, sx: { typography: 'body2' } }}
          InputProps={{ sx: { typography: 'body2' } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdateClick} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
    </ThemeProvider>
  );
};

export default EditVaccineLogDialog;
