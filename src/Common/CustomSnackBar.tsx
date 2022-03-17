import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

interface ICustomSnackBar {
  messageText: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CustomSnackBar: React.FC<ICustomSnackBar> = ({
  messageText,
  isOpen,
  setIsOpen,
}) => {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color='secondary' size='small' onClick={handleClose}>
        Закрыть
      </Button>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      ></IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message={messageText}
        action={action}
      />
    </div>
  );
};
