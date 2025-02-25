import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          { text: 'Accueil', icon: <HomeIcon />, path: '/' },
          { text: 'Tableau de Bord', icon: <DashboardIcon />, path: '/dashboard' },
          { text: 'Paramètres', icon: <SettingsIcon />, path: '/dashboard/settings' },
        ].map(({ text, icon, path }) => (
          <ListItem button key={text} component={Link} to={path}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      {/* Sidebar mobile */}
      <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle}
        sx={{ display: { xs: 'block', sm: 'none' }, width: drawerWidth }}>
        {drawer}
      </Drawer>

      {/* Sidebar Desktop */}
      <Drawer
  variant="permanent"
  sx={{
    display: { xs: 'none', sm: 'block' },
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      height: '100vh', // Assure que la sidebar prend toute la hauteur
      position: 'fixed', // Fixe la sidebar à gauche
    },
  }}
>
  {drawer}
</Drawer>

    </>
  );
};

export default Sidebar;
