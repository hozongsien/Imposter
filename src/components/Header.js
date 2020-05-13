import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {props.children}
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" component={Link} to="/">
              Title
            </Button>
          </Typography>
          <IconButton color="inherit" />
          <AccessAlarmIcon color="inherit" />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
