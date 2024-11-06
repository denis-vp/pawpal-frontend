import React from 'react';
import { Box, Button, Grid, ThemeProvider, Typography } from '@mui/material';
import PetCard from './PetCard';
import { Pet } from '../../models/Pet';
import theme from '../../theme';

interface PetsListProps {
    pets: Pet[];
}

const PetsList: React.FC<PetsListProps> = ({ pets }) => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ padding: 4, marginTop: '100px', textAlign: 'center', width: '100%' }}>
                <Typography variant='h1' sx={{ textAlign: 'center' }}>Your pets</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button
                        variant="contained"
                        disableElevation
                        sx={{
                            mr: 20,
                            mb: 2,
                            mt: 2,
                            fontSize: '1.15rem',
                        }}
                    >
                        Add Pet Profile
                    </Button>
                </Box>

                <Grid container spacing={4} >
                    {pets.map((pet) => (
                        <Grid item xs={12} key={pet.id}>
                            <PetCard pet={pet} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default PetsList;
