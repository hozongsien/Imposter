import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import ImgCard from './ImgCard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    minHeight: '600px',
    backgroundColor: theme.palette.background.paper,
    padding: '0',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
}));

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={{ padding: '10px 0' }} key={index}>
      <ImgCard title="Title" image="/pics/reptile.jpg" description="Descrition" alt="alt" />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

const ListView = () => {
  const classes = useStyles();
  const listButtonStyle = {
    padding: '0',
  };

  return (
    <div className={classes.root}>
      <FixedSizeList className={classes.list} height={600} itemCount={5} itemSize={300} width={350}>
        {renderRow}
      </FixedSizeList>
    </div>
  );
};

export default ListView;
