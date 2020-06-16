import React, { useContext, Fragment } from 'react';
import CartSummaryItem from './cart-summary-item';
import ApplicationContext from '../lib/context';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 0),
    '& > *': {
      margin: theme.spacing(2, 0)
    }
  },
  header: {
    display: 'inline-block',
    padding: theme.spacing(1, 2, 1, 4),
    background: theme.palette.secondary.main
  },
  headerText: {
    color: theme.palette.secondary.contrastText
  }
}));

export default function CartSummary(props) {
  const classes = useStyles();
  const context = useContext(ApplicationContext);
  const history = useHistory();
  const cart = context.getCart();
  const cartItems = cart.map(item => {
    return (
      <CartSummaryItem
        key={item.cartItemId}
        cartItem={item} />
    );
  });
  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  return (
    <div className={classes.root}>
      <Paper square className={classes.header}>
        <Typography className={classes.headerText} noWrap variant="h4" component="span">{'My Cart'}</Typography>
      </Paper>
      <Box display="flex" flexDirection="column">
        {cartItems}
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <div>
          <Typography display="inline" variant="h4">{'Item Total: '}</Typography>
          {context.getSecret() ? (
            <Fragment>
              <Typography display="inline" variant="h4" color="secondary"><s>{`$${(totalPrice / 100).toFixed(2)}`}</s></Typography>
              <Typography display="inline" variant="h4">{`  $${(0).toFixed(2)}`}</Typography>
            </Fragment>
          ) : (
            <Typography display="inline" variant="h4">
              {`$${(totalPrice / 100).toFixed(2)}`}
            </Typography>
          )}
        </div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => history.push('/checkout')}
          disabled={!cart.length}>
          Checkout
        </Button>
      </Box>
    </div>
  );
}
