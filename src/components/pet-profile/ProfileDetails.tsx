import React from 'react';
import { Grid, Typography, Box, ThemeProvider } from '@mui/material';
import { Pet } from '../../models/Pet';
import theme from '../../theme';

interface ProfileDetailsProps {
  petDetails: Pet
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ petDetails }) => {

  return (
    <ThemeProvider theme={theme}>
    <Grid container spacing={4}>
      <Grid
        item
        xs={12}
        md={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
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

      <Grid item xs={12} md={8} display="flex" flexDirection="column" marginTop={7}>
        <Typography variant="h1" marginBottom={2.5}>{petDetails.name}</Typography>
        <Box sx={{ ml: 2 }}>
          {[['Gender', petDetails.gender], ['Breed', petDetails.breed], ['Age', petDetails.age], ['Weight', petDetails.weight]].map(([label, value], i) => (
            <Box key={i} display="flex" alignItems="center" mb={1.5}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 'bold', mr: 2 }}
              >
                {label}
              </Typography>
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
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
    </ThemeProvider>
  );
};

export default ProfileDetails;
