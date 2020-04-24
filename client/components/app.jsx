import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
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
    fetch('api/cart', req)
      .then(response => response.json())
      .then(cartItem => {
        const newCart = this.state.cart.slice();
        newCart.push(cartItem);
        this.setState({ cart: newCart });
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
            goBack={() => this.setView('catalog', {})}
            addToCart={this.addToCart}
            params={this.state.view.params}
          />
        );
      case 'cart':
        return (
          <CartSummary
            goBack={() => this.setView('catalog', {})}
            cart={this.state.cart} />
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
