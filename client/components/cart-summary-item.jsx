import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {

  },
  image: {
    width: '100%',
    objectFit: 'scale-down'
  },
  mainImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '200px',
    padding: theme.spacing(3)
  },
  productDetails: {
    '& > *': {
      margin: theme.spacing(2, 0)
    }
  }
}));

export default function CartSummaryItem(props) {
  const classes = useStyles();
  const cartItem = props.cartItem;
  return (
    <Paper>
      <Grid container>
        <Grid item xs={12} md={5}>
          <div className={classes.mainImageContainer}>
            <img className={classes.image} src={cartItem.imagePath} alt="" />
          </div>
        </Grid>
        <Grid className={classes.productDetails} item xs={12} md={6}>
          <Typography variant="h5">{cartItem.name}</Typography>
          <Typography variant="h4">
            {`$${(cartItem.price / 100).toFixed(2)}`}
          </Typography>
          {cartItem.colorId ? (
            <div>
              <Typography display="inline" variant="button">Color: {cartItem.colorName}</Typography>
            </div>
          ) : null}
          {cartItem.sizeId ? (
            <div>
              <Typography display="inline" variant="button">Size: {cartItem.sizeAbreviation}</Typography>
            </div>
          ) : null}
        </Grid>
      </Grid>
    </Paper>
  );

}
