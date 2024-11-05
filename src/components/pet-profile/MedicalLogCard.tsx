import React, { useState } from 'react';
import { Grid, Box, Typography, IconButton, ThemeProvider } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import AddMedicalLogDialog from '../dialogs/AddMedicalLogDialog';
import EditMedicalLogDialog from '../dialogs/EditMedicalLogDialog';
import DeleteConfirmationDialog from '../dialogs/DeleteConfirmationDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from '../../theme';
import { MedicalLog } from '../../models/MedicalLog';

interface MedicalLogProps {
  title: string;
  logs: MedicalLog[];
}

const MedicalLogCard: React.FC<MedicalLogProps> = ({ title, logs }) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<MedicalLog | null>(null);

  const handleAddClick = () => {
    setSelectedLog(null);
    setAddDialogOpen(true);
  };

  const handleArrowClick = (log: MedicalLog) => {
    setSelectedLog(log);
    setViewDialogOpen(true);
  };

  const handleAddLog = (id: number, reason: string, diagnostic: string, treatment: string, description: string, date: string) => {
    console.log("Adding log:", { id, reason, diagnostic, treatment, description, date });
    // Implement logic to add the log
  };

  const handleDeleteClick = (log: MedicalLog) => {
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
            <AddIcon fontSize="large"/>
          </IconButton>
        </Box>

        {logs.map((log) => (
          <Box
            key={log.id}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 2, p: 2, border: '1px solid #dce5dc', borderRadius: 1, backgroundColor: 'secondary.light' }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <MedicalInformationIcon sx={{ color: 'primary.main', fontSize: 40 }} />
              <Box>
                <Typography variant="body2" fontWeight="medium">
                  Date: {log.date}
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  Description: {log.description}
                </Typography>
              </Box>
            </Box>
            <Box>
              <IconButton onClick={() => handleDeleteClick(log)}>
                <DeleteIcon fontSize="large" />
              </IconButton>
              <IconButton onClick={() => handleArrowClick(log)}>
                <ArrowForwardIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        ))}

        <AddMedicalLogDialog
          open={addDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          onAddLog={handleAddLog}
        />

        <EditMedicalLogDialog
          open={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          log={selectedLog}
          onUpdateLog={(updatedLog) => console.log("Updating log:", updatedLog)}
        />

        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
        />
      </Grid>
    </ThemeProvider>
  );
};

export default MedicalLogCard;
