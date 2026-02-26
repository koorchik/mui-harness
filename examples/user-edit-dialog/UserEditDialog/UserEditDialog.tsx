import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { UserEditForm, User } from './UserEditForm/UserEditForm';

export type { User } from './UserEditForm/UserEditForm';

interface UserEditDialogProps {
  open: boolean;
  user: User;
  onSave: (user: User) => Promise<void>;
  onClose: () => void;
}

export function UserEditDialog({ open, user: initialUser, onSave, onClose }: UserEditDialogProps) {
  const [user, setUser] = useState(initialUser);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    await onSave(user);
    setSuccess(true);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <UserEditForm user={user} onChange={setUser} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">User saved successfully</Alert>
      </Snackbar>
    </>
  );
}
