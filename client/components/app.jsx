import React, { Fragment } from 'react';
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

const appTitle = 'Wicked Sales';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
      <Fragment>
        {modal.isOpen ? <NotificationModal modal={modal} close={this.closeModal} /> : null}
        <div className="container-fluid">
          <Header
            cartItemCount={this.state.cart.length}
            viewProductList={() => this.setView('catalog', {}) }
            viewCartSummary={() => this.setView('cart', {})} />
          <Router>
            <div className="p-4 bg-light">
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
            </div>
          </Router>
        </div>
      </Fragment>
    );
  }
}
