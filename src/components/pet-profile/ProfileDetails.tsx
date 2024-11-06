import React from 'react';
import { Grid, Typography, Box, Button, ThemeProvider } from '@mui/material';
import { Pet } from '../../models/Pet';
import theme from '../../theme';

interface ProfileDetailsProps {
  petDetails: Pet;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ petDetails }) => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={4} alignItems="center">
        {/* Image Section */}
        <Grid item xs={12} md={4} display="flex" justifyContent="center">
          <Box
            sx={{
              width: 300,
              height: 300,
              padding: 2,
              borderRadius: '50%',
              backgroundColor: 'secondary.dark',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'transform 0.5s ease, box-shadow 0.5s ease',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: 8,
              },
            }}
          >
            <img
              src={petDetails.image}
              alt="Pet"
              style={{ width: '100%', height: '100%', borderRadius: '50%' }}
            />
          </Box>
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} md={8} display="flex" flexDirection="column">
          <Typography variant="h1" gutterBottom>{petDetails.name}</Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 2, color: 'text.secondary' }}>Breed:</Typography>
            <Typography
              variant="body2"
              color="text.primary"
              sx={{
                fontWeight: 'bold',
                bgcolor: 'secondary.light',
                px: 1.5,
                py: 0.5,
                borderRadius: 20,
                mr: 4,
              }}
            >
              {petDetails.breed}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 2, color: 'text.secondary' }}>Age:</Typography>
            <Typography
              variant="body2"
              color="text.primary"
              sx={{
                fontWeight: 'bold',
                bgcolor: 'secondary.light',
                px: 1.5,
                py: 0.5,
                borderRadius: 20,
              }}
            >
              {petDetails.age}
            </Typography>
          </Box>

          {/* Row with Gender and Weight */}
          <Box display="flex" alignItems="center" mb={3}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 2, color: 'text.secondary' }}>Gender:</Typography>
            <Typography
              variant="body2"
              color="text.primary"
              sx={{
                fontWeight: 'bold',
                bgcolor: 'secondary.light',
                px: 1.5,
                py: 0.5,
                borderRadius: 20,
                mr: 4,
              }}
            >
              {petDetails.gender}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 2, color: 'text.secondary' }}>Weight:</Typography>
            <Typography
              variant="body2"
              color="text.primary"
              sx={{
                fontWeight: 'bold',
                bgcolor: 'secondary.light',
                px: 1.5,
                py: 0.5,
                borderRadius: 20,
              }}
            >
              {petDetails.weight}
            </Typography>
          </Box>

          {/* Button */}
          <Box textAlign="left">
            <Button 
              size="large"
              variant="contained"
              disableElevation
            >
              Edit Profile
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ProfileDetails;
