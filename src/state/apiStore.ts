import axios, { AxiosInstance, AxiosResponse } from "axios";
import { create } from "zustand/react";
import { AppointmentStatus } from "../models/AppointmentStatus";

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

type ApiStore = {
  axiosInstance: AxiosInstance;

  register: (
    fistName: string,
    lastName: string,
    email: string
  ) => Promise<AxiosResponse>;
  login: (email: string, password: string) => Promise<AxiosResponse>;
  addPet: (petData: {
    name: string;
    isMale: boolean;
    dateOfBirth: Date;
    breed: string;
    weight: number;
    image: string | null;
    type: string;
  }) => Promise<AxiosResponse>;
  updatePet: (
    id: number,
    petData: {
      name: string;
      isMale: boolean;
      dateOfBirth: Date;
      breed: string;
      weight: number;
      image: string | null;
      type: string;
    }
  ) => Promise<AxiosResponse>;
  getAllPetsByUserId: () => Promise<AxiosResponse>;
  getPetById: (petId: number) => Promise<AxiosResponse>;
  addVeterinaryAppointment: (appointment: {
    userId: number;
    petId: number;
    status: AppointmentStatus;
    localDateTime: string;
    duration: number;
    cost: number;
  }) => Promise<AxiosResponse>;
  getAllAppointments: () => Promise<AxiosResponse>;
  getAppointmentById: (appointmentId: number) => Promise<AxiosResponse>;
};

export const useApiStore = create<ApiStore>((set, get) => {
  // create the axios instance
  const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
  });

  // configure axios to add jwt token to the Authorization header
  axiosInstance.interceptors.request.use(
    (config) => {
      // get jwt token from local storage
      const jwtToken = localStorage.getItem("jwtToken");
      // if jwt token is present, add it to the Authorization header
      if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
      } else {
        // if jwt token is not present, remove the Authorization header
        delete config.headers.Authorization;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return {
    axiosInstance,
    register: async (firstName: string, lastName: string, email: string) => {
      return await axiosInstance.post("/auth/register", {
        firstName,
        lastName,
        email,
      });
    },
    login: async (email: string, password: string) => {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userFirstName");
      localStorage.removeItem("userLastName");

      return await axiosInstance.post("/auth/login", {
        email,
        password,
      });
    },
    addPet: async (petData) => {
      try {
        return await axiosInstance.post("/pets/add", petData);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    updatePet: async (id, petData) => {
      try {
        return await axiosInstance.put(`/pets/${id}`, petData);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    getAllPetsByUserId: async () => {
      try {
        const response = await axiosInstance.get("/pets/all");
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    getPetById: async (petId: number) => {
      try {
        const response = await axiosInstance.get(`/pets/${petId}`);
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    addVeterinaryAppointment: async (appointment) => {
      try {
        const response = await axiosInstance.post(
          `/api/veterinary-appointments/add`,
          appointment
        );
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    
      getAllAppointments: async () => {
        try {
          const response = await axios.get(`/api/veterinary-appointments/all`);
          return response;
        } catch (error) {
          return Promise.reject(error);
        }
      },
      getAppointmentById: async (appointmentId: number) => {
        try {
          const response = await axiosInstance.get(`/api/veterinary-appointments/${appointmentId}`);
          return response;
        } catch (error) {
          return Promise.reject(error);
        }
      },
  };
});
