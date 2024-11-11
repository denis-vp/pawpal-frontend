import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Box, ThemeProvider } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { Pet } from '../../models/Pet';
import theme from '../../theme';

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/${pet.id}`);
  };

  return (
    <ThemeProvider theme={theme}>
    <Card
      onClick={handleCardClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 2,
        cursor: 'pointer',
        transition: 'transform 0.3s',
        '&:hover': { transform: 'scale(1.05)' },
        backgroundColor: 'secondary.light',
        ml: 5,
        mr: 5,
        height: 110,
        borderRadius: '50px'
      }}
    >
      <Box display="flex" alignItems="center">
        <CardMedia
          component="img"
          image={pet.image}
          alt={pet.name}
          sx={{ width: 90, height: 90, borderRadius: '80%', ml: 3, mr: 2}}
        />
        <CardContent>
        <Box display={'flex'} alignItems="center" >
          <Typography variant="body1" fontWeight="bold" mt={1}>
            {pet.name}
          </Typography>
            <Box display={'flex'} alignItems="center" color={'text.secondary'} ml={4} mt={5}>
               <Typography variant="body2">
               {pet.gender}, {pet.breed}, {pet.age}, {pet.weight}
                </Typography>
            </Box>
          </Box>
        </CardContent>
      </Box>
      <Box display={'flex'} alignItems="center" color={'text.secondary'}>
      <Typography variant="body2" fontWeight="bold" mr={2}>
            View Profile
          </Typography>
      <IconButton>
        <ArrowForwardIcon fontSize="large"/>
      </IconButton>
      </Box>
    </Card>
    </ThemeProvider>
  );
};

export default PetCard;
