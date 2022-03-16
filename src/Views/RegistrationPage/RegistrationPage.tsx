import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import { createStyles, makeStyles } from '@mui/styles';

import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';

import { CustomTextField } from '../../Common/CustomTextField';
import { CustomButton } from '../../Common/CustomButton';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
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
  email: string;
  file: string;
}

export const RegistrationPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          Name: '',
          password: '',
          confirmPassword: '',
          email: '',
          file: '',
        }}
        onSubmit={(values: ISignUpForm) => {
          console.log('submitted');
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
          confirmPassword: Yup.string()
            .required('Required')
            .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
        })}
      >
        {(props: FormikProps<ISignUpForm>) => {
          const { values, touched, errors, handleBlur, handleChange } = props;
          const isErrors = Object.entries(errors).length !== 0;

          return (
            <Form className='registration-page__wrapper'>
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
