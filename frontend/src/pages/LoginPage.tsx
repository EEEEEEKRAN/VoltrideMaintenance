import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../services/authService';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await handleLogin(credentials.email, credentials.password, navigate);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: 4,
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: '#1B5E20',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 3,
          }}
        >
          Connexion
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            type="email"
            label="Email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Mot de passe"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Se connecter
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
