import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import { CustomButton } from '../../../Common/CustomButton';
import Box from '@mui/material/Box';
import { UserStore } from '../../../Store/UserStore';

interface IContact {
  name: string;
  number: string;
  variant: 'searched' | 'alreadyAdded';
}

export const Contact: React.FC<IContact> = ({ name, number, variant }) => {
  function deleteContact(number: string) {
    UserStore.deleteContact(number);
  }

  return (
    <Card sx={{ minWidth: 275, maxWidth: '30vw', marginTop: '30px' }}>
      <CardContent>
        <Typography variant='h2'>{name}</Typography>
        <Typography variant='h2'>{number}</Typography>
      </CardContent>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
      >
        {variant === 'alreadyAdded' ? (
          <CustomButton
            type='button'
            onClick={() => {
              deleteContact(number);
            }}
            variant='contained'
          >
            Удалить
          </CustomButton>
        ) : (
          <CustomButton
            type='button'
            onClick={() => {
              UserStore.addContact(number, name);
            }}
            variant='contained'
          >
            Добавить
          </CustomButton>
        )}
      </Box>
    </Card>
  );
};
