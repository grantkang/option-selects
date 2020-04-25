import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
  }

  componentDidMount() {
    this.getCartItems();
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
    return (
      <div className="container-fluid">
        <Header
          cartItemCount={this.state.cart.length}
          viewCartSummary={() => this.setView('cart', {})}/>
        <div className="p-4 bg-light">
          {currentView}
        </div>
      </div>
    );
  }
}
