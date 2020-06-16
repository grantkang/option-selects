import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Header from './header';
import Home from './home';
import Brands from './brands';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import AppContext from '../lib/context';
import { createMuiTheme, ThemeProvider, responsiveFontSizes, makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Categories from './categories';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const appTitle = 'Option Selects';

let defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#181717',
      light: '#3C3A3B',
      dark: '#100F0F',
      contrastText: '#fff'
    },
    secondary: {
      main: '#9F1D1F',
      contrastText: '#fff'
    },
    background: {
      main: '#f8f9fa'
    }
  }

});

defaultTheme = responsiveFontSizes(defaultTheme);
const useStyles = makeStyles(theme => ({
  root: {
    background: '#f8f9fa'
  }
}));

export default function App(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useStyles();
  const [cart, setCart] = useState([]);
  const [modal, setModal] = useState({
    isOpen: true,
    header: 'Hello World',
    body: `Welcome to ${appTitle}! This is just a demo so it is not a real store. Please do not use your real info!`,
    options: [{ label: 'OK, got it!' }]
  });

  useEffect(() => {
    getCartItems();
  }, []);

  const closeModal = () => {
    const newState = Object.assign({}, modal);
    newState.isOpen = false;
    setModal(newState);
  };

  const openModal = (header, body, options) => {
    const newState = {
      isOpen: true,
      header: header,
      body: body,
      options: options
    };
    setModal(newState);
  };

  const getCartItems = () => {
    fetch('/api/cart')
      .then(response => response.json())
      .then(cart => {
        setCart(cart);
      });
  };

  const addToCart = product => {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    };
    fetch('/api/cart', req)
      .then(response => response.json())
      .then(cartItem => {
        const newCart = cart.slice();
        newCart.push(cartItem);
        setCart(newCart);
      });
  };

  const placeOrder = orderSubmission => {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderSubmission)
    };
    fetch('/api/orders', req)
      .then(response => response.json())
      .then(processedOrder => {
        setCart([]);
      });
  };

  const contextValue = {
    addToCart,
    placeOrder,
    closeModal,
    openModal,
    getApplicationTitle: () => { return appTitle; },
    getCart: () => { return cart.slice(); }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <ThemeProvider theme={defaultTheme}>
        <Dialog
          open={modal.isOpen}
          onClose={contextValue.closeModal}>
          <DialogTitle id="alert-dialog-title">{modal.header}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {modal.body}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {modal.options.map((option, i) => {
              return (
                <Button key={i} onClick={contextValue.closeModal}>{option.label}</Button>
              );
            })}
          </DialogActions>
        </Dialog>
        <Router>
          <Header cartItemCount={cart.length}/>
          <div className={classes.root}>
            <Container disableGutters={!isMobile}>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/products/:id">
                  <ProductDetails />
                </Route>
                <Route path="/brands/:id">
                  <Brands />
                </Route>
                <Route path="/categories/:id">
                  <Categories />
                </Route>
                <Route path="/cart">
                  <CartSummary />
                </Route>
                <Route path="/checkout">
                  <CheckoutForm />
                </Route>
              </Switch>
            </Container>
          </div>
        </Router>
      </ThemeProvider>
    </AppContext.Provider>
  );

}
