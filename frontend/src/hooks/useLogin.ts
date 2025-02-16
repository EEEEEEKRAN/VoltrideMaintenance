import { useState } from 'react';
import { loginUser } from '../services/authService';
import { AxiosError } from 'axios';

export const useLogin = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await loginUser(email, password);
      if (user) {
        localStorage.setItem('token', user.accessToken);
        return true; 
      } else {
        setError('Email ou mot de passe incorrect');
        return false;
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(`Erreur lors de la connexion: ${err.response?.data?.message || err.message}`);
      } else {
        setError('Une erreur inattendue s\'est produite');
      }
      return false; 
    } finally {
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};