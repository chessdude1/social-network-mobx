import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { UserStore } from '../Store/UserStore';
import { observer } from 'mobx-react-lite';

const pagesAuthorized = [{ link: 'User', name: 'Аккаунт' }];

const pagesNotAuthorized = [
  { link: 'Authorization', name: 'Авторизация' },
  { link: 'Registration', name: 'Регистрация' },
];

export const Header = observer(() => {
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            {UserStore.isAutorized
              ? pagesAuthorized.map((page) => (
                  <Button
                    key={page.link}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <NavLink className='header__navlink' to={page.link}>
                      {page.name}
                    </NavLink>
                  </Button>
                ))
              : pagesNotAuthorized.map((page) => (
                  <Button
                    key={page.link}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <NavLink className='header__navlink' to={page.link}>
                      {page.name}
                    </NavLink>
                  </Button>
                ))}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {UserStore.isAutorized
              ? pagesAuthorized.map((page) => (
                  <Button
                    key={page.link}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <NavLink className='header__navlink' to={page.link}>
                      {page.name}
                    </NavLink>
                  </Button>
                ))
              : pagesNotAuthorized.map((page) => (
                  <Button
                    key={page.link}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <NavLink className='header__navlink' to={page.link}>
                      {page.name}
                    </NavLink>
                  </Button>
                ))}
          </Box>
          {UserStore.isAutorized ? (
            <Button
              onClick={() => {
                UserStore.toggleAuthorizationStatus();
              }}
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                fontSize: '1.5rem',
              }}
            >
              Выйти
            </Button>
          ) : (
            ''
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
});
