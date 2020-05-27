import React, { Fragment } from 'react';
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
    this.setView = this.setView.bind(this);
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

  setView(name, params) {
    const newView = {
      name: name,
      params: params
    };
    this.setState({
      view: newView
    });
  }

  getView() {
    switch (this.state.view.name) {
      case 'catalog':
        return (
          <ProductList
            onClick={this.setView}/>
        );
      case 'details':
        return (
          <ProductDetails
            setView={this.setView}
            addToCart={this.addToCart}
            params={this.state.view.params}
          />
        );
      case 'cart':
        return (
          <CartSummary
            setView={this.setView}
            cart={this.state.cart} />
        );
      case 'checkout':
        return (
          <CheckoutForm
            setView={this.setView}
            placeOrder={this.placeOrder}
            params={this.state.view.params} />
        );
      default:
        return null;
    }
  }

  render() {
    const currentView = this.getView();
    const modal = Object.assign({}, this.state.modal);
    return (
      <Fragment>
        {modal.isOpen ? <NotificationModal modal={modal} close={this.closeModal} /> : null}
        <div className="container-fluid">
          <Header
            cartItemCount={this.state.cart.length}
            viewProductList={() => this.setView('catalog', {}) }
            viewCartSummary={() => this.setView('cart', {})} />
          <div className="p-4 bg-light">
            {currentView}
          </div>
        </div>
      </Fragment>
    );
  }
}
