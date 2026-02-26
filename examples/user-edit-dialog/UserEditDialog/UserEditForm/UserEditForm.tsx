import { ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';

export interface User {
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  notifications: 'email' | 'sms' | 'none';
  active: boolean;
}

interface UserEditFormProps {
  user: User;
  onChange: (user: User) => void;
}

export function UserEditForm({ user, onChange }: UserEditFormProps) {
  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...user, [e.target.name]: e.target.value });
  };

  const handleRole = (e: SelectChangeEvent) => {
    onChange({ ...user, role: e.target.value as User['role'] });
  };

  const handleNotifications = (_: ChangeEvent<HTMLInputElement>, value: string) => {
    onChange({ ...user, notifications: value as User['notifications'] });
  };

  const handleActive = (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    onChange({ ...user, active: checked });
  };

  return (
    <Box data-testid="UserEditForm">
      <TextField
        fullWidth
        margin="normal"
        label="Name"
        name="name"
        value={user.name}
        onChange={handleText}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        type="email"
        value={user.email}
        onChange={handleText}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
        <Select name="role" label="Role" value={user.role} onChange={handleRole}>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="editor">Editor</MenuItem>
          <MenuItem value="viewer">Viewer</MenuItem>
        </Select>
      </FormControl>
      <FormControl margin="normal">
        <FormLabel>Notifications</FormLabel>
        <RadioGroup value={user.notifications} onChange={handleNotifications}>
          <FormControlLabel value="email" control={<Radio />} label="Email" />
          <FormControlLabel value="sms" control={<Radio />} label="SMS" />
          <FormControlLabel value="none" control={<Radio />} label="None" />
        </RadioGroup>
      </FormControl>
      <FormControlLabel
        control={<Switch checked={user.active} onChange={handleActive} />}
        label="Active"
      />
    </Box>
  );
}
