import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AuthPanel } from './AuthPanel/AuthPanel';
import { LoginFormValues } from './LoginForm/LoginForm';
import { RegistrationFormValues } from './RegistrationForm/RegistrationForm';

export interface AuthApi {
  login(values: LoginFormValues): Promise<void>;
  register(values: RegistrationFormValues): Promise<void>;
}

interface LoginPageProps {
  authApi: AuthApi;
}

export function LoginPage({ authApi }: LoginPageProps) {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: LoginFormValues) => {
    try {
      await authApi.login(values);
      setSuccess('Login successful');
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setSuccess(null);
    }
  };

  const handleRegister = async (values: RegistrationFormValues) => {
    try {
      await authApi.register(values);
      setSuccess('Registration successful');
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      setSuccess(null);
    }
  };

  return (
    <Box
      data-testid="LoginPage"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
    >
      <Paper sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Welcome
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <AuthPanel onLogin={handleLogin} onRegister={handleRegister} />
      </Paper>
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
      >
        <Alert severity="success">{success}</Alert>
      </Snackbar>
    </Box>
  );
}
