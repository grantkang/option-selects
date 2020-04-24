import React from 'react';

export default class Header extends React.Component {
  render() {
    const cartItemCount = this.props.cartItemCount;
    const cartItemCountText = cartItemCount === 1 ? '1 item' : `${cartItemCount} items`;

    return (
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#"><i className="fas fa-dollar-sign"></i> Wicked Sales</a>
        <span
          className="navbar-text pointer"
          onClick={this.props.viewCartSummary}>
          {cartItemCountText} <i className="fas fa-shopping-cart"></i>
        </span>
      </nav>
    );
  }
}
