import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  render() {
    const cartItems = this.props.cart.map(item => {
      return (
        <CartSummaryItem
          key={item.cartItemId}
          cartItem={item} />
      );
    });
    const totalPrice = this.props.cart.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

    return (
      <div>
        <span className="pointer" onClick={() => this.props.setView('catalog', {})}>&#60; back to catalog</span>
        <h2>My Cart</h2>
        <div className="d-flex flex-column">
          {cartItems}
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <h2>{`Item Total: $${(totalPrice / 100).toFixed(2)}`}</h2>
          <button
            className="btn btn-primary"
            onClick={() => { this.props.setView('checkout', { orderTotal: totalPrice }); }}
            disabled={!this.props.cart.length}
          >Checkout</button>
        </div>
      </div>
    );
  }
}
