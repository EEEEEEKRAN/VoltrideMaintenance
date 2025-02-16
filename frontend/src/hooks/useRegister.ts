import { useState } from 'react';
import { registerUser } from '../services/authService';
import { UserData } from '../models/UserData';
import { AxiosError } from 'axios';

export const useRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const register = async (userData: UserData) => {
    setIsLoading(true);
    setError(null);
    try {
      await registerUser(userData);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { register, error, isLoading };
};
