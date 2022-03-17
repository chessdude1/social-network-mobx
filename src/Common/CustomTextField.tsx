import React from 'react';

import TextField from '@mui/material/TextField';

interface ICustomTextFieldType {
  name: string;
  id?: string;
  label: string;
  type: string;
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onBlur?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  value: string;
  helperText?: string;
  error?: boolean;
}

export function CustomTextField({
  name,
  id,
  label,
  type,
  onChange,
  onBlur,
  value,
  helperText,
  error,
}: ICustomTextFieldType) {
  return (
    <TextField
      InputProps={{ style: { fontSize: '1.6rem' } }}
      InputLabelProps={{ style: { fontSize: '1.6rem' } }}
      name={name}
      id={id}
      label={label}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      helperText={helperText}
      error={error}
      variant='outlined'
    />
  );
}
