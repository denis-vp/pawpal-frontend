import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, ThemeProvider, CssBaseline, Typography, IconButton } from '@mui/material';
import ProfileDetails from './ProfileDetails';
import MedicalLog from './MedicalLogCard';
import VaccineLog from './VaccineLogCard';
import DocumentCard from './DocumentCard';
import AddIcon from '@mui/icons-material/Add';
import theme from '../../theme';
import { Pet } from '../../models/Pet';

interface PetProfileProps {
  petsData: Pet[];
}

const PetProfile: React.FC<PetProfileProps> = ({ petsData }) => {
  const { id } = useParams<{ id: string }>();
  const petDetails = petsData.find((pet) => pet.id === Number(id));

  if (!petDetails) return <Typography variant="h6">Pet not found</Typography>;

  const medicalLogs = [
    { id: 0, reason: 'Something', diagnostic: 'nothing', treatment: 'nothing', description: 'Annual checkup', date: '2022/12/01' },
    { id: 1, reason: 'Something else', diagnostic: 'some disease', treatment: 'some pills', description: 'Some disease', date: '2023/06/07' },
  ];

  const vaccinationLogs = [
    { id: 0, type: 'Rabies Vaccination', date: '2022/05/15', renewDate: '2023/11/15'},
    { id: 1, type: 'DHPPL Booster', date: '2022/05/15', renewDate: '2025/03/03'},
    { id: 2, type: 'Rabies Vaccination', date: '2023/11/15', renewDate: '2024/05/15'},
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', marginTop: '100px', alignItems: 'center', marginLeft: '15rem', }}>
        <Box sx={{ flex: 1, p: 4, display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <Box sx={{ maxWidth: 1000, width: '100%' }}>
            <Grid container spacing={4}>
              <ProfileDetails petDetails={petDetails} />

              <MedicalLog title="Medical Log" logs={medicalLogs} />

              <VaccineLog title="Vaccination Log" logs={vaccinationLogs} />

              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" borderBottom={2} marginBottom={2} alignItems="center">
                  <Typography variant="h2" sx={{ fontWeight: 'bold', pt: 4, marginBottom: 2}}>
                    Documents
                  </Typography>
                  <IconButton>
                    <AddIcon fontSize="large" />
                  </IconButton>
                </Box>
              </Grid>

              <Grid container spacing={3} marginLeft={2}>
                {['Rabies', 'DHPPL', 'Annual Vaccination'].map((doc, index) => (
                  <DocumentCard key={index} title={doc} />
                ))}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PetProfile;
