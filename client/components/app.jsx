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
import Snackbar from '@material-ui/core/Snackbar';
import Code from '../lib/code';

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

const fs220 = new Code();
const audio = document.querySelector('#party-time');

export default function App(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useStyles();
  const [cart, setCart] = useState([]);
  const [modal, setModal] = useState({
    isOpen: true,
    header: 'Hello World',
    body: `Welcome to ${appTitle}! This is just a demo and not a real store. Please do not use your real info!`,
    options: [{ label: 'OK, got it!' }]
  });
  const [secret, setSecret] = useState(false);

  const _handleKeyDown = event => {
    if (fs220.add(event.keyCode) === '🤫') {
      audio.play();
      openSnackbar('Welcome to LFZ Afterhours.. 🤫');
      enableSecret();
    }
  };

  const getSecret = () => {
    fetch('/api/fs220')
      .then(response => response.json())
      .then(data => {
        setSecret(data['🤫']);
      });
  };

  const enableSecret = () => {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch('/api/fs220', req)
      .then(response => response.json())
      .then(data => {
        setSecret(data['🤫']);
      });
  };

  useEffect(() => {
    document.addEventListener('keydown', _handleKeyDown);
  }, []);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ''
  });

  useEffect(() => {
    getSecret();
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

  const openSnackbar = message => {
    setSnackbar({
      open: true,
      message
    });
  };

  const closeSnackbar = () => {
    setSnackbar({
      open: false,
      message: ''
    });
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
        openSnackbar('Item added to cart!');
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
        setSecret(false);
        openModal('Psuedo Order Placed', 'Thanks for trying out the demo!', [{ label: 'Continue' }]);
      });
  };

  const contextValue = {
    addToCart,
    placeOrder,
    closeModal,
    openModal,
    openSnackbar,
    getApplicationTitle: () => { return appTitle; },
    getCart: () => { return cart.slice(); },
    getSecret: () => { return secret; }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <ThemeProvider theme={defaultTheme}>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={modal.isOpen}
          onClose={contextValue.closeModal}>
          <DialogTitle>{modal.header}</DialogTitle>
          <DialogContent>
            <DialogContentText>
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
        <Snackbar open={snackbar.open} autoHideDuration={3000} message={snackbar.message} onClose={closeSnackbar}/>
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
