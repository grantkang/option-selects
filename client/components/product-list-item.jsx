import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {

  },
  card: {
    height: '100%',
    '&:hover': {
      cursor: 'pointer'
    },
    '&:hover $cardImage': {
      opacity: '.5'
    }
  },
  cardImage: {
    transition: 'opacity',
    transitionDuration: '.25s',
    transitionTimingFunction: 'linear',
    objectFit: 'scale-down',
    padding: theme.spacing(2)
  }
}));

export default function ProductListItem(props) {
  const classes = useStyles();
  const name = props.name;
  const price = `$${(props.price / 100).toFixed(2)}`;
  const imagePath = props.imagePath;

  return (
    <Grid className={classes.root} item xl={4} md={6} sm={12}>
      <Card className={classes.card} onClick={props.onClick}>
        <CardActionArea>
          <CardMedia
            className={classes.cardImage}
            component="img"
            alt="Product Image"
            height="300"
            image={imagePath}
          />
          <CardContent>
            <Typography variant="h4">{name}</Typography>
            <Typography variant="h6">{price}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );

}
