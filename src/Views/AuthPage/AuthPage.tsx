import React, { useState } from 'react';
import { Typography } from '@mui/material';

import Grid from '@mui/material/Grid';
import { createStyles, makeStyles } from '@mui/styles';

import Box from '@mui/material/Box';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';

import { CustomTextField } from '../../Common/CustomTextField';
import { CustomButton } from '../../Common/CustomButton';
import { localHostService } from '../../Service/Serviсe';
import { UserStore } from '../../Store/UserStore';
import { CustomSnackBar } from '../../Common/CustomSnackBar';
import { useNavigate } from 'react-router-dom';
import { TIMEBEFOREREDIRECT } from '../RegistrationPage/RegistrationPage';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: '405px',
      display: 'block',
      margin: '0 auto',
    },
    textField: {
      '& > *': {
        width: '100%',
      },
    },
    submitButton: {
      marginTop: '2rem',
    },
  })
);

interface ISignInForm {
  number: string;
  password: string;
}

export const AuthPage = () => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          number: '',
          password: '',
        }}
        onSubmit={async (values: ISignInForm) => {
          const authorizationResult =
            await localHostService.checkAuthorizaitonStatus(
              values.number,
              values.password
            );
          if (authorizationResult !== 'error') {
            UserStore.setNewProfile(authorizationResult);
            UserStore.toggleAuthorizationStatus();
            setTimeout(() => {
              navigate('/user');
            }, TIMEBEFOREREDIRECT);
          } else {
            setIsOpen((prev) => !prev);
          }
        }}
        validationSchema={Yup.object().shape({
          number: Yup.string()
            .matches(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)
            .required(
              'Введите валидный номер мобильного телефона пример: 89001234567'
            ),
          password: Yup.string()
            .matches(
              / ((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/
            )
            .required(
              'Введите валидный пароль, состоящий из одного символа в нижнем регистре, одного в верхнем и одного специального символа. Длина пароля не менее 8 символов.'
            ),
        })}
      >
        {(props: FormikProps<ISignInForm>) => {
          const { values, touched, errors, handleBlur, handleChange } = props;
          const isErrors = Object.entries(errors).length !== 0;

          return (
            <Form>
              <CustomSnackBar
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                messageText='Введен неверный логин или пароль'
              />
              <Typography
                sx={{
                  fontWeight: '600',
                  display: 'flex',
                  justifyContent: 'start',
                  marginTop: '18rem',
                  marginBottom: '2.4rem',
                }}
                variant='h2'
              >
                Логин
              </Typography>
              <Grid
                sx={{ marginTop: '2.4rem' }}
                container
                spacing={2}
                direction='row'
              >
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.textField}
                >
                  <CustomTextField
                    name='number'
                    id='number'
                    label='Номер'
                    value={values.number}
                    type='number'
                    helperText={
                      errors.number && touched.number
                        ? 'Номер должен быть вида : 89001234567'
                        : 'Введите номер'
                    }
                    error={!!(errors.number && touched.number)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.textField}
                >
                  <CustomTextField
                    name='password'
                    id='password'
                    label='Пароль'
                    value={values.password}
                    type='password'
                    helperText={
                      errors.password && touched.password
                        ? 'Введите валидный пароль, состоящий из одного символа в нижнем регистре, одного в верхнем и одного специального символа. Длина пароля не менее 8 символов.'
                        : 'Пароль должен состоять из одного символа в нижнем регистре, одного в верхнем и одного специального символа. Длина пароля не менее 8 символов.'
                    }
                    error={!!(errors.password && touched.password)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.submitButton}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CustomButton type='submit' disabled={isErrors}>
                      Войти
                    </CustomButton>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
