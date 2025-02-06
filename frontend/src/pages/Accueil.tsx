import { Box, Typography, Paper } from '@mui/material';
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Accueil = () => {
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
          animation: `${fadeIn} 1s ease-out`,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: '#1B5E20',
            fontWeight: 'bold',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          Salut JackSam et Arthur :3
        </Typography>
      </Paper>
    </Box>
  );
}; 