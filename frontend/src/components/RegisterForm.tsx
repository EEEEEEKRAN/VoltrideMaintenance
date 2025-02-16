import React, { useState } from 'react';
import { useRegister } from '../hooks/useRegister';
import { UserData } from '../models/UserData';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<UserData>({
    nom: '',
    email: '',
    telephone: '',
    numero_permis: '',
    password: '',
  });

  const { register, error, isLoading } = useRegister();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/success');
    } catch (err) {
      console.error("Erreur lors de l'enregistrement:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={2}>
        <TextField fullWidth label="Nom" name="nom" value={formData.nom} onChange={handleChange} required />
      </Box>
      <Box mb={2}>
        <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} required />
      </Box>
      <Box mb={2}>
        <TextField fullWidth label="Téléphone" name="telephone" value={formData.telephone} onChange={handleChange} required />
      </Box>
      <Box mb={2}>
        <TextField fullWidth label="Numéro de Permis" name="numero_permis" value={formData.numero_permis} onChange={handleChange} required />
      </Box>
      <Box mb={2}>
        <TextField fullWidth label="Mot de Passe" type="password" name="password" value={formData.password} onChange={handleChange} required />
      </Box>
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
        {isLoading ? 'Enregistrement...' : 'Enregistrer'}
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default RegisterForm;
