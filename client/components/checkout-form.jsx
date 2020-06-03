import React, { useContext, useState } from 'react';
import ApplicationContext from '../lib/context';
import { useHistory } from 'react-router-dom';

export default function CheckoutForm(props) {
  const history = useHistory();
  const context = useContext(ApplicationContext);
  const [state, setState] = useState({
    name: '',
    creditCard: '',
    shippingAddress: '',
    creditCardError: false
  });

  const cart = context.getCart();
  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  const handleChange = e => {
    const newState = Object.assign({}, state);
    newState[e.target.name] = e.target.value;
    setState(newState);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!creditCardIsValid()) {
      const newState = Object.assign({}, state);
      newState.creditCardError = true;
      setState(newState);
      return;
    }
    const orderInfo = Object.assign({}, state);
    context.placeOrder(orderInfo);
    history.push('/');
  };

  const creditCardIsValid = () => {
    return state.creditCard.match(/\d{4}-?\d{4}-?\d{4}-?\d{4}/);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Checkout</h1>
      <span>{`Order Total: $${(totalPrice / 100).toFixed(2)}`}</span>
      <div className="form-group">
        <label htmlFor="nameInput">Name</label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="nameInput"
          value={state.name}
          onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="creditCardInput">Credit Card</label>
        <input
          required
          type="text"
          name="creditCard"
          className={state.creditCardError ? 'form-control is-invalid' : 'form-control'}
          id="creditCardInput"
          value={state.creditCard}
          onChange={handleChange}></input>
        {state.creditCardError ? <small className="text-danger">Please input a valid credit card number</small> : null }
      </div>
      <div className="form-group">
        <label htmlFor="addressInput">Shipping Address</label>
        <textarea
          required
          name="shippingAddress"
          className="form-control"
          id="addressInput"
          rows="4"
          value={state.shippingAddress}
          onChange={handleChange}></textarea>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <span className="pointer" onClick={() => history.push('/')}>&#60; Continue Shopping</span>
        <button type="submit" className="btn btn-primary">Place Order</button>
      </div>
    </form>
  );
}
