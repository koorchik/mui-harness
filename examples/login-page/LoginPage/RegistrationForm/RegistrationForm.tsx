import { FormEvent, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export interface RegistrationFormValues {
  name: string;
  email: string;
  password: string;
}

interface RegistrationFormProps {
  onSubmit: (values: RegistrationFormValues) => void;
}

export function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordMismatch = confirmPassword.length > 0 && password !== confirmPassword;
  const isValid =
    name.length > 0 &&
    email.length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    !passwordMismatch;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, password });
  };

  return (
    <Box component="form" data-testid="RegistrationForm" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        margin="normal"
        label="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={passwordMismatch}
        helperText={passwordMismatch ? 'Passwords do not match' : ''}
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={!isValid}
      >
        Register
      </Button>
    </Box>
  );
}
