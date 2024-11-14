import axios, { AxiosInstance, AxiosResponse } from "axios";
import { create } from "zustand/react";

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
    gender: string;
    age: string;
    breed: string;
    weight: string;
    image: string;
  }) => Promise<AxiosResponse>
  updatePet: (id: number, petData: {
    name: string;
    gender: string;
    age: string;
    breed: string;
    weight: string;
    image: string;
  }) => Promise<AxiosResponse>;
};

export const useApiStore = create<ApiStore>((set, get) => {
  const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
  });

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
      return await axiosInstance.post("/auth/login", {
        email,
        password,
      });
    },
    addPet: async (petData) => {
      try {
        return await axiosInstance.post("/add", petData);
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },

    updatePet: async (id, petData) => {
      try {
        return await axiosInstance.post(`/${id}`, petData);
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    }
  };
});
