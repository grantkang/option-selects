import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ApplicationContext from '../lib/context';

export default function Header(props) {
  const history = useHistory();
  const context = useContext(ApplicationContext);
  const cartItemCount = props.cartItemCount;
  const cartItemCountText = cartItemCount === 1 ? '1 item' : `${cartItemCount} items`;

  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand pointer" onClick={() => history.push('/')}><i className="fas fa-dollar-sign"></i> {context.getApplicationTitle()}</a>
      <span
        className="navbar-text pointer"
        onClick={() => history.push('/cart')}>
        {cartItemCountText} <i className="fas fa-shopping-cart"></i>
      </span>
    </nav>
  );
}
