import React from 'react';
import LoginForm from '../components/LoginForm';
import { Box, Typography, Paper } from '@mui/material';

const LoginPage: React.FC = () => {
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
        <LoginForm />
      </Paper>
    </Box>
  );
};

export default LoginPage;
