import Header from "./components/Header";
import PetProfile from "./components/pet-profile/PetProfile";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import petPicture from '../src/assets/pet-picture.jpg'
import PetsList from "./components/pet-list/PetsList";
const petsData = [
  { id: 1, name: 'Buddy', image: petPicture, gender: 'Male', age: '2 years', breed: 'Golden Retriever', weight: '25 kg' },
  { id: 2, name: 'Bella', image: petPicture, gender: 'Female', age: '3 years', breed: 'Labrador', weight: '22 kg' },
  { id: 3, name: 'Bella', image: petPicture, gender: 'Female', age: '3 years', breed: 'Labrador', weight: '22 kg' },
  { id: 4, name: 'Bella', image: petPicture, gender: 'Female', age: '3 years', breed: 'Labrador', weight: '22 kg' },
];

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PetsList pets={petsData} />} />
        <Route path="/:id" element={<PetProfile petsData={petsData} />} />
        <Route path="/pets" element={<PetsList pets={petsData} />} />
      </Routes>
    </Router>
  );
}

export default App;
