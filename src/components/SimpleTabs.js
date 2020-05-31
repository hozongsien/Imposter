/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
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
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import PredictionContext from '../context/PredictionContext';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  tabsContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  tabLabel: {
    boxShadow: '0 0 3px black',
  },
  tabsPanel: {
    height: '100%',
    width: '100%',
  },
  tabsContent: {
    height: '100%',
    width: '100%',
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
  },
}));

const a11yProps = (index) => {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={classes.tabsContent} p={0}>
          {children}
        </Box>
      )}
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

const SimpleTabs = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [shouldDetect, setShouldDetect] = React.useState({
    videoTab: false,
    cameraTab: false,
  });

  const configDetection = (vid, cam) => {
    setShouldDetect({
      videoTab: vid,
      cameraTab: cam,
    });
  };

  const handleChange = (event, newValue) => {
    if (newValue === 1) {
      setShouldDetect({
        videoTab: true,
        cameraTab: false,
      });
    }

    if (newValue === 2) {
      setShouldDetect({
        videoTab: false,
        cameraTab: true,
      });
    }

    setValue(newValue);
  };

  const handleClickToUpload = () => {
    // console.log('Upload file');
  };

  const handleClickToToggleDetection = () => {
    setShouldDetect({
      videoTab: shouldDetect.videoTab,
      cameraTab: !shouldDetect.cameraTab,
    });
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: 'secondary',
      className: classes.fab,
      icon: <CloudUploadIcon />,
      label: 'Upload',
      onClickHandler: handleClickToUpload,
    },
    {
      color: 'primary',
      className: classes.fab,
      icon: shouldDetect.cameraTab ? <PauseIcon /> : <PlayArrowIcon />,
      label: 'Pause/Play',
      onClickHandler: handleClickToToggleDetection,
    },
  ];

  const toTabLabel = (c, i) => {
    const label = `${i + 1}`;
    return <Tab key={i} label={label} {...a11yProps(i)} />;
  };

  const toTabPanel = (c, i, v) => {
    return (
      <TabPanel className={classes.tabsPanel} key={i} index={i} value={v} dir={theme.direction}>
        {c}
      </TabPanel>
    );
  };

  return (
    <div className={classes.root}>
      <PredictionContext.Provider value={{ shouldDetect, configDetection }}>
        <Paper square className={classes.tabsContainer}>
          <Tabs
            className={classes.tabLabel}
            value={value}
            onChange={handleChange}
            aria-label="simple tabs"
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            {props.children.map((child, index) => toTabLabel(child, index))}
          </Tabs>
          {props.children.map((child, index) => toTabPanel(child, index, value))}
        </Paper>
        {fabs.map((fab, index) => (
          <Zoom
            key={fab.color}
            in={value === index + 1}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${value === index + 1 ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
          >
            <Fab
              aria-label={fab.label}
              className={fab.className}
              color={fab.color}
              onClick={fab.onClickHandler}
            >
              {fab.icon}
            </Fab>
          </Zoom>
        ))}
      </PredictionContext.Provider>
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
