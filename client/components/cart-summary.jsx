import React, { useContext } from 'react';
import CartSummaryItem from './cart-summary-item';
import ApplicationContext from '../lib/context';
import { useHistory } from 'react-router-dom';

export default function CartSummary(props) {
  const context = useContext(ApplicationContext);
  const history = useHistory();
  const cart = context.getCart();
  const cartItems = cart.map(item => {
    return (
      <CartSummaryItem
        key={item.cartItemId}
        cartItem={item} />
    );
  });
  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  return (
    <div>
      <span className="pointer" onClick={() => history.push('/')}>&#60; back to catalog</span>
      <h2>My Cart</h2>
      <div className="d-flex flex-column">
        {cartItems}
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <h2>{`Item Total: $${(totalPrice / 100).toFixed(2)}`}</h2>
        <button
          className="btn btn-primary"
          onClick={() => history.push('/checkout')}
          disabled={!cart.length}>
            Checkout
        </button>
      </div>
    </div>
  );

}
