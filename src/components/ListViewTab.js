/* global fetch */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container, ListItem, Fab, Fade } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { FixedSizeList } from 'react-window';
import ImgCard from './ImgCard';
import Spinner from './Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    scrollBehavior: 'smooth',
    display: 'flex',
  },
  scrollUp: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const renderRow = (props) => {
  const { index, style, data } = props;
  const item = data[index];
  // const title = data[index].title;
  return (
    <ListItem style={style} key={index}>
      <ImgCard
        title={item.author_name}
        image={item.thumbnail_url}
        description={item.title}
        alt={item.title}
      />
    </ListItem>
  );
};

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

const ListViewTab = () => {
  const classes = useStyles();
  const listRef = React.useRef();
  const [isScrollForward, setScrollForward] = React.useState(false);
  const [videosLoaded, setVideoLoaded] = React.useState({
    items: [],
    isLoaded: false,
  });

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

  const fetchData = async () => {
    const responses = await Promise.all([
      fetch(
        'https://www.tiktok.com/oembed?url=https://www.tiktok.com/@nytonystark/video/6816145905821994246'
      ),
      fetch(
        'https://www.tiktok.com/oembed?url=https://www.tiktok.com/@shinsama422/video/6808373753005739265'
      ),
      fetch(
        'https://www.tiktok.com/oembed?url=https://www.tiktok.com/@hotcheekylace/video/6824364109165907202'
      ),
      fetch(
        'https://www.tiktok.com/oembed?url=https://www.tiktok.com/@yodelinghaley/video/6794132523589979397'
      ),
      fetch(
        'https://www.tiktok.com/oembed?url=https://www.tiktok.com/@scout2015/video/6718335390845095173'
      ),
      fetch(
        'https://www.tiktok.com/oembed?url=https://www.tiktok.com/@scout2015/video/6718335390845095173'
      ),
      fetch(
        'https://www.tiktok.com/oembed?url=https://www.tiktok.com/@scout2015/video/6718335390845095173'
      ),
      fetch(
        'https://www.tiktok.com/oembed?url=https://www.tiktok.com/@scout2015/video/6718335390845095173'
      ),
    ]);

    const jsons = responses.map((res) => res.json());
    const data = await Promise.all(jsons);
    setVideoLoaded({
      items: data,
      isLoaded: true,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className={classes.root}>
      {videosLoaded.isLoaded ? (
        <FixedSizeList
          className={classes.list}
          ref={listRef}
          onScroll={handleScroll}
          height={650}
          itemCount={8}
          itemSize={400}
          width={350}
          itemData={videosLoaded.items}
        >
          {renderRow}
        </FixedSizeList>
      ) : (
        <Spinner />
      )}

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
