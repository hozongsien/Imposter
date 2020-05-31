import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HistoryIcon from '@material-ui/icons/History';
import StarsIcon from '@material-ui/icons/Stars';
import HelpIcon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import AuthenticationContext from '../context/AuthenticationContext';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 300,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  subList: {
    padding: theme.spacing(0),
  },
  loginButton: {
    paddingTop: theme.spacing(18),
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
}));

function ListItemLink(props) {
  const { classes, icon, primary, to } = props;

  const CustomLink = React.useMemo(
    () => React.forwardRef((linkProps, ref) => <Link ref={ref} to={to} {...linkProps} />),
    [to]
  );

  return (
    <ListItem button className={classes} component={CustomLink}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={primary} />
    </ListItem>
  );
}

ListItemLink.propTypes = {
  classes: PropTypes.string,
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

ListItemLink.defaultProps = {
  classes: undefined,
  icon: undefined,
};

const SideDrawer = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    isOpen: false,
  });

  const authContext = useContext(AuthenticationContext);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ isOpen: open });
  };

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List className={classes.subList}>
        {authContext.token ? (
          <ListItemLink classes={classes.loginButton} icon={null} primary={authContext.email} />
        ) : (
          <ListItemLink
            classes={classes.loginButton}
            primary="Log in / Create account"
            to="/login"
          />
        )}

        {authContext.token && (
          <ListItemLink icon={<HistoryIcon />} primary="History" to="/history" />
        )}
        {authContext.token && <ListItemLink icon={<StarsIcon />} primary="Starred" to="/starred" />}
        <ListItemLink icon={<HelpIcon />} primary="Help" to="/help" />
        <Divider />
        <ListItemLink icon={<SettingsIcon />} primary="Settings" to="/settings" />
        <ListItemLink icon={<InfoIcon />} primary="About" to="/about" />
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key="left">
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          anchor="left"
          open={state.isOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

export default SideDrawer;
