/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Box,
  InputLabel,
  OutlinedInput,
  InputAdornment,
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

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleToggleSignInAccount = () => {
    setSignIn(!isSignIn);
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h5" component="h2">
        <Box className={classes.title}>{isSignIn ? 'Sign in' : 'Create an account'}</Box>
      </Typography>
      <Box className={clsx(classes.formBox, classes.margin)}>
        <Box className={classes.inputBox}>
          <FormControl className={classes.input} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type="text"
              onChange={handleChange('email')}
              labelWidth={70}
            />
          </FormControl>
          <FormControl className={classes.input} fullWidth variant="outlined">
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
          </FormControl>
        </Box>
        <Box className={classes.buttonBox}>
          <Button
            variant="text"
            color="primary"
            className={classes.button}
            onClick={handleToggleSignInAccount}
          >
            {isSignIn ? 'Create account' : 'Sign in'}
          </Button>
          <Button type="submit" variant="contained" color="primary" className={classes.button}>
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
