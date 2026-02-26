import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { LoginPage, AuthApi } from './LoginPage/LoginPage';

const mockAuthApi: AuthApi = {
  async login(values) {
    await new Promise((r) => setTimeout(r, 500));
    if (values.email === 'fail@test.com') throw new Error('Invalid credentials');
  },
  async register(values) {
    await new Promise((r) => setTimeout(r, 500));
    if (values.email === 'fail@test.com') throw new Error('Email already taken');
  },
};

createRoot(document.getElementById('root')!).render(
  <>
    <CssBaseline />
    <LoginPage authApi={mockAuthApi} />
  </>,
);
