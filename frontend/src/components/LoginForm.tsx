// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={2}>
        <TextField fullWidth label="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Box>
      <Box mb={2}>
        <TextField fullWidth label="Mot de Passe" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Box>
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
        {isLoading ? 'Connexion...' : 'Se connecter'}
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default LoginForm;