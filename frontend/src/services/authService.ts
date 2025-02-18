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

export const handleLogin = async (email: string, password: string, navigate: (path: string) => void) => {
  try {
    const response = await loginUser(email, password);

    if (response.id) {
      const userId = response.id;
      localStorage.setItem('id', userId.toString());
      localStorage.setItem('token', response.accessToken);
      console.log("User ID stored in localStorage:", userId);
      navigate('/');
    } else {
      throw new Error("Invalid response format: missing or invalid user ID.");
    }
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
  }
};

export const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  console.log("User logged out and tokens removed from localStorage.");
};
