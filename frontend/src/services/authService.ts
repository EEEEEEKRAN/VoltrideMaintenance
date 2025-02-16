import axios, { AxiosError } from 'axios';
import { UserData } from '../models/UserData';

const API_URL = 'http://localhost:3000/auth';

export const registerUser = async (userData: UserData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(`Erreur lors de l'enregistrement de l'utilisateur: ${error.message}`);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(`Erreur lors de la connexion de l'utilisateur: ${error.message}`);
  }
};
