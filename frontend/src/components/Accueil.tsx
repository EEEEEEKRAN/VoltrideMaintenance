import React from 'react';
import { Box, Typography, Paper, Button, TextField } from '@mui/material';
import { keyframes } from '@mui/system';
import { Link } from 'react-router-dom';


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

const Accueil: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(../../images/home.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Paper
          elevation={8}
          sx={{
            padding: 4,
            borderRadius: 4,
            animation: `${fadeIn} 1s ease-out`,
            background: 'rgba(255, 255, 255, 0.7)',
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
            Bienvenue sur notre application !
          </Typography>
        </Paper>
      </Box>

      <Box
        sx={{
          py: 10,
          px: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 4, 
        }}
      >
        <Box sx={{ width: { xs: '100%', md: '50%' }, textAlign: 'justify' }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1B5E20', textAlign: 'center' }}>
            À propos de nous
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, p: 8 }}>
          VoltRide révolutionne la mobilité urbaine en offrant une solution de location de scooters 100% en ligne. Grâce à notre plateforme intuitive, louez un scooter en quelques clics, trouvez un véhicule disponible près de chez vous et profitez d’un transport rapide, économique et écologique. Plus besoin de paperasse ni d’attente, tout se fait via l’application pour une expérience fluide et sécurisée. 🚀🛵
          </Typography>
          <Link to="/reservation" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">
              Prêt à rouler ?
            </Button>
          </Link>
        </Box>
        
        <Box
          component="img"
          src="../../images/scoot.jpeg"
          alt="À propos de nous"
          sx={{
            width: { xs: '100%', md: '40%' }, 
            borderRadius: 2,
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          }}
        />
      </Box>

      <Box
        sx={{
          py: 10,
          px: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(to right, #4CAF50, #81C784)',
          color: 'white',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
        }}>

        <Box
          component="img"
          src="../../images/scoot.jpeg"
          alt="Nos services"
          sx={{
            width: { xs: '100%', md: '40%' },
            borderRadius: 2,
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          }}/>

        <Box sx={{ width: { xs: '100%', md: '50%' }, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            Un problème ? Une solution !
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            N'hésitez pas à reporter votre problème via votre profile.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          py: 10,
          px: 4,
          textAlign: 'center',
          backgroundColor: '#263238',
          color: 'white',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Contactez-nous</Typography>
        <Typography variant="body1" sx={{ maxWidth: '800px', mx: 'auto', mt: 2 }}>
          Nous serions ravis d'échanger avec vous ! N'hésitez pas à nous contacter pour toute question.
        </Typography>
      </Box>
    </Box>
  );
};

export default Accueil;
