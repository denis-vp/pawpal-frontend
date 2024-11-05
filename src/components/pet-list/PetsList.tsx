import React from 'react';
import { Box, Grid, ThemeProvider} from '@mui/material';
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
                <Grid container spacing={4}>
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
