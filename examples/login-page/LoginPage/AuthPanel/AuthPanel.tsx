import { SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { LoginForm, LoginFormValues } from '../LoginForm/LoginForm';
import { RegistrationForm, RegistrationFormValues } from '../RegistrationForm/RegistrationForm';


interface AuthPanelProps {
  onLogin: (values: LoginFormValues) => void;
  onRegister: (values: RegistrationFormValues) => void;
}

export function AuthPanel({ onLogin, onRegister }: AuthPanelProps) {
  const [tab, setTab] = useState(0);

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box data-testid="AuthPanel">
      <Tabs value={tab} onChange={handleTabChange}>
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>
      <Box sx={{ pt: 2 }}>
        {tab === 0 && <LoginForm onSubmit={onLogin} />}
        {tab === 1 && <RegistrationForm onSubmit={onRegister} />}
      </Box>
    </Box>
  );
}
