import { Pet } from "./Pet";
import { Role } from "./Role";

export interface User{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordAttempts: number;
    isNew: boolean;
    roles: Role[];
    pets: Pet[]
}