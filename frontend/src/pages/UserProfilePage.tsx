import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../services/userService';
import { UserData } from '../models/UserData';
import { UpdateUserData } from '../models/UpdateUserData';
import { TextField, Button, Box, Grid, Typography, Container, Paper } from '@mui/material';
import { Person, Email, Phone, Badge } from '@mui/icons-material';

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Fonction de vérification d'accès
  const hasAccessToProfile = (requestedId: string | undefined, loggedInId: number | null): boolean => {
    if (!requestedId || !loggedInId) {
      return false;
    }
    return parseInt(requestedId, 10) === loggedInId;
  };

  // Vérifiez que `id` est défini et valide
  useEffect(() => {
    if (!id) {
      console.error("ID is missing from URL parameters.");
      navigate('/login');
    }
  }, [id, navigate]);

  // Récupérez l'ID de l'utilisateur connecté
  const loggedInIdString = localStorage.getItem('id');
  const loggedInId = loggedInIdString ? parseInt(loggedInIdString, 10) : null;

  console.log("Logged in user ID from localStorage:", loggedInId); // Log pour vérifier l'ID de l'utilisateur connecté
  console.log("Requested profile ID:", id); // Log pour vérifier l'ID demandé

  // Vérifiez l'accès au profil
  useEffect(() => {
    if (!hasAccessToProfile(id, loggedInId)) {
      console.error("Unauthorized access attempt.");
      navigate('/login');
    }
  }, [id, loggedInId, navigate]);

  const [user, setUser] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateUserData | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile(loggedInId!);
        console.log("User data fetched:", userData); // Log pour vérifier les données récupérées
        setUser(userData);
        setFormData(userData);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
        if (error instanceof Error && error.message === 'Unauthorized access') {
          navigate('/login');
        }
      }
    };

    if (loggedInId) {
      fetchUserProfile();
    }
  }, [loggedInId, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData!,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    if (formData) {
      try {
        await updateUserProfile(loggedInId!, formData);
        setIsEditing(false);
      } catch (error) {
        console.error('Erreur lors de la mise à jour du profil utilisateur:', error);
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm">
      <Box my={4} display="flex" justifyContent="center">
        <Paper
          elevation={8}
          sx={{
            padding: 4,
            borderRadius: 4,
            background: 'white',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: 600,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom textAlign="center">
            Profile
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nom"
                name="nom"
                value={formData?.nom || ''}
                onChange={handleChange}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: <Person />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData?.email || ''}
                onChange={handleChange}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: <Email />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Téléphone"
                name="telephone"
                value={formData?.telephone || ''}
                onChange={handleChange}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: <Phone />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Numéro de Permis"
                name="numero_permis"
                value={formData?.numero_permis || ''}
                onChange={handleChange}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: <Badge />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {isEditing ? (
                <Button variant="contained" color="primary" fullWidth onClick={handleUpdate}>
                  Sauvegarder
                </Button>
              ) : (
                <Button variant="contained" color="secondary" fullWidth onClick={() => setIsEditing(true)}>
                  Éditer
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default UserProfilePage;
