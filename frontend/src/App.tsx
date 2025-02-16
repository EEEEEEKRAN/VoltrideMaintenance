import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from './assets/styles/theme';
import { Accueil } from './pages/Accueil';
import RegisterPage from './pages/RegisterPage';
import SuccessPage from './pages/SuccessPage';
import LoginPage from './pages/LoginPage';

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
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/success" element={<SuccessPage />} /> 
            <Route path="/login" element={<LoginPage />} /> 
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
