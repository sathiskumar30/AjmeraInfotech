import React from 'react';
import { Snackbar, SnackbarContent } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface SnackBarProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles({
  snackbar: {
    backgroundColor: '#4caf50', 
    color: 'white',
    borderRadius: '5px',
    fontSize: '16px',
    padding: '8px 16px',
  },
});

const SnackBar: React.FC<SnackBarProps> = ({ message, open, onClose }) => {
  const classes = useStyles();

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000} 
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} 
    >
      <SnackbarContent
        className={classes.snackbar}
        message={message}
      />
    </Snackbar>
  );
};

export default SnackBar;
