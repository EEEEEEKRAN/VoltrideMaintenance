import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../services/userService';
import { UserData } from '../models/UserData';
import { UpdateUserData } from '../models/UpdateUserData';
import { TextField, Button, Box, Grid, Typography, Container, Paper, TableContainer, Table, TableBody, TableCell, TableRow, TableHead } from '@mui/material';
import { Person, Email, Phone, Badge } from '@mui/icons-material';
import { getUserIdFromLocalStorage } from '../services/authService'; // Importez la fonction

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate(); 
  const { id } = useParams<{ id: string }>();

  const loggedInId = getUserIdFromLocalStorage();

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
        await updateUserProfile(loggedInId!, formData); // Utilisez loggedInId comme number
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // Colonne sur mobile, ligne sur desktop
        height: '100vh',
        px: 4,
        py: 8,
        gap: 4,
      }}
    >
      {/* Colonne gauche - Édition du Profil */}
      <Box sx={{ width: { xs: '100%', md: '50%' } }}>
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
      </Box>
    
      <Box sx={{ width: { xs: '100%', md: '50%' } }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom textAlign="center">
            Commandes effectuées
          </Typography>
          <Paper
            elevation={8}
            sx={{
              padding: 4,
              borderRadius: 4,
              background: 'white',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Montant</TableCell>
                    <TableCell>Statut</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Données factices */}
                  {[
                    { id: 1, date: '2024-02-15', montant: '25.00€', statut: 'Terminée' },
                    { id: 2, date: '2024-02-18', montant: '40.00€', statut: 'En cours' },
                    { id: 3, date: '2024-02-20', montant: '15.00€', statut: 'Annulée' },
                  ].map((commande) => (
                    <TableRow key={commande.id}>
                      <TableCell>{commande.id}</TableCell>
                      <TableCell>{commande.date}</TableCell>
                      <TableCell>{commande.montant}</TableCell>
                      <TableCell>{commande.statut}</TableCell>
                      <TableCell>
                  <Button
                    variant="contained"
                    color="error" // Rouge pour signaler l'urgence
                    size="small"
                    onClick={() => alert(`Accident signalé pour la commande 1`)}
                  >
                    Reporter un accident
                  </Button>
                </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
    </Box>
    
  );
};

export default UserProfilePage;
