import React, {useState, useEffect} from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, ThemeProvider} from '@mui/material';
import theme from '../../theme'

interface EditPetDialogProps {
  open: boolean;
  onClose: () => void;
  pet: Pet | null;
  onUpdatePet: (updatePet: Pet) => void;
}

export interface Pet {
  id: number;
  name: string;
  image: string;
  gender: string;
  age: string;
  breed: string;
  weight: string;
}

const EditPetDialog: React.FC<EditPetDialogProps>=({open, onClose, pet, onUpdatePet}) => {
  const [name, setName] = useState('')
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (pet) {
      setName(pet.name);
      setImage(pet.image);
      setGender(pet.gender);
      setAge(pet.age);
      setBreed(pet.breed);
      setWeight(pet.weight);
    }
  }, [pet]);

  const handleUpdateClick = () => {
    if (pet) {
      onUpdatePet({
        id: pet.id,
        name,
        image,
        gender,
        age,
        breed,
        weight,
      });
      onClose();
    }
  };

  if (!pet) return null;

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle><Typography variant="body1">Edit Pet</Typography></DialogTitle>
        <DialogContent>
          <TextField 
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={ (e) => setName(e.target.value)}
            InputLabelProps={{shrink: true, sx: {typography: 'body2' } }}
            InputProps={{ sx: { typography: 'body2' } }}
          />

          <TextField 
            margin="dense"
            label="Image URL"
            type="text"
            fullWidth
            value={image}
            onChange={ (e) => setImage(e.target.value)}
            InputLabelProps={{shrink: true, sx: {typography: 'body2' } }}
            InputProps={{ sx: { typography: 'body2' } }}
          />

          <TextField 
            margin="dense"
            label="Gender"
            type="text"
            fullWidth
            value={gender}
            onChange={ (e) => setGender(e.target.value)}
            InputLabelProps={{shrink: true, sx: {typography: 'body2' } }}
            InputProps={{ sx: { typography: 'body2' } }}
          />

          <TextField 
            margin="dense"
            label="Age"
            type="text"
            fullWidth
            value={age}
            onChange={ (e) => setAge(e.target.value)}
            InputLabelProps={{shrink: true, sx: {typography: 'body2' } }}
            InputProps={{ sx: { typography: 'body2' } }}
          />

          <TextField 
            margin="dense"
            label="Breed"
            type="text"
            fullWidth
            value={breed}
            onChange={ (e) => setBreed(e.target.value)}
            InputLabelProps={{shrink: true, sx: {typography: 'body2' } }}
            InputProps={{ sx: { typography: 'body2' } }}
          />

          <TextField 
            margin="dense"
            label="Weight"
            type="text"
            fullWidth
            value={weight}
            onChange={ (e) => setWeight(e.target.value)}
            InputLabelProps={{shrink: true, sx: {typography: 'body2' } }}
            InputProps={{ sx: { typography: 'body2' } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} sx={{ typography: 'body2'}}>Cancel</Button>
          <Button onClick={handleUpdateClick} color="primary" sx={{ typography: 'body2' }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default EditPetDialog;