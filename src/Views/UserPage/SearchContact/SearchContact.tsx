import React, { useState } from 'react';
import { CustomTextField } from '../../../Common/CustomTextField';
import { localHostService } from '../../../Service/Serviсe';
import Box from '@mui/material/Box';
import { Contact } from '../Contact/Contact';
import { IProfile } from '../../../Service/ServiceTypes';

export const SearchContact = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [profiles, setProfiles] = useState<Array<IProfile>>([
    {
      userName: '',
      password: 'test',
      number: '1',
      contacts: [],
    },
  ]);

  async function searchContact(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setSearchQuery(e.target.value);
    const profiles = await localHostService.searchProfile(e.target.value);
    setProfiles(profiles);
  }

  return (
    <Box>
      <CustomTextField
        name={'searchContact'}
        label={'Найти контакт'}
        type={'outlined'}
        value={searchQuery}
        onChange={(e) => {
          searchContact(e);
        }}
      />
      {profiles.map((profile) => {
        if (profile.userName === '' || searchQuery === '') {
          return '';
        } else {
          return (
            <Contact
              variant='searched'
              key={profile.number}
              name={profile.userName}
              number={profile.number}
            />
          );
        }
      })}
    </Box>
  );
};
