import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    const name = this.props.name;
    const price = `$${(this.props.price / 100).toFixed(2)}`;
    const imagePath = this.props.imagePath;
    const description = this.props.description;

    return (
      <div className="col-xl-4 col-md-6 col-sm-12 my-2">
        <div className="product-list-item-card card pointer m-2" onClick={this.props.onClick}>
          <img className="card-img-top card-img my-3" src={imagePath} alt="Product Image" />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text"><small className="text-muted">{price}</small></p>
            <p className="card-text">{description}</p>
          </div>
        </div>
      </div>

    );
  }
}
