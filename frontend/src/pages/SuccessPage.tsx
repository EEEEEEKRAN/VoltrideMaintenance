import React from 'react';
import { Box, Typography } from '@mui/material';

const SuccessPage: React.FC = () => {
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
      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: '#1B5E20',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Enregistrement réussi !
      </Typography>
    </Box>
  );
};

export default SuccessPage;