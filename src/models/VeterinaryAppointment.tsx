import { AppointmentStatus } from "./AppointmentStatus";
import { User } from "./User";

export interface VeterinaryAppointment{
    id: number;
    user: User;
    petId: number;
    localDateTime: Date;
    status: AppointmentStatus;
    duration: number;
    cost: number;
}