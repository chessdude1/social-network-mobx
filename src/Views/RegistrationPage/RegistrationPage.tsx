import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import { createStyles, makeStyles } from '@mui/styles';

import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';

import { CustomTextField } from '../../Common/CustomTextField';
import { CustomButton } from '../../Common/CustomButton';
import { localHostService } from '../../Service/Serviсe';
import { UserStore } from '../../Store/UserStore';
import { CustomSnackBar } from '../../Common/CustomSnackBar';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      paddingTop: '100px',
      maxWidth: '35rem',
      display: 'block',
      margin: '0 auto',
    },
    textField: {
      '& > *': {
        marginTop: '2.2rem',
        width: '100%',
      },
    },
    submitButton: {
      marginTop: '2.4rem',
    },
  })
);

interface ISignUpForm {
  Name: string;
  password: string;
  confirmPassword: string;
  number: string;
}

export const TIMEBEFOREREDIRECT = 1500;

export const RegistrationPage = () => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          Name: '',
          password: '',
          confirmPassword: '',
          number: '',
        }}
        onSubmit={async (values: ISignUpForm) => {
          try {
            const currentProfile = {
              userName: values.Name,
              password: values.password,
              number: values.number,
              contacts: [],
            };
            const resultOfSetNewProfile = await localHostService.setNewProfile(
              currentProfile
            );
            if (resultOfSetNewProfile === 'ok') {
              UserStore.setNewProfile(currentProfile);
              UserStore.toggleAuthorizationStatus();
              setTimeout(() => {
                navigate('/user');
              }, TIMEBEFOREREDIRECT);
            } else if (resultOfSetNewProfile === 'error') {
              setIsOpen((prev) => !prev);
            }
          } catch (e) {
            console.log(e);
          }
        }}
        validationSchema={Yup.object().shape({
          Name: Yup.string().required('Введите имя'),
          password: Yup.string()
            .matches(
              / ((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/
            )
            .required(
              'Введите валидный пароль, состоящий из одного символа в нижнем регистре, одного в верхнем и одного специального символа. Длина пароля не менее 8 символов.'
            ),
          number: Yup.string()
            .matches(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)
            .required(
              'Введите валидный номер мобильного телефона пример: 89001234567'
            ),

          confirmPassword: Yup.string()
            .required('Обязательное поле')
            .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
        })}
      >
        {(props: FormikProps<ISignUpForm>) => {
          const { values, touched, errors, handleBlur, handleChange } = props;
          const isErrors = Object.entries(errors).length !== 0;

          return (
            <Form className='registration-page__wrapper'>
              <CustomSnackBar
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                messageText='аккаунт с введеным номер уже существует'
              />
              <Typography
                sx={{
                  fontWeight: '600',
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '4.8rem',
                  marginBottom: '2.4rem',
                }}
                variant='h2'
              >
                Создать аккаунт
              </Typography>

              <Grid container spacing={1} direction='row'>
                <Grid
                  sx={{ margin: '0 auto' }}
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.textField}
                >
                  <CustomTextField
                    name='Name'
                    id='Name'
                    label='Имя'
                    value={values.Name}
                    type='text'
                    helperText={
                      errors.Name && touched.Name
                        ? errors.Name
                        : 'Введите имя пользователя'
                    }
                    error={!!(errors.Name && touched.Name)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  sx={{ margin: '0 auto' }}
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
                    type='text'
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
                  sx={{ margin: '0 auto' }}
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
                  sx={{ margin: '0 auto', paddingTop: '100px' }}
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.textField}
                >
                  <CustomTextField
                    name='confirmPassword'
                    id='confirmPassword'
                    label='Подтверждение пароля'
                    value={values.confirmPassword}
                    type='password'
                    helperText={
                      errors.confirmPassword && touched.confirmPassword
                        ? errors.confirmPassword
                        : 'Повторите пароль для подтверждения'
                    }
                    error={
                      !!(errors.confirmPassword && touched.confirmPassword)
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  sx={{ margin: '0 auto' }}
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.submitButton}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '3.2rem',
                      marginBottom: '4.8rem',
                    }}
                  ></Box>
                  <CustomButton
                    variant='text'
                    type='submit'
                    disabled={isErrors}
                  >
                    Зарегистрироваться
                  </CustomButton>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
