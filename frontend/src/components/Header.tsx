import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { AccountCircle, ExitToApp, Login as LoginIcon, HowToReg as RegisterIcon } from '@mui/icons-material';
import { handleLogout } from '../services/authService';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id');

  const logout = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          Mon Application
        </Typography>
        <Box flexGrow={1} />
        {token ? (
          <>
            <Button
              color="inherit"
              startIcon={<AccountCircle />}
              onClick={() => navigate(`/profile/${userId}`)}
            >
              UserProfile
            </Button>
            <Button
              color="inherit"
              startIcon={<ExitToApp />}
              onClick={logout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              startIcon={<LoginIcon />}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              color="inherit"
              startIcon={<RegisterIcon />}
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
