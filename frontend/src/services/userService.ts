import axios from 'axios';
import { UserData } from '../models/UserData';
import { UpdateUserData } from '../models/UpdateUserData';

const API_URL = 'http://localhost:3000/users';

export const getUserProfile = async (id: number): Promise<UserData> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur:', error);
    throw error;
  }
};

export const updateUserProfile = async (id: number, updateUserData: UpdateUserData): Promise<UserData> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updateUserData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil utilisateur:', error);
    throw error;
  }
};