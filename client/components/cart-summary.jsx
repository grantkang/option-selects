import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummer extends React.Component {
  render() {
    const cartItems = this.props.cart.map(item => {
      return (
        <CartSummaryItem
          key={item.productId}
          product={item.product} />
      );
    });

    return (
      <div>
        <span className="pointer" onClick={this.props.goBack}>&#60; back to catalog</span>
        <h3>My Cart</h3>
        <div className="d-flex flex-column">
          {cartItems}
        </div>
      </div>
    );
  }
}
