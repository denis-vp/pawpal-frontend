import React, { useState } from 'react';
import { Grid, Box, Typography, IconButton, ThemeProvider } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import AddVaccineLogDialog from '../dialogs/AddVaccineLogDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from '../../theme';
import { VaccineLog } from '../../models/VaccineLog';
import EditVaccineLogDialog from '../dialogs/EditVaccineLogDialog';
import DeleteConfirmationDialog from '../dialogs/DeleteConfirmationDialog';

interface VaccineLogProps {
  title: string;
  logs: VaccineLog[];
}

const VaccineLogCard: React.FC<VaccineLogProps> = ({ title, logs }) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<VaccineLog | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  const handleArrowClick = (log: VaccineLog) => {
    setSelectedLog(log);
    setViewDialogOpen(true);
  };

  const handleAddLog = (id: number, type: string, date: string, renewDate: string) => {
    console.log("Adding log:", { id, type, date, renewDate });
    // Implement logic to add the log
  };

  const handleDeleteClick = (log: VaccineLog) => {
    setSelectedLog(log);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedLog) {
      console.log("Deleting log:", selectedLog.id);
      // Implement logic to delete the log
    }
    setDeleteDialogOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom={2} sx={{ pt: 4 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{title}</Typography>
          <IconButton onClick={handleAddClick}>
            <AddIcon fontSize="large" />
          </IconButton>
        </Box>

        {logs.map(( log, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 2, p: 2, border: '1px solid #dce5dc', borderRadius: 1, backgroundColor: 'secondary.light' }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <VaccinesIcon sx={{ color: 'primary.main', fontSize: 40 }} />
              <Box>
                <Typography variant="body2" fontWeight="medium">
                  Date: {log.date}
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  Type: {log.type}
                </Typography>
              </Box>
            </Box>
            <Box>
              <IconButton onClick={() => handleDeleteClick( log )} >
                <DeleteIcon fontSize="large" />
              </IconButton>
              <IconButton onClick={() => handleArrowClick( log )}>
                <ArrowForwardIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        ))}

        {/* Dialog for Adding Vaccine Log */}
        <AddVaccineLogDialog
          open={addDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          onAddLog={handleAddLog}
        />

        {/* Dialog for Viewing Vaccine Log */}
        <EditVaccineLogDialog
          open={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          log={selectedLog} onUpdateLog={function (): void {
            throw new Error('Function not implemented.');
          }} />

        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
        />
      </Grid>
    </ThemeProvider>
  );
};

export default VaccineLogCard;
