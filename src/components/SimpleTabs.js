/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography component="div" align="center">
            {children}
          </Typography>
        </Box>
      )}
    </div>
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const SimpleTabs = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toTabLabel = (i, children) => {
    const label = `${i + 1}`;
    return <Tab key={i} label={label} {...a11yProps(i)} />;
  };

  const toTabPanel = (val, i, children) => {
    return (
      <TabPanel key={i} value={val} index={i}>
        {children}
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
        {props.children.map((c, i) => toTabPanel(value, i, c))}
      </Paper>
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
