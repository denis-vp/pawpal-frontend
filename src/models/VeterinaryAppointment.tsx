import { AppointmentStatus } from "./AppointmentStatus";
import { Pet } from "./Pet";
import { User } from "./User";

export interface VeterinaryAppointment{
    id: number;
    user: User;
    pet: Pet;
    date: Date;
    status: AppointmentStatus;
    duration: number;
    cost: number;
}