import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from './assets/styles/theme';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import SuccessPage from './pages/SuccessPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import Header from './components/Header'; 
import Dashboard from './pages/Dashboard';
import DashboardHome from './pages/DashboardHome';
import SettingsPage from './pages/Settings';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          {/* <Header />  */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile/:id" element={<UserProfilePage />} />

            {/* Routes du Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="settings" element={<SettingsPage />} />

          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
