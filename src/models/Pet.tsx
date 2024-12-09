import { AnimalType } from "./AnimalType";

export interface Pet {
    id: number;
    name: string;
    image: string;
    isMale: boolean;
    dateOfBirth: Date;
    breed: string;
    weight: number;
    type: AnimalType;
  }
  