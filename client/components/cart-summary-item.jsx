import React from 'react';

export default class CartSummaryItem extends React.Component {
  render() {
    const cartItem = this.props.cartItem;
    return (
      <div className="card my-2">
        <div className="row">
          <div className="col-5">
            <img className="card-img-top card-img my-3" src={cartItem.image} alt="" />
          </div>
          <div className="col-7 d-flex flex-column justify-content-center">
            <h3 className="card-title">{cartItem.name}</h3>
            <p className="card-text text-muted">{`$${(cartItem.price / 100).toFixed(2)}`}</p>
            <p className="card-text">{cartItem.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}
