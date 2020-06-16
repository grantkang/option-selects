import React, { useContext, useState } from 'react';
import ApplicationContext from '../lib/context';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Box, Button, TextField, Grid } from '@material-ui/core';

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
  },
  form: {
    '& > *': {
      margin: theme.spacing(2, 0)
    }
  },
  formSurface: {
    padding: theme.spacing(2)
  }
}));

export default function CheckoutForm(props) {
  const classes = useStyles();
  const history = useHistory();
  const context = useContext(ApplicationContext);
  const [state, setState] = useState({
    name: '',
    creditCard: '',
    shippingAddress: '',
    creditCardError: ''
  });

  const cart = context.getCart();
  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  const handleChange = e => {
    const newState = Object.assign({}, state);
    newState[e.target.name] = e.target.value;
    setState(newState);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!creditCardIsValid()) {
      const newState = Object.assign({}, state);
      newState.creditCardError = 'Ex.) 1234-1234-1234-1234 or 1234123412341234';
      setState(newState);
      return;
    }
    const orderInfo = Object.assign({}, state);
    context.placeOrder(orderInfo);
    history.push('/');
  };

  const creditCardIsValid = () => {
    return state.creditCard.match(/\d{4}-?\d{4}-?\d{4}-?\d{4}/);
  };

  return (
    <div className={classes.root}>
      <Paper square className={classes.header}>
        <Typography className={classes.headerText} noWrap variant="h4" component="span">Checkout</Typography>
      </Paper>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Paper className={classes.formSurface}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Name"
                name="name"
                id="nameInput"
                value={state.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Credit Card"
                name="creditCard"
                id="creditCardInput"
                error={!!state.creditCardError}
                helperText={state.creditCardError}
                value={state.creditCard}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="addressInput"
                name="shippingAddress"
                label="Shipping Address"
                fullWidth
                multiline
                rows="5"
                onChange={handleChange}
                value={state.shippingAddress}
              />
            </Grid>
          </Grid>
        </Paper>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">{`Order Total: $${(totalPrice / 100).toFixed(2)}`}</Typography>
          <Button component="button" type="submit" variant="contained" color="secondary">Place Order</Button>
        </Box>
      </form>
    </div>
  );
}
