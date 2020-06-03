import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Header(props) {
  const history = useHistory();
  const cartItemCount = props.cartItemCount;
  const cartItemCountText = cartItemCount === 1 ? '1 item' : `${cartItemCount} items`;

  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand pointer" onClick={() => history.push('/')}><i className="fas fa-dollar-sign"></i> Wicked Sales</a>
      <span
        className="navbar-text pointer"
        onClick={() => history.push('/cart')}>
        {cartItemCountText} <i className="fas fa-shopping-cart"></i>
      </span>
    </nav>
  );
}
