import React from 'react';
import { UserStore } from '../../Store/UserStore';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { Contact } from './Contact/Contact';
import { SearchContact } from './SearchContact/SearchContact';
import { observer } from 'mobx-react-lite';

export const UserPage = observer(() => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '90vw',
        margin: '0 auto',
      }}
    >
      <Box>
        <Card sx={{ minWidth: 275, maxWidth: '30vw', marginTop: '30px' }}>
          <CardContent>
            <Typography variant='h2'>{UserStore.profile.userName}</Typography>
            <Typography variant='h2'>{UserStore.profile.number}</Typography>
          </CardContent>
        </Card>
        {UserStore.profile.contacts.map((contact) => {
          return (
            <Contact
              key={contact.number}
              name={contact.userName}
              number={contact.number}
              variant='alreadyAdded'
            />
          );
        })}
      </Box>
      <Box sx={{ marginTop: '30px' }}>
        <SearchContact />
      </Box>
    </Box>
  );
});
