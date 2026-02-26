import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { UserEditDialog, User } from './UserEditDialog/UserEditDialog';

const sampleUser: User = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  role: 'editor',
  notifications: 'email',
  active: true,
};

function App() {
  const [open, setOpen] = useState(false);

  const handleSave = async (user: User) => {
    console.log('Saved user:', user);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Edit User
      </Button>
      <UserEditDialog open={open} user={sampleUser} onSave={handleSave} onClose={() => setOpen(false)} />
    </Box>
  );
}

createRoot(document.getElementById('root')!).render(
  <>
    <CssBaseline />
    <App />
  </>,
);
