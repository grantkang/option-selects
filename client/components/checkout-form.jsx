import React, { Fragment, useContext, useState } from 'react';
import ApplicationContext from '../lib/context';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
    creditCardError: '',
    emptyNameError: '',
    emptyAddressError: ''
  });
  const [hasAgreed, setHasAgreed] = useState(false);

  const cart = context.getCart();
  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  const handleChange = e => {
    const newState = Object.assign({}, state);
    newState[e.target.name] = e.target.value;
    setState(newState);
  };

  const handleCheckChange = e => {
    setHasAgreed(e.target.checked);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newState = Object.assign({}, state);
    newState.name = state.name.trim();
    newState.shippingAddress = state.shippingAddress.trim();
    newState.creditCardError = creditCardIsValid() ? '' : 'Ex.) 1234-1234-1234-1234 or 1234123412341234';
    newState.emptyNameError = newState.name.length > 0 ? '' : 'Please input you name';
    newState.emptyAddressError = newState.shippingAddress.length > 0 ? '' : 'Please input your adddress';

    if (!newState.creditCardError && !newState.emptyNameError && !newState.emptyAddressError) {
      const orderInfo = Object.assign({}, state);
      context.placeOrder(orderInfo);
      history.push('/');
    } else {
      setState(newState);
    }
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
                error={!!state.emptyNameError}
                helperText={state.emptyNameError}
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
                error={!!state.emptyAddressError}
                helperText={state.emptyAddressError}
                fullWidth
                multiline
                rows="5"
                onChange={handleChange}
                value={state.shippingAddress}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hasAgreed}
                    onChange={handleCheckChange}
                    name="demoAgreement"
                    color="secondary"
                    required
                  />
                }
                label="I understand that this is just a demo application and not a real store"
              />
            </Grid>
          </Grid>
        </Paper>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <div>
            <Typography display="inline" variant="h5">{'Item Total: '}</Typography>
            {context.getSecret() ? (
              <Fragment>
                <Typography display="inline" variant="h5" color="secondary"><s>{`$${(totalPrice / 100).toFixed(2)}`}</s></Typography>
                <Typography display="inline" variant="h5">{`  $${(0).toFixed(2)}`}</Typography>
              </Fragment>
            ) : (
              <Typography display="inline" variant="h5">
                {`$${(totalPrice / 100).toFixed(2)}`}
              </Typography>
            )}
          </div>
          <Button component="button" type="submit" variant="contained" color="secondary">Place Order</Button>
        </Box>
      </form>
    </div>
  );
}
