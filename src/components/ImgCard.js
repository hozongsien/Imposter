import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
  },
  img: {
    objectPosition: '50% 25%',
  },
});

const ImgCard = (props) => {
  const classes = useStyles();
  const { title, image, description, alt, link } = props;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          classes={{
            img: classes.img,
          }}
          component="img"
          alt={alt}
          height="200"
          image={image}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href={link}>
          View
        </Button>
        <Button size="small" color="primary">
          Star
        </Button>
      </CardActions>
    </Card>
  );
};

ImgCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default ImgCard;
