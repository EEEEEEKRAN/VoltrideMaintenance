import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';



const DashboardWidgets = () => {
    return (
    <Grid container spacing={3}>
      {/* Scooters */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <DirectionsBikeIcon sx={{ fontSize: 40, color: 'blue', mr: 2 }} />
          <CardContent>
            <Typography variant="h5">101</Typography>
            <Typography variant="subtitle1">Scooters enregistrés</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Clients */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <PeopleIcon sx={{ fontSize: 40, color: 'green', mr: 2 }} />
          <CardContent>
            <Typography variant="h5">50</Typography>
            <Typography variant="subtitle1">Clients inscrits</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Maintenances */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <BuildIcon sx={{ fontSize: 40, color: 'red', mr: 2 }} />
          <CardContent>
            <Typography variant="h5">456</Typography>
            <Typography variant="subtitle1">Maintenances réalisées</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardWidgets;
