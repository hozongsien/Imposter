/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useContext } from 'react';
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
import queryGraphql from '../components/queryGraphql';
import AuthenticationContext from '../context/AuthenticationContext';

const useStyles = makeStyles(() => ({
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

  const authContext = useContext(AuthenticationContext);

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const createUserQuery = `
      mutation {
        createUser(userInput: {email: "${values.email}", password: "${values.password}"}) {
          _id
          email
        }
      }`;

    const loginQuery = `
      query {
        login(userInput: {email: "${values.email}", password: "${values.password}"}) {
          userId
          token
          tokenExpiration
        }
      }`;

    if (isSignIn) {
      const loginData = queryGraphql(loginQuery);
      loginData.then((fetchedData) => {
        authContext.login(
          fetchedData.data.login.token,
          fetchedData.data.login.tokenExpiration,
          fetchedData.data.login.userId
        );
      });
    } else {
      const createUserData = queryGraphql(createUserQuery);
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
