import React from 'react';
import Button from '@mui/material/Button';

interface ICustomButton {
  type: 'button' | 'reset' | 'submit' | undefined;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: 'outlined' | 'contained' | 'text';
  onClick?: () => void;
}

export const CustomButton: React.FC<ICustomButton> = ({
  type,
  disabled,
  children,
  variant,
  onClick,
}) => {
  return (
    <Button
      sx={{ textTransform: 'none', fontSize: '1.5rem' }}
      onClick={onClick}
      type={type}
      variant={variant}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
