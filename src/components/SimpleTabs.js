/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </Typography>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

TabPanel.defaultProps = {
  children: PropTypes.node,
};

const a11yProps = (index) => {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
    panel: {
      padding: '0px',
    },
  },
}));

const SimpleTabs = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [shouldDetect, setShouldDetect] = React.useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleToggleDetection = () => {
    setShouldDetect(!shouldDetect);
    // console.log(shouldDetect);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: 'inherit',
      className: clsx(classes.fab, classes.fabGreen),
      icon: <UpIcon />,
      label: 'Expand',
    },
    {
      color: 'secondary',
      className: classes.fab,
      icon: <CloudUploadIcon />,
      label: 'Edit',
    },
    {
      color: 'primary',
      className: classes.fab,
      icon: shouldDetect ? <PauseIcon /> : <PlayArrowIcon />,
      label: 'Pause/Play',
    },
  ];

  const toTabLabel = (i, child) => {
    const label = `${i + 1}`;
    return <Tab key={i} label={label} {...a11yProps(i)} />;
  };

  const toTabPanel = (val, i, child) => {
    return (
      <TabPanel key={i} value={val} index={i} dir={theme.direction}>
        {child}
      </TabPanel>
    );
  };

  return (
    <div className={classes.root}>
      <Paper>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {props.children.map((c, i) => toTabLabel(i, c))}
        </Tabs>
        <TabPanel value={value} index={0} dir={theme.direction}>
          {props.children[0]}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {props.children[1]}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {React.cloneElement(props.children[2], { shouldDetect })}
        </TabPanel>
      </Paper>
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab
            aria-label={fab.label}
            className={fab.className}
            color={fab.color}
            onClick={handleToggleDetection}
          >
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </div>
  );
};

SimpleTabs.propTypes = {
  children: PropTypes.node,
};

SimpleTabs.defaultProps = {
  children: PropTypes.node,
};

export default SimpleTabs;
