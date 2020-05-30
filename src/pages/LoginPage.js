/* eslint-disable react/jsx-wrap-multilines */
/* global fetch */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Box,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Button,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0',
  },
  title: {
    margin: '1rem 0',
  },
  formBox: {},
  inputBox: {},
  input: {
    margin: '0.5rem 0',
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2rem',
  },
  button: {},
  margin: {
    margin: '1rem',
  },
  textField: {
    width: '25ch',
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const [isSignIn, setSignIn] = useState(true);

  const [errors, setErrors] = useState({
    signIn: {
      credentials: false,
    },
    createAccount: {
      email: false,
      password: false,
    },
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleToggleSignIn = () => {
    setSignIn(!isSignIn);
  };

  const queryGraphql = async (requestBody) => {
    const baseEndPoint = 'http://localhost:5000/graphql';

    const response = await fetch(baseEndPoint, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const createUserRequestBody = {
      query: `
        mutation {
          createUser(userInput: {email: "${values.email}", password: "${values.password}"}) {
            _id
            email
          }
        }`,
    };

    const loginRequestBody = {
      query: `
        query {
          login(userInput: {email: "${values.email}", password: "${values.password}"}) {
            userId
            token
            tokenExpiration
          }
        }`,
    };

    if (isSignIn) {
      const loginData = queryGraphql(loginRequestBody);
      loginData.then((d) => console.log(d));
    } else {
      const createUserData = queryGraphql(createUserRequestBody);
      createUserData.then((d) => console.log(d));
    }
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h5" component="h2">
        <Box className={classes.title}>{isSignIn ? 'Sign in' : 'Create an account'}</Box>
      </Typography>
      <form
        className={clsx(classes.formBox, classes.margin)}
        autoComplete="on"
        onSubmit={handleSubmit}
      >
        <Box className={classes.inputBox}>
          <FormControl
            className={classes.input}
            fullWidth
            variant="outlined"
            required
            error={errors.createAccount.email || errors.signIn.credentials}
          >
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type="email"
              value={values.email}
              onChange={handleChange('email')}
              labelWidth={70}
            />
          </FormControl>
          <FormControl
            className={classes.input}
            fullWidth
            variant="outlined"
            required
            error={errors.createAccount.password || errors.signIn.credentials}
          >
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
            {errors.signIn.credentials ? <FormHelperText>Invalid credentials</FormHelperText> : ''}
          </FormControl>
        </Box>
        <Box className={classes.buttonBox}>
          <Button
            variant="text"
            color="primary"
            className={classes.button}
            onClick={handleToggleSignIn}
          >
            {isSignIn ? 'Create account' : 'Sign in instead'}
          </Button>
          <Button type="submit" className={classes.button} variant="contained" color="primary">
            Next
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default LoginPage;
