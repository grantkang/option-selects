import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import NotificationModal from './notification-modal';
import AppContext from '../lib/context';
import { createMuiTheme, ThemeProvider, Container, responsiveFontSizes } from '@material-ui/core';

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
      main: '#F8F9FA'
    }
  }
});

defaultTheme = responsiveFontSizes(defaultTheme);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: [],
      modal: {
        isOpen: true,
        header: 'Hello World',
        body: `Welcome to ${appTitle}! This is just a demo so it is not a real store. Please do not use your real info!`,
        options: [{ label: 'OK, got it!' }]
      }
    };
    this.contextValue = {
      addToCart: this.addToCart.bind(this),
      placeOrder: this.placeOrder.bind(this),
      closeModal: this.closeModal.bind(this),
      openModal: this.openModal.bind(this),
      getApplicationTitle: () => { return appTitle; },
      getCart: () => { return this.state.cart.slice(); }
    };
  }

  componentDidMount() {
    this.getCartItems();
  }

  closeModal() {
    const newState = Object.assign({}, this.state.modal);
    newState.isOpen = false;
    this.setState({ modal: newState });
  }

  openModal(header, body, options) {
    const newState = {
      isOpen: true,
      header: header,
      body: body,
      options: options
    };
    this.setState({ modal: newState });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(response => response.json())
      .then(cart => {
        this.setState({ cart: cart });
      });
  }

  addToCart(product) {
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
        const newCart = this.state.cart.slice();
        newCart.push(cartItem);
        this.setState({ cart: newCart });
      });
  }

  placeOrder(orderSubmission) {
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
        this.setState({
          cart: [],
          view: {
            name: 'catalog',
            params: {}
          }
        });
      });
  }

  render() {
    const modal = Object.assign({}, this.state.modal);
    return (
      <AppContext.Provider value={this.contextValue}>
        <ThemeProvider theme={defaultTheme}>
          {modal.isOpen ? <NotificationModal modal={modal} close={this.contextValue.closeModal} /> : null}
          <Router>
            <Header cartItemCount={this.state.cart.length}/>
            <div className="p-4 bg-light">
              <Container>
                <Switch>
                  <Route exact path="/">
                    <ProductList />
                  </Route>
                  <Route path="/products/:id">
                    <ProductDetails />
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
}
