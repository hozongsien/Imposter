import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container, ListItem, Fab, Fade } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { FixedSizeList } from 'react-window';
import ImgCard from './ImgCard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: '0',
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    scrollBehavior: 'smooth',
  },
  scrollUp: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const renderRow = (props) => {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index}>
      <ImgCard title="Title" image="/pics/reptile.jpg" description="Descrition" alt="alt" />
    </ListItem>
  );
};

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

const ListViewTab = () => {
  const classes = useStyles();
  const listRef = React.useRef();
  const [isScrollForward, setScrollForward] = React.useState(false);

  const handleClickToScrollTop = () => {
    listRef.current.scrollToItem(0);
  };

  const handleScroll = (event) => {
    if (event.scrollDirection === 'backward') {
      setScrollForward(true);
    } else {
      setScrollForward(false);
    }
  };

  return (
    <Container className={classes.root}>
      <FixedSizeList
        className={classes.list}
        ref={listRef}
        onScroll={handleScroll}
        height={650}
        itemCount={10}
        itemSize={300}
        width={350}
      >
        {renderRow}
      </FixedSizeList>
      <Fade in={isScrollForward}>
        <Fab
          className={classes.scrollUp}
          color="primary"
          aria-label="up"
          onClick={handleClickToScrollTop}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Fade>
    </Container>
  );
};

export default ListViewTab;
